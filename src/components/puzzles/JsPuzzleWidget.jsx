import React, { useState, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

// Interactive step-through "debugger" for the JavaScript door.
//
// Design principle: the interaction is the answer. The debugger TEACHES the
// coercion (watch `code` flip from number to string), but it deliberately stops
// before computing the final value — so the player must predict the result and
// key it into the lock themselves, rather than copying a number the widget
// already printed. The `predict` steps show "?" instead of the value.
//
// The source lines come from the door's translated snippet (i.d3_code, one line
// per step), so the comments in the code are readable in the player's language;
// the per-step commentary lives in locales as i.js_note1 … i.js_note5.
const STEPS = [
  { value: '4', type: 'number', note: 'i.js_note1' },
  { value: '8', type: 'number', note: 'i.js_note2' },
  { value: '"80"', type: 'string', note: 'i.js_note3' },
  { value: '?', type: '', note: 'i.js_note4', predict: true },
  { value: '?', type: '', note: 'i.js_note5', predict: true },
];

const JsPuzzleWidget = ({ code }) => {
  const { I18n } = useContext(GlobalContext);
  const [step, setStep] = useState(-1); // -1 = not started; index of last executed line

  // Pair each translated source line with its step. A translation with the
  // wrong number of lines would silently desync the debugger, so clamp to the
  // steps we have.
  const lines = String(code || '').split('\n');
  const steps = STEPS.map((s, i) => ({ ...s, line: lines[i] || '' }));

  const atEnd = step >= steps.length - 1;
  const current = step >= 0 ? steps[step] : null;

  return (
    <div className="widget js_widget">
      <div className="debugger">
        <pre className="code_block javascript">
          {steps.map((s, i) => (
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
            {current ? I18n.getTrans(current.note) : I18n.getTrans('i.js_idle')}
          </p>

          <div className="console">
            <span className="console_label">{I18n.getTrans('i.js_console')}</span>
            <code>{atEnd ? '?' : ''}</code>
          </div>
        </div>
      </div>

      <div className="dbg_controls">
        <button
          type="button"
          className="primary_button small"
          disabled={atEnd}
          onClick={() => setStep((s) => Math.min(s + 1, steps.length - 1))}
        >
          <i className="fa fa-step-forward" /> {I18n.getTrans('i.js_step')}
        </button>
        <button type="button" className="link_button" onClick={() => setStep(-1)}>
          <i className="fa fa-undo" /> {I18n.getTrans('i.js_reset')}
        </button>
      </div>
    </div>
  );
};

export default JsPuzzleWidget;
