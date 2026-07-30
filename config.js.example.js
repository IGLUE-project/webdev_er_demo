// Copy this file to `config.js` to run the escape room locally (during `npm run dev`).
//
// `config.js` is NOT used in a production build: on the real Escapp platform the
// server injects `ESCAPP_APP_SETTINGS` for you. This file only exists so you can
// test the app on your own machine without a full Escapp server.
//
// The object below is exposed to the Escapp client as the global
// `window.ESCAPP_APP_SETTINGS` (see vite.config.js).

export let ESCAPP_APP_SETTINGS = {
  // ---- Author settings: the "theme" of the escape room -----------------------
  locale: 'en', // "en", "es" ... (see src/config/locales.js)

  // ---- Escapp client settings ------------------------------------------------
  // These tell the Escapp *client* how to talk to the Escapp *server*.
  escappClientSettings: {
    // The API endpoint of ONE escape room on an Escapp server.
    // Replace `id` with the numeric id of your escape room.
    endpoint: 'https://escapp.es/api/escapeRooms/752',

    // The ids of the puzzles (inside that escape room) that THIS app is allowed
    // to solve. Our room has three doors -> three puzzles: HTML, CSS, JS.
    // These must match the puzzle ids you created on the Escapp server.
    linkedPuzzleIds: [1, 2, 3],

    // Real-time channel (websockets). Off for local testing.
    rtc: false,

    // Preview mode lets an author open the app without being an enrolled
    // participant. Handy while designing; keep it false for real players.
    preview: true,
  },
};
