import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The Escapp client (public/escapp.js) reads a GLOBAL variable called
// `ESCAPP_APP_SETTINGS` from the window. On the real Escapp platform the server
// injects that global into the page. When we run the app locally there is no
// server, so during `vite dev` we load it from an optional local `config.js`
// file (copy config.js.example.js -> config.js) and inline it with `define`.
// In a production build we leave it `undefined` so the Escapp server can supply it.
export default defineConfig(async ({ mode }) => {
  let _ESCAPP_APP_SETTINGS = {};
  // Only load config.js in dev AND only if it actually exists. The path is built
  // from a variable so the bundler does not try to statically resolve (and fail
  // on) a file that may not be there.
  const configUrl = new URL('./config.js', import.meta.url);
  if (mode === 'development' && existsSync(fileURLToPath(configUrl))) {
    try {
      const mod = await import(/* @vite-ignore */ configUrl.href);
      _ESCAPP_APP_SETTINGS = mod.ESCAPP_APP_SETTINGS ?? {};
    } catch (e) {
      // Malformed config.js -> fall back to built-in default settings.
    }
  }

  return {
    base: './',
    server: {
      open: true,
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    define: {
      ESCAPP_APP_SETTINGS:
        mode === 'development' ? JSON.stringify(_ESCAPP_APP_SETTINGS) : 'undefined',
    },
  };
});
