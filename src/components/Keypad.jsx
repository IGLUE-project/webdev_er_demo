import React, { useEffect, useRef, useContext } from 'react';
import { GlobalContext } from './GlobalContext';

// A numeric keypad input, used for doors whose answer is a number (door 3).
// It drives the SAME `value`/onSubmit contract as the plain text input, so from
// RoomScreen's point of view it is just an alternative way to type the answer —
// the Escapp submission path is unchanged.
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'back'];

const Keypad = ({ value, onChange, onSubmit, disabled, maxLength }) => {
  const { I18n } = useContext(GlobalContext);
  const beep = useRef(null);
  useEffect(() => {
    beep.current = new Audio('./sounds/beep.mp3');
  }, []);
  const playBeep = () => {
    try {
      beep.current.currentTime = 0;
      beep.current.play();
    } catch (e) {
      /* autoplay may be blocked before first interaction */
    }
  };

  function press(key) {
    if (disabled) return;
    playBeep();
    if (key === 'C') return onChange('');
    if (key === 'back') return onChange(value.slice(0, -1));
    if (maxLength && value.length >= maxLength) return; // stop at answer length
    onChange(value + key);
  }

  // Render the entered digits as fixed slots so it reads like a real lock.
  const slots = Array.from({ length: maxLength || Math.max(value.length, 3) });

  return (
    <div className={`keypad ${disabled ? 'disabled' : ''}`}>
      <div className="keypad_display">
        {slots.map((_, i) => (
          <span key={i} className={`slot ${value[i] ? 'filled' : ''}`}>
            {value[i] || ''}
          </span>
        ))}
      </div>

      <div className="keypad_grid">
        {KEYS.map((k) => (
          <button
            key={k}
            type="button"
            className={`key ${k === 'C' || k === 'back' ? 'key_action' : ''}`}
            disabled={disabled}
            onClick={() => press(k)}
          >
            {k === 'back' ? <i className="fa fa-backspace" /> : k}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="primary_button keypad_enter"
        disabled={disabled || value.length === 0}
        onClick={onSubmit}
      >
        <i className="fa fa-unlock" /> {I18n.getTrans('i.unlock')}
      </button>
    </div>
  );
};

export default Keypad;
