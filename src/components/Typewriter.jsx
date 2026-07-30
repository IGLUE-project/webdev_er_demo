import React, { useState, useEffect } from 'react';

// Reveals `text` character-by-character for a "terminal typing" effect, then
// calls onDone. Purely cosmetic drama for the intro boot-log.
const Typewriter = ({ text, speed = 22, startDelay = 250, onDone, className }) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) {
          clearInterval(interval);
          if (onDone) onDone();
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  const done = n >= text.length;
  return (
    <pre className={className}>
      {text.slice(0, n)}
      <span className={`caret ${done ? 'blink' : ''}`}>▋</span>
    </pre>
  );
};

export default Typewriter;
