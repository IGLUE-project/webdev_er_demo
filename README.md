# Trapped in the Frontend — an Escapp escape room

An educational web escape room that teaches **HTML, CSS & JavaScript**, built on the
[IGLUE `keypad_puzzle`](https://github.com/IGLUE-project/keypad_puzzle/tree/standalone)
standalone skeleton to demonstrate how to integrate the **Escapp client**.

You're locked in a server room by a rogue legacy server, **MONOLITH**. Three blast
doors stand between you and the exit, each bolted shut by a front-end puzzle:

| Door | Tech | Lock (the interaction *is* the answer) | What it teaches |
|------|------|----------------------------------------|-----------------|
| 1 | HTML | letter combination **padlock** | reading source, attributes, comments |
| 2 | CSS  | **Cascade Duel** — pick the winning colour | specificity + `!important` |
| 3 | JS   | numeric **keypad** | type coercion (`number + string`) |

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173  (or the port Vite prints)
```

Optionally copy `config.js.example.js` → `config.js` to tweak settings for local
runs. **`config.js` is git-ignored** — it never gets committed. Local dev runs in
Escapp *preview* mode so there is no login wall.

```bash
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Launch / URL parameters

Escapp launches an externally-hosted app (like the gh-pages build) by appending the
participant's credentials and language to the URL. All are optional:

| Param | Example | Effect |
|-------|---------|--------|
| `token` | `?token=ABC123` | authenticates the participant (real progress is recorded) |
| `email` | `&email=you@example.com` | paired with `token` for authentication |
| `locale` | `&locale=es` | UI language (`en`, `es`, …); overrides the default |

Example: `.../?email=you@example.com&token=ABC123&locale=es`

Without a `token` you can still explore the room (answers are checked locally), but
solves are not recorded on the Escapp server.

## How the Escapp client is used

The integration lives in [`src/components/App.jsx`](src/components/App.jsx) — the
five steps every Escapp puzzle app follows:

1. `new ESCAPP(settings)` — create the client (`escapp.js` is a global `<script>`)
2. `escapp.getStorage()` / `getAppSettings()` — local persistence + author config
3. `escapp.registerCallback(...)` — react to server state changes / restarts
4. `escapp.validate(cb)` — authenticate the participant
5. `escapp.submitPuzzle(id, answer, {}, cb)` — submit an answer for grading

The escape room's **puzzle solutions live on the Escapp server**, not in this repo.
Puzzle ids and order are set in
[`src/constants/constants.jsx`](src/constants/constants.jsx) (`linkedPuzzleIds`).

## Deployment (GitHub Pages)

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the app and publishes `dist/` to the **`gh-pages`** branch.

One-time setup: in the repo's **Settings → Pages**, set *Source* to
**Deploy from a branch → `gh-pages` / root**. The site then serves at
`https://iglue-project.github.io/webdev_er_demo/`.

## License

GNU General Public License v3.0 (inherited from the keypad_puzzle skeleton).
