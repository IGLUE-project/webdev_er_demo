import React, { useState } from 'react';

// "Cascade Duel" — a harder, gamified CSS specificity puzzle for door 2.
//
// Five declarations set `color` on the same lock. The teaching gotcha: the
// highest-specificity selector does NOT win, because a `!important` on a low
// specificity rule overrides the whole normal cascade. The player must pick the
// colour the browser actually paints; wrong guesses are struck out with the
// reason they lose (progressive teaching), and a tries counter tracks the duel.
//
// The winning colour ('amber') is what gets typed into the lock below — the
// server solution is unchanged.
const CANDIDATES = [
  {
    color: 'teal',
    swatch: 'teal',
    origin: 'inline style="color: teal"',
    win: false,
    why: 'Inline styles are strong (1,0,0,0) — but a normal declaration marked !important still beats them.',
  },
  {
    color: 'green',
    swatch: 'green',
    origin: '.panel  { color: green }',
    win: false,
    why: 'Class selector, specificity 0,1,0. Overridden.',
  },
  {
    color: 'red',
    swatch: 'red',
    origin: '#lock  { color: red }',
    win: false,
    why: 'ID selector, 1,0,0. Stronger than a class — but not stronger than !important.',
  },
  {
    color: 'blue',
    swatch: 'blue',
    origin: 'div#lock.panel  { color: blue }',
    win: false,
    why: 'The HIGHEST normal specificity here (1,1,1) — the obvious guess. It still loses…',
  },
  {
    color: 'amber',
    swatch: '#FFBF00',
    origin: '.panel  { color: amber !important }',
    win: true,
    why: '!important overrides every NORMAL declaration, whatever its specificity. This is what the browser paints.',
  },
];

const CssPuzzleWidget = ({ room, onSolve, disabled }) => {
  const [picked, setPicked] = useState([]); // colors already guessed
  const [solved, setSolved] = useState(false);

  function guess(c) {
    if (solved || disabled || picked.includes(c.color)) return;
    setPicked((p) => [...p, c.color]);
    if (c.win) {
      setSolved(true);
      // Picking the winning colour springs the lock directly — no retyping.
      if (onSolve) onSolve(c.color);
    }
  }

  const tries = picked.filter((col) => !CANDIDATES.find((c) => c.color === col).win).length;

  return (
    <div className="widget css_widget">
      <pre className="code_block html">
        <code>{room.code}</code>
      </pre>

      <p className="duel_prompt">
        <i className="fa fa-bolt" /> Which colour does the browser actually paint on the lock?
        {tries > 0 && !solved && <span className="tries"> wrong guesses: {tries}</span>}
      </p>

      <div className="swatches">
        {CANDIDATES.map((c) => {
          const guessed = picked.includes(c.color);
          const isWin = c.win && guessed;
          const isMiss = !c.win && guessed;
          return (
            <button
              key={c.color}
              type="button"
              className={`swatch ${isWin ? 'win' : ''} ${isMiss ? 'miss' : ''}`}
              disabled={solved || disabled || guessed}
              onClick={() => guess(c)}
            >
              <span className="chip" style={{ background: c.swatch }} />
              <span className="name">{c.color}</span>
              {isWin && <i className="fa fa-check tick" />}
              {isMiss && <i className="fa fa-times cross" />}
            </button>
          );
        })}
      </div>

      {/* Reveal the reasoning for whatever has been guessed so far. */}
      {picked.length > 0 && (
        <ul className="duel_log">
          {picked.map((col) => {
            const c = CANDIDATES.find((x) => x.color === col);
            return (
              <li key={col} className={c.win ? 'win' : 'miss'}>
                <code>{c.origin}</code> — {c.why}
              </li>
            );
          })}
        </ul>
      )}

      {(solved || disabled) && (
        <p className="duel_solved">
          <i className="fa fa-unlock" /> That colour lights the lock — the bolt springs open.
        </p>
      )}
    </div>
  );
};

export default CssPuzzleWidget;
