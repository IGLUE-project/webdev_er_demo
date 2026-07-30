import React, { useState, useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import Typewriter from './Typewriter';

// The dramatic cold-open. A rogue legacy server, MONOLITH, has sealed the room.
// A boot-log types out first; once it finishes, the story + CTA fade in.
const IntroScreen = ({ onStart }) => {
  const { I18n } = useContext(GlobalContext);
  const [ready, setReady] = useState(false);

  return (
    <div className="screen intro_screen">
      <div className="terminal_card danger_frame">
        <div className="terminal_bar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="bar_title">MONOLITH::lockdown</span>
          <span className="rec">● LIVE</span>
        </div>
        <div className="terminal_body">
          <div className="lockdown_banner">⚠ SYSTEM LOCKDOWN</div>

          <Typewriter
            className="boot_log"
            text={I18n.getTrans('i.boot_log')}
            onDone={() => setReady(true)}
          />

          <div className={`reveal ${ready ? 'shown' : ''}`}>
            <h1 className="glow">{I18n.getTrans('i.intro_title')}</h1>
            <p className="subtitle">{I18n.getTrans('i.intro_subtitle')}</p>
            <p className="story">{I18n.getTrans('i.intro_story')}</p>
            <p className="signature">{I18n.getTrans('i.intro_signature')}</p>

            <div className="tech_badges">
              <span className="badge html">&lt;HTML&gt;</span>
              <span className="badge css">{'{ CSS }'}</span>
              <span className="badge js">JS( )</span>
            </div>

            <button className="primary_button danger" onClick={onStart}>
              {I18n.getTrans('i.intro_start')} <i className="fa fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
