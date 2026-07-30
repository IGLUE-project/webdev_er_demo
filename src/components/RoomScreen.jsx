import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import Timer from './Timer';
import Keypad from './Keypad';
import LetterPadlock from './LetterPadlock';
import HtmlPuzzleWidget from './puzzles/HtmlPuzzleWidget';
import CssPuzzleWidget from './puzzles/CssPuzzleWidget';
import JsPuzzleWidget from './puzzles/JsPuzzleWidget';

// Pick the interactive widget for a door by its technology. `onSolve` lets a
// widget submit the answer directly (door 2's Cascade Duel uses it, so the
// winning colour pick springs the lock with no extra text box).
function PuzzleWidget({ room, onSolve, disabled }) {
  switch (room.tech) {
    case 'HTML':
      return <HtmlPuzzleWidget room={room} />;
    case 'CSS':
      return <CssPuzzleWidget room={room} onSolve={onSolve} disabled={disabled} />;
    case 'JavaScript':
      return <JsPuzzleWidget room={room} />;
    default:
      return (
        <pre className="code_block">
          <code>{room.code}</code>
        </pre>
      );
  }
}

const RoomScreen = ({ rooms, solvedIds, onSubmit, timer }) => {
  const { I18n } = useContext(GlobalContext);

  const isSolved = (room) => solvedIds.includes(room.id);
  const firstUnsolved = rooms.findIndex((r) => !solvedIds.includes(r.id));
  const [activeIndex, setActiveIndex] = useState(firstUnsolved === -1 ? rooms.length - 1 : firstUnsolved);

  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle'); // idle | checking | correct | wrong
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(false);

  // Preload the feedback sounds once (served from public/sounds).
  const okSound = useRef(null);
  const nokSound = useRef(null);
  useEffect(() => {
    okSound.current = new Audio('./sounds/solution_ok.mp3');
    nokSound.current = new Audio('./sounds/solution_nok.mp3');
  }, []);
  const play = (ref) => {
    try {
      ref.current.currentTime = 0;
      ref.current.play();
    } catch (e) {
      /* autoplay may be blocked until first interaction; ignore */
    }
  };

  const room = rooms[activeIndex];
  const solved = isSolved(room);

  useEffect(() => {
    setAnswer('');
    setStatus(solved ? 'correct' : 'idle');
    setShowHint(false);
    setAttempts(0);
  }, [activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Shared submit logic. Text box / keypad / padlock call it with no argument
  // (using the typed `answer`); the Cascade Duel passes the picked value directly.
  async function runSubmit(explicit) {
    const value = typeof explicit === 'string' ? explicit : answer;
    if (!value.trim() || status === 'checking' || solved) return;

    setAnswer(value);
    setStatus('checking');
    const accepted = await onSubmit(room, value); // -> escapp.submitPuzzle in App.jsx

    if (accepted) {
      setStatus('correct');
      play(okSound);
      const nextLocked = rooms.findIndex((r) => !solvedIds.includes(r.id) && r.id !== room.id);
      if (nextLocked !== -1) setTimeout(() => setActiveIndex(nextLocked), 1600);
    } else {
      setStatus('wrong');
      setAttempts((a) => a + 1);
      play(nokSound);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    runSubmit();
  }

  // Some doors use a bespoke input (keypad / padlock); the rest use a text box.
  // They all share the same value/onChange/onSubmit wiring below.
  const inputProps = {
    value: answer,
    disabled: solved || status === 'checking',
    onChange: (v) => {
      setAnswer(v);
      if (status === 'wrong') setStatus('idle');
    },
    onSubmit: runSubmit,
  };

  return (
    <div className="screen room_screen">
      <header className="room_header">
        <div className="progress">
          {I18n.getTrans('i.doors_progress', { solved: solvedIds.length, total: rooms.length })}
        </div>
        <Timer seed={timer} />
        <nav className="door_tabs">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              className={`door_tab ${i === activeIndex ? 'active' : ''} ${isSolved(r) ? 'solved' : 'locked'}`}
              onClick={() => setActiveIndex(i)}
            >
              <i className={`fa ${isSolved(r) ? 'fa-lock-open' : 'fa-lock'}`} />
              <span>{r.tech}</span>
            </button>
          ))}
        </nav>
      </header>

      <section className={`puzzle_card ${solved ? 'unlocked' : ''} ${shake ? 'shake' : ''}`}>
        <div className="puzzle_title">
          <i className={`fa ${room.icon}`} />
          <h2>{room.title}</h2>
          <span className={`lock_state ${solved ? 'open' : ''}`}>
            {solved ? I18n.getTrans('i.unlocked') : I18n.getTrans('i.locked')}
          </span>
        </div>

        {room.story && (
          <div className="transmission">
            <span className="from"><i className="fa fa-robot" /> {I18n.getTrans('i.transmission')}</span>
            <p>“{room.story}”</p>
          </div>
        )}

        <div className="lesson">
          <h3>{I18n.getTrans('i.lesson')}: {room.tech}</h3>
          <p>{room.intro}</p>
        </div>

        <div className="task">
          <h3>{I18n.getTrans('i.your_task')}</h3>
          <p>{room.prompt}</p>
          <PuzzleWidget
            room={room}
            disabled={solved || status === 'checking'}
            onSolve={(val) => runSubmit(val)}
          />
        </div>

        {room.inputMode === 'keypad' ? (
          <Keypad {...inputProps} maxLength={room.solution.length} />
        ) : room.inputMode === 'padlock' ? (
          <LetterPadlock {...inputProps} length={room.solution.length} open={solved} />
        ) : room.inputMode === 'cascade' ? null : (
          <form className="answer_form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={answer}
              disabled={solved || status === 'checking'}
              placeholder={I18n.getTrans('i.answer_placeholder')}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (status === 'wrong') setStatus('idle');
              }}
              autoFocus
            />
            <button type="submit" className="primary_button" disabled={solved || status === 'checking'}>
              {status === 'checking' ? I18n.getTrans('i.checking') : I18n.getTrans('i.unlock')}
            </button>
          </form>
        )}

        {status === 'correct' && (
          <p className="feedback ok"><i className="fa fa-lock-open" /> {I18n.getTrans('i.correct')}</p>
        )}
        {status === 'wrong' && (
          <p className="feedback nok">
            <i className="fa fa-times" /> {I18n.getTrans('i.wrong')}
            {attempts > 0 && (
              <span className="attempts"> {I18n.getTrans('i.attempts', { n: attempts })}</span>
            )}
          </p>
        )}

        {!solved && (
          <div className="hint_area">
            <button type="button" className="link_button" onClick={() => setShowHint((s) => !s)}>
              <i className="fa fa-lightbulb" /> {I18n.getTrans('i.hint')}
            </button>
            {showHint && <p className="hint_text">{room.hint}</p>}
          </div>
        )}
      </section>
    </div>
  );
};

export default RoomScreen;
