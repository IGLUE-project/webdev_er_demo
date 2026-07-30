import React, { useState } from 'react';

// Interactive step-through "debugger" for the JavaScript door.
//
// Design principle: the interaction is the answer. The debugger TEACHES the
// coercion (watch `code` flip from number to string), but it deliberately stops
// before computing the final value — so the player must predict the result and
// key it into the lock themselves, rather than copying a number the widget
// already printed. The `predict` steps show "?" instead of the value.
const STEPS = [
  { line: 'let code = 4;', value: '4', type: 'number', note: 'starts life as a number' },
  { line: 'code = code * 2;', value: '8', type: 'number', note: 'number × number → 8 (still a number)' },
  {
    line: 'code = code + "0";',
    value: '"80"',
    type: 'string',
    note: 'number + STRING → the string "80". The type just flipped!',
  },
  {
    line: 'code = code + 5;',
    value: '?',
    type: '',
    note: 'Your turn: once code is a string, string + number = … ?',
    predict: true,
  },
  {
    line: 'console.log(code);',
    value: '?',
    type: '',
    note: 'Work out what this prints, then key it into the lock. →',
    predict: true,
  },
];

const JsPuzzleWidget = () => {
  const [step, setStep] = useState(-1); // -1 = not started; index of last executed line

  const atEnd = step >= STEPS.length - 1;
  const current = step >= 0 ? STEPS[step] : null;

  return (
    <div className="widget js_widget">
      <div className="debugger">
        <pre className="code_block javascript">
          {STEPS.map((s, i) => (
            <div key={i} className={`dbg_line ${i === step ? 'current' : ''} ${i < step ? 'done' : ''}`}>
              <span className="gutter">{i <= step ? '▸' : ' '}</span>
              <code>{s.line}</code>
            </div>
          ))}
        </pre>

        <div className="watch">
          <div className="watch_row">
            <span className="watch_label">code =</span>
            <span className={`watch_value ${current && current.predict ? 'unknown' : ''}`}>
              {current ? String(current.value) : '—'}
            </span>
            <span className={`type_pill ${current ? current.type : ''}`}>
              {current ? current.type : ''}
            </span>
          </div>
          <p className="watch_note">
            {current ? current.note : 'Press Step to run the program line by line.'}
          </p>

          <div className="console">
            <span className="console_label">console</span>
            <code>{atEnd ? '?' : ''}</code>
          </div>
        </div>
      </div>

      <div className="dbg_controls">
        <button
          type="button"
          className="primary_button small"
          disabled={atEnd}
          onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
        >
          <i className="fa fa-step-forward" /> Step
        </button>
        <button type="button" className="link_button" onClick={() => setStep(-1)}>
          <i className="fa fa-undo" /> Reset
        </button>
      </div>
    </div>
  );
};

export default JsPuzzleWidget;
