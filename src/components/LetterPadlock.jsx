import React, { useEffect, useRef, useContext } from 'react';
import { GlobalContext } from './GlobalContext';

// A letter combination padlock (rotating A–Z dials), used for doors whose answer
// is a short word (door 1). Like the Keypad, it drives the same
// value/onChange/onSubmit contract, so RoomScreen treats it as just another way
// to enter the answer — the Escapp submission path is unchanged.
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const at = (ch, delta) => ALPHABET[(ALPHABET.indexOf(ch) + delta + 26) % 26];

const LetterPadlock = ({ value, onChange, onSubmit, disabled, length, open }) => {
  const { I18n } = useContext(GlobalContext);
  const beep = useRef(null);
  useEffect(() => {
    beep.current = new Audio('./sounds/beep.mp3');
  }, []);

  // Always render `length` wheels; default each to 'A'.
  const letters = Array.from({ length }, (_, i) => (value[i] || 'A').toUpperCase());

  // Seed the answer once so "pulling the shackle" without spinning still submits
  // a full-length string instead of ''.
  useEffect(() => {
    if (value.length !== length) onChange(letters.join(''));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function spin(i, dir) {
    if (disabled) return;
    try {
      beep.current.currentTime = 0;
      beep.current.play();
    } catch (e) {
      /* autoplay may be blocked before first interaction */
    }
    const arr = [...letters];
    arr[i] = at(arr[i], dir);
    onChange(arr.join(''));
  }

  return (
    <div className={`padlock ${open ? 'open' : ''} ${disabled ? 'disabled' : ''}`}>
      <span className="shackle" />
      <div className="lock_body">
        <div className="dials">
          {letters.map((ch, i) => (
            <div className="dial" key={i}>
              <button type="button" className="dial_btn" disabled={disabled} onClick={() => spin(i, +1)}>
                <i className="fa fa-chevron-up" />
              </button>
              <div className="dial_window">
                <span className="ghost">{at(ch, -1)}</span>
                <span className="cur">{ch}</span>
                <span className="ghost">{at(ch, +1)}</span>
              </div>
              <button type="button" className="dial_btn" disabled={disabled} onClick={() => spin(i, -1)}>
                <i className="fa fa-chevron-down" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="primary_button padlock_open"
          disabled={disabled}
          onClick={onSubmit}
        >
          <i className={`fa ${open ? 'fa-unlock' : 'fa-lock'}`} /> {I18n.getTrans('i.unlock')}
        </button>
      </div>
    </div>
  );
};

export default LetterPadlock;
