// ---------------------------------------------------------------------------
// Screen ids (which "room" of the escape room is on screen).
// ---------------------------------------------------------------------------
export const INTRO_SCREEN = 'INTRO_SCREEN';
export const ROOM_SCREEN = 'ROOM_SCREEN';
export const ESCAPED_SCREEN = 'ESCAPED_SCREEN';

// Fallback countdown (seconds) used only when running standalone with no server.
// On the real platform the room's own duration (e.g. 900s for room 752) wins.
export const DEFAULT_DURATION = 900;

// ---------------------------------------------------------------------------
// Settings passed to the Escapp client constructor: `new ESCAPP(...)`.
//
// In a real deployment the Escapp SERVER injects `escappClientSettings`
// (endpoint, linkedPuzzleIds, the logged-in user, etc.) through the global
// `ESCAPP_APP_SETTINGS`. The values below are only the fallbacks used when you
// run the app standalone with a local config.js (or nothing at all).
// ---------------------------------------------------------------------------
export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: './images/',
  // The escape room this app belongs to. This is committed (it is NOT a secret —
  // just a public API URL) so the standalone / gh-pages build has a working
  // endpoint even with no server injecting settings and no local config.js.
  // A local config.js or the Escapp server can still override it.
  endpoint: 'https://escapp.es/api/escapeRooms/752',
  // Our three doors map to three Escapp puzzles. The ids here MUST match the
  // puzzle ids configured on the Escapp server (and the `id` field of each
  // room in ROOMS below). Order = the order players must solve them.
  linkedPuzzleIds: [1, 2, 3],
};

// ---------------------------------------------------------------------------
// Default author settings (theme). Overridden by whatever the Escapp server /
// local config.js provides. Kept intentionally small for this teaching app.
// ---------------------------------------------------------------------------
export const DEFAULT_APP_SETTINGS = {
  locale: 'en',
  title: 'Trapped in the Frontend',
};

// ---------------------------------------------------------------------------
// The puzzles. Each object is one door / one Escapp puzzle.
//
//   id       -> the Escapp puzzle id (matches linkedPuzzleIds above)
//   key      -> the prefix of this door's translation keys in
//               src/config/locales.js ('d1' -> i.d1_title, i.d1_story,
//               i.d1_intro, i.d1_prompt, i.d1_code, i.d1_hint). ALL of this
//               door's player-facing text lives there, in every language.
//   solution -> the answer the player must type. IMPORTANT: this is ALSO the
//               value you must configure as the puzzle's solution on the Escapp
//               server. The server is the real judge; we keep it here only for
//               the offline fallback check (see App.jsx -> checkSolutionOffline).
//               It is language-independent on purpose, so the same Escapp
//               puzzle grades players in any locale.
//
// Answers are compared case-insensitively and trimmed (see normalize() in App).
// ---------------------------------------------------------------------------
export const ROOMS = [
  {
    id: 1,
    key: 'd1',
    tech: 'HTML',
    icon: 'fa-code',
    solution: 'HTML',
    // A short word answer, entered on a rotating letter combination padlock.
    inputMode: 'padlock',
  },
  {
    id: 2,
    key: 'd2',
    tech: 'CSS',
    icon: 'fa-paint-roller',
    solution: 'amber',
    // Door 2 is solved by picking the winning colour in the Cascade Duel widget,
    // so it needs no separate lock input.
    inputMode: 'cascade',
  },
  {
    id: 3,
    key: 'd3',
    tech: 'JavaScript',
    icon: 'fa-terminal',
    solution: '805',
    // This door's answer is numeric, so enter it on a keypad instead of a text
    // box (a nod to the original keypad_puzzle skeleton this app is built on).
    inputMode: 'keypad',
  },
];
