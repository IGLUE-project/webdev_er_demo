import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from './GlobalContext';

// A live MM:SS countdown. It is seeded once from the Escapp state ({ remaining,
// stamp }) and then ticks locally, subtracting real elapsed time so it stays
// accurate even if the tab was backgrounded. Purely cosmetic urgency — the
// Escapp server remains the authority on whether time has actually run out.
const Timer = ({ seed }) => {
  const { I18n } = useContext(GlobalContext);
  const [left, setLeft] = useState(seed ? seed.remaining : 0);

  useEffect(() => {
    if (!seed) return;
    const tick = () => {
      const elapsed = (performance.now() - seed.stamp) / 1000;
      setLeft(Math.max(0, Math.round(seed.remaining - elapsed)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [seed]);

  if (!seed) return null;

  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  const danger = left <= 60;
  const out = left <= 0;

  return (
    <div className={`timer ${danger ? 'danger' : ''} ${out ? 'out' : ''}`}>
      <i className="fa fa-hourglass-half" />
      <span className="clock">{out ? I18n.getTrans('i.time_up') : `${mm}:${ss}`}</span>
    </div>
  );
};

export default Timer;
