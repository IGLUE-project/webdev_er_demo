import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import {
  DEFAULT_APP_SETTINGS,
  DEFAULT_DURATION,
  ESCAPP_CLIENT_SETTINGS,
  ROOMS,
  INTRO_SCREEN,
  ROOM_SCREEN,
  ESCAPED_SCREEN,
} from '../constants/constants.jsx';
import IntroScreen from './IntroScreen.jsx';
import RoomScreen from './RoomScreen.jsx';
import EscapedScreen from './EscapedScreen.jsx';
import '../assets/scss/app.scss';

// ===========================================================================
//  App.jsx — THE ESCAPP CLIENT INTEGRATION
// ===========================================================================
//  This file is the whole point of the project. The three puzzle screens are
//  just window dressing; what is worth studying is HOW this component talks to
//  the Escapp client. The lifecycle is always the same, in five steps:
//
//    1. Create the client:            new ESCAPP(settings)
//    2. Grab its helpers:             escapp.getStorage(), escapp.getAppSettings()
//    3. Register state callbacks:     escapp.registerCallback(...)
//    4. Authenticate the player:      escapp.validate(cb)
//    5. Submit answers for grading:   escapp.submitPuzzle(id, answer, {}, cb)
//
//  Everything below is those five steps with comments.
// ===========================================================================

// Answers are compared loosely so "Amber", " amber " and "amber" all pass.
const normalize = (value) => String(value ?? '').trim().toLowerCase();

// Optional launch parameters read from the page URL:
//   ?endpoint=&email=&token=&locale=
const readUrlParams = () => {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      endpoint: p.get('endpoint') || undefined,
      email: p.get('email') || undefined,
      token: p.get('token') || undefined,
      locale: p.get('locale') || undefined,
    };
  } catch (e) {
    return {};
  }
};

