import React, { createContext, useState } from 'react';
import * as _Utils from '../vendors/Utils.js';
import * as _I18n from '../vendors/I18n.js';

// A tiny global store shared by every screen. It holds:
//   - escapp:       the Escapp client instance (created in App.jsx)
//   - appSettings:  the merged author/server settings for this room
//   - Storage:      the Escapp local-storage wrapper (escapp.getStorage())
//   - I18n / Utils: stateless helper modules
//
// This is the exact same pattern the keypad skeleton uses; it is generic and has
// nothing to do with any particular puzzle, so we keep it as-is.
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [escapp, setEscapp] = useState(null);
  const [appSettings, setAppSettings] = useState(null);
  const [Storage, setStorage] = useState(null);
  const I18n = _I18n;
  const Utils = _Utils;

  return (
    <GlobalContext.Provider
      value={{ escapp, setEscapp, appSettings, setAppSettings, Storage, setStorage, I18n, Utils }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
