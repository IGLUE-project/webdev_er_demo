import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

// Victory screen, shown once App.jsx detects every linked puzzle is solved
// (escapp.getAllPuzzlesSolved()). On the real platform, reaching this state is
// what lets the Escapp server advance the player to the next stage.
const EscapedScreen = ({ rooms }) => {
  const { I18n } = useContext(GlobalContext);

  return (
    <div className="screen escaped_screen">
      <div className="terminal_card">
        <div className="terminal_body center">
          <i className="fa fa-door-open trophy" />
          <h1 className="glow">{I18n.getTrans('i.escaped_title')}</h1>
          <p className="story">{I18n.getTrans('i.escaped_text')}</p>

          <h3 className="recap_title">{I18n.getTrans('i.escaped_recap')}</h3>
          <ul className="recap">
            {rooms.map((r) => (
              <li key={r.id}>
                <i className={`fa ${r.icon}`} /> <strong>{r.tech}</strong> —{' '}
                {/* First sentence of the door's (translated) field note. */}
                {I18n.getTrans(`i.${r.key}_intro`).split('.')[0]}.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EscapedScreen;
