import React, { useState, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

// Interactive "View Source vs View Page" toggle for the HTML door.
//
// The whole lesson of door 1 is that a browser RENDERS markup — comments,
// hidden elements and attribute values never appear on the page, so to find the
// code you must read the SOURCE. Letting the learner flip between the two views
// drives that home far better than a static code block.
//
// The rendered preview is built from the SAME translated strings as the source
// snippet (i.d1_page_h1 / i.d1_page_p), so the two views can never disagree —
// whatever the language. Only alt="HTML" stays fixed: it is the door code.
const renderedSrcDoc = (h1, p) => `<!DOCTYPE html>
<html>
  <body style="font-family:sans-serif;color:#222;background:#f4f6fb;margin:0;padding:18px">
    <h1 style="margin:0 0 10px">${h1}</h1>
    <p>${p}</p>
    <!-- a real, tiny transparent pixel so the img loads and its alt text stays hidden -->
    <img alt="HTML" width="46" height="46"
         style="display:block;border:1px solid #ccc;border-radius:6px"
         src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='46' height='46'><rect width='46' height='46' fill='%23dfe6f2'/><path d='M15 22h16v12H15z' fill='none' stroke='%238595b5' stroke-width='2'/><path d='M19 22v-4a4 4 0 018 0v4' fill='none' stroke='%238595b5' stroke-width='2'/></svg>" />
  </body>
</html>`;

const HtmlPuzzleWidget = ({ code }) => {
  const { I18n } = useContext(GlobalContext);
  // Start on the RENDERED page on purpose: the player sees the code is nowhere
  // on the visible page, and must switch to "View source" to dig it out.
  const [view, setView] = useState('rendered'); // 'source' | 'rendered'

  return (
    <div className="widget html_widget">
      <div className="view_toggle">
        <button
          className={view === 'source' ? 'active' : ''}
          onClick={() => setView('source')}
          type="button"
        >
          <i className="fa fa-code" /> {I18n.getTrans('i.view_source')}
        </button>
        <button
          className={view === 'rendered' ? 'active' : ''}
          onClick={() => setView('rendered')}
          type="button"
        >
          <i className="fa fa-window-maximize" /> {I18n.getTrans('i.view_page')}
        </button>
      </div>

      {view === 'source' ? (
        <pre className="code_block html">
          <code>{code}</code>
        </pre>
      ) : (
        <div className="rendered_frame">
          <iframe
            title={I18n.getTrans('i.rendered_page')}
            sandbox=""
            srcDoc={renderedSrcDoc(I18n.getTrans('i.d1_page_h1'), I18n.getTrans('i.d1_page_p'))}
          />
          {/* The caption carries its own <strong>/<em>, so it ships as one
              translatable sentence instead of being chopped into fragments
              that no translator could reorder. */}
          <p
            className="frame_caption"
            dangerouslySetInnerHTML={{ __html: I18n.getTrans('i.frame_caption') }}
          />
        </div>
      )}
    </div>
  );
};

export default HtmlPuzzleWidget;
