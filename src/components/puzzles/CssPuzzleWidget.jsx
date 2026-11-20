import React, { useState, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

// "Cascade Duel" — a harder, gamified CSS specificity puzzle for door 2.
//
// Five declarations set `color` on the same lock. The teaching gotcha: the
// highest-specificity selector does NOT win, because a `!important` on a low
// specificity rule overrides the whole normal cascade. The player must pick the
// colour the browser actually paints; wrong guesses are struck out with the
// reason they lose (progressive teaching), and a tries counter tracks the duel.
//
// The winning colour ('amber') is what gets typed into the lock below — the
// server solution is unchanged. The colour names and the `origin` selectors are
// CSS source, so they are the same in every language; the explanation of each
// loss is prose and lives in src/config/locales.js as i.css_why_<colour>.
const CANDIDATES = [
  { color: 'teal', swatch: 'teal', origin: 'inline style="color: teal"', win: false },
  { color: 'green', swatch: 'green', origin: '.panel  { color: green }', win: false },
  { color: 'red', swatch: 'red', origin: '#lock  { color: red }', win: false },
  { color: 'blue', swatch: 'blue', origin: 'div#lock.panel  { color: blue }', win: false },
  { color: 'amber', swatch: '#FFBF00', origin: '.panel  { color: amber !important }', win: true },
];

const CssPuzzleWidget = ({ code, onSolve, disabled }) => {
  const { I18n } = useContext(GlobalContext);
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
        <code>{code}</code>
      </pre>

      <p className="duel_prompt">
        <i className="fa fa-bolt" /> {I18n.getTrans('i.css_duel_prompt')}
        {tries > 0 && !solved && (
          <span className="tries"> {I18n.getTrans('i.css_tries', { n: tries })}</span>
        )}
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
                <code>{c.origin}</code> — {I18n.getTrans(`i.css_why_${c.color}`)}
              </li>
            );
          })}
        </ul>
      )}

      {(solved || disabled) && (
        <p className="duel_solved">
          <i className="fa fa-unlock" /> {I18n.getTrans('i.css_solved')}
        </p>
      )}
    </div>
  );
};

export default CssPuzzleWidget;
