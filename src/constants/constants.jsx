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
//   solution -> the answer the player must type. IMPORTANT: this is ALSO the
//               value you must configure as the puzzle's solution on the Escapp
//               server. The server is the real judge; we keep it here only for
//               the offline fallback check (see App.jsx -> checkSolutionOffline).
//
// Answers are compared case-insensitively and trimmed (see normalize() in App).
// ---------------------------------------------------------------------------
export const ROOMS = [
  {
    id: 1,
    tech: 'HTML',
    icon: 'fa-code',
    title: 'Door 1 — The Structure Door',
    story:
      "This door's panel runs on raw HTML. The exit code was printed right here — so I " +
      'wiped it off the screen. Stare at the blank page all you like. Though… I was never ' +
      'careful about what I leave lying in the source.',
    intro:
      'HTML is the skeleton of every web page. Content lives inside tags like ' +
      '<h1>…</h1>, and extra data rides along in attributes such as href, src or alt. ' +
      'Text between <!-- and --> is a comment: notes for developers that the browser ignores.',
    prompt:
      'A janitor hid the 4-letter door code inside this markup. The browser would ' +
      'never show it on the page — but you can read the source. Find the code, then ' +
      'spin the padlock dials to match it.',
    code: `<!DOCTYPE html>
<html>
  <body>
    <h1>Server Room B</h1>

    <!-- Decoy: this comment is NOT the code -->
    <p>Authorised personnel only.</p>

    <!-- The door code is the alt text of the lock image below -->
    <img src="lock.png" alt="HTML">

    <p hidden>SHUTDOWN</p>
  </body>
</html>`,
    hint: 'An image\'s alt="…" attribute is the text shown when the image can\'t load. Read the 4 letters inside the quotes.',
    solution: 'HTML',
    // A short word answer, entered on a rotating letter combination padlock.
    inputMode: 'padlock',
  },
  {
    id: 2,
    tech: 'CSS',
    icon: 'fa-paint-roller',
    title: 'Door 2 — The Style Door',
    story:
      'This bolt only powers up in ONE colour, and FOUR of my style rules — plus an ' +
      'inline style — are fighting over which. Count specificity all you like; the ' +
      'obvious winner is a trap. Choose wrong and you rot here in the dark.',
    intro:
      'CSS decides how HTML looks, and when rules collide the winner is decided by the ' +
      'cascade: first `!important` declarations, then higher SPECIFICITY (inline > id > ' +
      'class > element). The catch — a `!important` on a weak selector still beats a ' +
      'strong selector without it.',
    prompt:
      'Five declarations set a colour on this one lock. The highest-specificity ' +
      'selector is NOT the winner. Work out which colour the browser really paints — ' +
      'then pick it to spring the lock.',
    code: `<div id="lock" class="panel" style="color: teal">◉</div>

<style>
  .panel          { color: green; }
  #lock           { color: red; }
  div#lock.panel  { color: blue; }
  .panel          { color: amber !important; }
</style>`,
    hint: 'Ignore specificity for a second: is any declaration marked !important? A normal !important rule overrides the whole cascade — even inline styles and higher-specificity selectors.',
    solution: 'amber',
    // Door 2 is solved by picking the winning colour in the Cascade Duel widget,
    // so it needs no separate lock input.
    inputMode: 'cascade',
  },
  {
    id: 3,
    tech: 'JavaScript',
    icon: 'fa-terminal',
    title: 'Door 3 — The Logic Door',
    story:
      'The last door. One little routine of mine runs the instant you reach for the lever. ' +
      'Tell me the EXACT characters it prints — or the bolts stay shut forever. Humans ' +
      'always fumble my arithmetic.',
    intro:
      'JavaScript makes pages interactive. Watch out for TYPE COERCION: adding a ' +
      'number to a number does maths (2 + 3 = 5), but adding a number to a STRING ' +
      'glues them together instead ("2" + 3 = "23").',
    prompt:
      'Trace this program by hand and type exactly what it prints to the console.',
    code: `let code = 4;
code = code * 2;      // number * number
code = code + "0";    // number + string
code = code + 5;      // string + number
console.log(code);`,
    hint: '4*2 = 8 (a number). Then 8 + "0" becomes the string "80". Then "80" + 5 glues on the 5.',
    solution: '805',
    // This door's answer is numeric, so enter it on a keypad instead of a text
    // box (a nod to the original keypad_puzzle skeleton this app is built on).
    inputMode: 'keypad',
  },
];