export default function App() {
  const { escapp, setEscapp, appSettings, setAppSettings, Storage, setStorage, Utils, I18n } =
    useContext(GlobalContext);

  // Guards so the one-time init / validation effects never run twice
  // (React 18 StrictMode deliberately double-invokes effects in dev).
  const hasInitiated = useRef(false);
  const hasValidated = useRef(false);

  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(INTRO_SCREEN);
  const [solvedIds, setSolvedIds] = useState([]); // ids of puzzles already solved
  // Live countdown seed. On the real platform the Escapp server sends how much
  // time the team has left; offline we fall back to a default so the timer still
  // ticks for the demo. `stamp` marks when we received it so the UI can subtract
  // elapsed wall-clock time.
  const [timer, setTimer] = useState(null); // { remaining, stamp } in seconds / ms

  // -------------------------------------------------------------------------
  // STEP 1 & 2 — Create the Escapp client and read what it gives us.
  // Runs once, on mount.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (hasInitiated.current || escapp !== null) return;
    hasInitiated.current = true;

    // Escapp launches an externally-hosted app (like this gh-pages build) by
    // appending the participant's credentials and language to the URL, e.g.
    //   ?email=someone@example.com&token=ABC123&locale=es
    // We read those here so the client can authenticate and pick the language.
    const params = readUrlParams();

    // (1) Create the client instance. `ESCAPP` is the global installed by the
    //     <script src="./escapp.js"> tag in index.html — it is NOT imported.
    const clientSettings = { ...ESCAPP_CLIENT_SETTINGS };
    // A URL-provided endpoint overrides the committed default, so this same
    // build can serve any Escapp escape room.
    if (params.endpoint) clientSettings.endpoint = params.endpoint;
    // While developing locally, run in preview mode so there is no login wall.
    if (import.meta.env.DEV) clientSettings.preview = true;
    // A token in the URL -> authenticate silently as that participant.
    if (params.token) clientSettings.user = { email: params.email, token: params.token };
    if (params.locale) clientSettings.locale = params.locale;

    const _escapp = new ESCAPP(clientSettings);
    setEscapp(_escapp);
    Utils.log('Escapp client created with settings:', _escapp.getSettings());

    // (2a) getStorage() -> a small wrapper over localStorage, namespaced per
    //      escape room + puzzle, that survives page reloads. We use it to
    //      remember which screen the player was on.
    setStorage(_escapp.getStorage());

    // (2b) getAppSettings() -> the author/server-provided theme settings. We
    //      merge them over our defaults so the server can override anything.
    const serverSettings = _escapp.getAppSettings();
    const merged = Utils.deepMerge(DEFAULT_APP_SETTINGS, typeof serverSettings === 'object' ? serverSettings : {});
    if (params.locale) merged.locale = params.locale; // ?locale= wins over defaults
    I18n.init(merged); // pick the language before any text is rendered
    setAppSettings(merged);
    // The browser tab is player-facing too: localise the title and the document
    // language (index.html can only ship one hardcoded guess).
    try {
      document.title = I18n.getTrans('i.intro_title') || merged.title;
      document.documentElement.lang = I18n.getLocale();
    } catch (e) {
      /* no DOM in non-browser contexts; ignore */
    }
    Utils.log('App settings:', merged);
  }, []);

  // -------------------------------------------------------------------------
  // STEP 3 & 4 — Register callbacks, then validate the player.
  // Runs once, after the client + settings + storage are ready.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (hasValidated.current || escapp === null || appSettings === null || Storage === null) return;
    hasValidated.current = true;

    // (3a) onNewErStateCallback fires whenever the server pushes a fresh escape
    //      room state — e.g. a TEAMMATE solves a puzzle in real time. We just
    //      re-sync our local "solved" list from it.
    escapp.registerCallback('onNewErStateCallback', (erState) => {
      Utils.log('New escape room state received from Escapp:', erState);
      syncSolvedFromEscapp();
      captureTiming(erState);
    });

    // (3b) onErRestartCallback fires if a teacher resets the escape room. We
    //      wipe our saved progress so the player starts clean.
    escapp.registerCallback('onErRestartCallback', (erState) => {
      Utils.log('Escape room was restarted:', erState);
      Storage.removeSetting('state');
      setSolvedIds([]);
      setScreen(INTRO_SCREEN);
    });

    // (4) validate() authenticates the player and confirms they are a
    //     participant of this escape room. `success` is true only on the real
    //     platform with a logged-in participant. We flip loading off either
    //     way, so the room stays explorable offline for learning/demoing.
    escapp.validate((success, erState) => {
      Utils.log('Escapp validation result:', success, erState);
      syncSolvedFromEscapp();
      captureTiming(erState);
      restoreScreen();
      setLoading(false);
    });
  }, [escapp, appSettings, Storage]);

  // Read the remaining time out of an Escapp escape-room state. Offline there is
  // no state, so we seed a default duration so the countdown still runs.
  function captureTiming(erState) {
    const remaining =
      erState && typeof erState.remainingTime === 'number'
        ? erState.remainingTime
        : DEFAULT_DURATION;
    setTimer({ remaining, stamp: performance.now() });
  }

  // Pull the authoritative list of solved puzzles from the client and, if the
  // player has already finished, jump straight to the "escaped" screen.
  function syncSolvedFromEscapp() {
    try {
      const solved = escapp.getSolvedPuzzles(); // ids among linkedPuzzleIds
      if (Array.isArray(solved)) setSolvedIds(solved);
      if (escapp.getAllPuzzlesSolved() && solved.length === ROOMS.length) {
        setScreen(ESCAPED_SCREEN);
      }
    } catch (e) {
      Utils.log('Could not read solved puzzles from Escapp:', e);
    }
  }

  // -------------------------------------------------------------------------
  // Screen persistence via the Escapp storage wrapper (survives reloads).
  // -------------------------------------------------------------------------
  function restoreScreen() {
    const saved = Storage.getSetting('state');
    if (saved && typeof saved.screen === 'string') setScreen(saved.screen);
  }
  useEffect(() => {
    if (!loading && Storage) Storage.saveSetting('state', { screen });
  }, [screen, loading, Storage]);

  // -------------------------------------------------------------------------
  // STEP 5 — Submit an answer to Escapp for grading.
  //
  //   escapp.submitPuzzle(puzzleId, solution, options, callback)
  //
  // The SERVER is the real judge: the callback's `success` tells us whether the
  // answer was accepted. We return a Promise so the RoomScreen can await it and
  // show a spinner / result. When there is no reachable server (running the app
  // standalone), we fall back to a local check against the puzzle's known
  // solution so the escape room is still fully playable — see checkOffline().
  // -------------------------------------------------------------------------
  function submitRoomSolution(room, answer) {
    return new Promise((resolve) => {
      Utils.log(`Submitting answer for puzzle ${room.id} (${room.tech}):`, answer);

      escapp.submitPuzzle(room.id, answer, {}, (success, erState) => {
        Utils.log('Escapp graded the answer:', success, erState);
        // If a real Escapp session exists, the SERVER is the sole judge. We only
        // fall back to the local check when standalone (no valid participant),
        // so the offline aid can never mask a genuine server rejection.
        const connected =
          typeof escapp.isUserValidParticipant === 'function' && escapp.isUserValidParticipant();
        const accepted = success === true || (!connected && checkOffline(room, answer));
        if (accepted) markSolved(room.id);
        resolve(accepted);
      });
    });
  }

  // Offline fallback: compare against the solution stored in constants.jsx.
  // Used ONLY when there is no live Escapp participant session (see above), i.e.
  // when running the app standalone with no server behind it.
  function checkOffline(room, answer) {
    return normalize(answer) === normalize(room.solution);
  }

  function markSolved(puzzleId) {
    setSolvedIds((prev) => {
      const next = prev.includes(puzzleId) ? prev : [...prev, puzzleId];
      if (next.length === ROOMS.length) setScreen(ESCAPED_SCREEN);
      return next;
    });
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  if (loading) {
    return (
      <div id="global_wrapper">
        {/* appSettings is null until I18n.init() has run, so fall back to no
            text rather than asking for a translation with no locale set. */}
        <div className="loading">{appSettings ? I18n.getTrans('i.loading') : ''}</div>
      </div>
    );
  }

  return (
    <div id="global_wrapper">
      {screen === INTRO_SCREEN && <IntroScreen onStart={() => setScreen(ROOM_SCREEN)} />}
      {screen === ROOM_SCREEN && (
        <RoomScreen rooms={ROOMS} solvedIds={solvedIds} onSubmit={submitRoomSolution} timer={timer} />
      )}
      {screen === ESCAPED_SCREEN && <EscapedScreen rooms={ROOMS} />}
    </div>
  );
}
