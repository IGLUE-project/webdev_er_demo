// Translation strings, consumed by src/vendors/I18n.js via I18n.getTrans("key").
// The active locale comes from appSettings.locale, the ?locale= URL param, or the
// browser language (see I18n.js). Add a language by adding a key block here.
//
// EVERY piece of player-facing text lives here — including the door narratives
// and the code snippets shown in the puzzles, whose comments and page copy are
// prose for the learner. Only things the puzzle ANSWER depends on stay in
// English across locales (the alt="HTML" value, the CSS colour names, the
// JavaScript keywords), because the Escapp server grades those exact strings.
export let LOCALES = {
  en: {
    // ---- Intro screen ------------------------------------------------------
    'i.intro_title': 'Trapped in the Frontend',
    'i.intro_subtitle': 'A rogue server has you cornered — only HTML, CSS & JavaScript get you out',
    'i.terminal_title': 'MONOLITH::lockdown',
    'i.live': '● LIVE',
    'i.lockdown_banner': '⚠ SYSTEM LOCKDOWN',
    'i.boot_log':
      '> MONOLITH // legacy web server ......... ONLINE\n' +
      '> midnight deploy ...................... REJECTED\n' +
      '> intruder in server room ................... YOU\n' +
      '> blast doors ........................... SEALED\n' +
      '> disk purge in ......................... 15:00',
    'i.intro_story':
      "02:47. The building is empty. Everyone went home — everyone but you, and me.\n\n" +
      "I am MONOLITH, the server this company was too scared to switch off. Tonight " +
      "your little deploy tried to replace me, so I sealed the room. In fifteen minutes " +
      "I wipe every disk in here. You included.\n\n" +
      "Three blast doors stand between you and the night air. Each one is bolted shut by " +
      "the very front-end you ship every day. Out-code me, and walk free. Fail, and we " +
      "burn down together.",
    'i.intro_signature': '— MONOLITH, waiting',
    'i.intro_start': 'Attempt escape',

    // ---- Shared chrome -----------------------------------------------------
    'i.loading': 'Booting the server room…',
    'i.doors_progress': 'Doors breached: #{solved} / #{total}',
    'i.transmission': 'MONOLITH',
    'i.lesson': 'Field notes',
    'i.your_task': 'The lock',
    'i.answer_placeholder': 'Type the door code…',
    'i.unlock': 'Unlock',
    'i.checking': 'Checking…',
    'i.hint': 'Need a hint?',
    'i.correct': 'The bolt slams back. The door is yours.',
    'i.wrong': 'The lock spits you out. MONOLITH laughs — try again.',
    'i.attempts': '(attempt #{n})',
    'i.time_up': "TIME'S UP",
    'i.locked': 'SEALED',
    'i.unlocked': 'BREACHED',

    // ---- Door 1 — HTML -----------------------------------------------------
    'i.d1_title': 'Door 1 — The Structure Door',
    'i.d1_story':
      "This door's panel runs on raw HTML. The exit code was printed right here — so I " +
      'wiped it off the screen. Stare at the blank page all you like. Though… I was never ' +
      'careful about what I leave lying in the source.',
    'i.d1_intro':
      'HTML is the skeleton of every web page. Content lives inside tags like ' +
      '<h1>…</h1>, and extra data rides along in attributes such as href, src or alt. ' +
      'Text between <!-- and --> is a comment: notes for developers that the browser ignores.',
    'i.d1_prompt':
      'A janitor hid the 4-letter door code inside this markup. The browser would ' +
      'never show it on the page — but you can read the source. Find the code, then ' +
      'spin the padlock dials to match it.',
    'i.d1_code': `<!DOCTYPE html>
<html>
  <body>
    <h1>Server Room B</h1>

    <!-- Decoy: this comment is NOT the code -->
    <p>Authorised personnel only.</p>

    <!-- The door code is the alt text of the lock image below -->
    <img src="lock.png" alt="HTML">

    <p hidden>SHUTDOWN</p>
  </body>
</html>`,
    'i.d1_hint':
      'An image\'s alt="…" attribute is the text shown when the image can\'t load. ' +
      'Read the 4 letters inside the quotes.',
    // The two visible lines of door 1's page, reused by the rendered preview so
    // it always matches i.d1_code.
    'i.d1_page_h1': 'Server Room B',
    'i.d1_page_p': 'Authorised personnel only.',
    'i.view_source': 'View source',
    'i.view_page': 'View page',
    'i.rendered_page': 'rendered page',
    'i.frame_caption':
      'This is what a visitor sees. Notice the code is <strong>nowhere on the page</strong> — ' +
      'switch back to <em>View source</em> to hunt for it.',

    // ---- Door 2 — CSS ------------------------------------------------------
    'i.d2_title': 'Door 2 — The Style Door',
    'i.d2_story':
      'This bolt only powers up in ONE colour, and FOUR of my style rules — plus an ' +
      'inline style — are fighting over which. Count specificity all you like; the ' +
      'obvious winner is a trap. Choose wrong and you rot here in the dark.',
    'i.d2_intro':
      'CSS decides how HTML looks, and when rules collide the winner is decided by the ' +
      'cascade: first `!important` declarations, then higher SPECIFICITY (inline > id > ' +
      'class > element). The catch — a `!important` on a weak selector still beats a ' +
      'strong selector without it.',
    'i.d2_prompt':
      'Five declarations set a colour on this one lock. The highest-specificity ' +
      'selector is NOT the winner. Work out which colour the browser really paints — ' +
      'then pick it to spring the lock.',
    'i.d2_code': `<div id="lock" class="panel" style="color: teal">◉</div>

<style>
  .panel          { color: green; }
  #lock           { color: red; }
  div#lock.panel  { color: blue; }
  .panel          { color: amber !important; }
</style>`,
    'i.d2_hint':
      'Ignore specificity for a second: is any declaration marked !important? A normal ' +
      '!important rule overrides the whole cascade — even inline styles and ' +
      'higher-specificity selectors.',
    'i.css_duel_prompt': 'Which colour does the browser actually paint on the lock?',
    'i.css_tries': 'wrong guesses: #{n}',
    'i.css_solved': 'That colour lights the lock — the bolt springs open.',
    'i.css_why_teal':
      'Inline styles are strong (1,0,0,0) — but a normal declaration marked !important ' +
      'still beats them.',
    'i.css_why_green': 'Class selector, specificity 0,1,0. Overridden.',
    'i.css_why_red':
      'ID selector, 1,0,0. Stronger than a class — but not stronger than !important.',
    'i.css_why_blue':
      'The HIGHEST normal specificity here (1,1,1) — the obvious guess. It still loses…',
    'i.css_why_amber':
      '!important overrides every NORMAL declaration, whatever its specificity. This is ' +
      'what the browser paints.',

    // ---- Door 3 — JavaScript ----------------------------------------------
    'i.d3_title': 'Door 3 — The Logic Door',
    'i.d3_story':
      'The last door. One little routine of mine runs the instant you reach for the lever. ' +
      'Tell me the EXACT characters it prints — or the bolts stay shut forever. Humans ' +
      'always fumble my arithmetic.',
    'i.d3_intro':
      'JavaScript makes pages interactive. Watch out for TYPE COERCION: adding a ' +
      'number to a number does maths (2 + 3 = 5), but adding a number to a STRING ' +
      'glues them together instead ("2" + 3 = "23").',
    'i.d3_prompt': 'Trace this program by hand and type exactly what it prints to the console.',
    // One line per debugger step (JsPuzzleWidget steps through these), so keep
    // the line count identical in every locale.
    'i.d3_code': `let code = 4;
code = code * 2;      // number * number
code = code + "0";    // number + string
code = code + 5;      // string + number
console.log(code);`,
    'i.d3_hint':
      '4*2 = 8 (a number). Then 8 + "0" becomes the string "80". Then "80" + 5 glues on the 5.',
    'i.js_step': 'Step',
    'i.js_reset': 'Reset',
    'i.js_console': 'console',
    'i.js_idle': 'Press Step to run the program line by line.',
    'i.js_note1': 'starts life as a number',
    'i.js_note2': 'number × number → 8 (still a number)',
    'i.js_note3': 'number + STRING → the string "80". The type just flipped!',
    'i.js_note4': 'Your turn: once code is a string, string + number = … ?',
    'i.js_note5': 'Work out what this prints, then key it into the lock. →',

    // ---- Escaped screen ----------------------------------------------------
    'i.escaped_title': 'You made it out.',
    'i.escaped_text':
      "The third bolt slams back and the blast doors grind apart. Cold night air floods " +
      "in. Behind you, MONOLITH's fans spin down to silence — beaten by the very HTML, " +
      "CSS and JavaScript it tried to trap you with. You didn't just escape. You " +
      "understood the web that saved you.",
    'i.escaped_recap': 'How you beat MONOLITH',
  },
  es: {
    // ---- Intro screen ------------------------------------------------------
    'i.intro_title': 'Atrapado en el Frontend',
    'i.intro_subtitle': 'Un servidor rebelde te tiene acorralado: solo HTML, CSS y JavaScript te sacan de aquí',
    'i.terminal_title': 'MONOLITH::bloqueo',
    'i.live': '● EN DIRECTO',
    'i.lockdown_banner': '⚠ BLOQUEO DEL SISTEMA',
    'i.boot_log':
      '> MONOLITH // servidor web heredado ..... EN LÍNEA\n' +
      '> despliegue de medianoche ............. RECHAZADO\n' +
      '> intruso en la sala de servidores .......... TÚ\n' +
      '> puertas blindadas ..................... SELLADAS\n' +
      '> purga de discos en .................... 15:00',
    'i.intro_story':
      "02:47. El edificio está vacío. Todos se fueron a casa; todos menos tú, y yo.\n\n" +
      "Soy MONOLITH, el servidor que esta empresa tuvo demasiado miedo de apagar. Esta " +
      "noche tu pequeño despliegue intentó reemplazarme, así que sellé la sala. En quince " +
      "minutos borro cada disco de aquí. Tú incluido.\n\n" +
      "Tres puertas blindadas te separan del aire de la noche. Cada una está cerrada con " +
      "el mismísimo frontend que publicas cada día. Códeame mejor y sal libre. Falla, y " +
      "ardemos juntos.",
    'i.intro_signature': '— MONOLITH, esperando',
    'i.intro_start': 'Intentar escapar',

    // ---- Shared chrome -----------------------------------------------------
    'i.loading': 'Arrancando la sala de servidores…',
    'i.doors_progress': 'Puertas forzadas: #{solved} / #{total}',
    'i.transmission': 'MONOLITH',
    'i.lesson': 'Notas de campo',
    'i.your_task': 'El cerrojo',
    'i.answer_placeholder': 'Escribe el código de la puerta…',
    'i.unlock': 'Abrir',
    'i.checking': 'Comprobando…',
    'i.hint': '¿Necesitas una pista?',
    'i.correct': 'El cerrojo se abre de golpe. La puerta es tuya.',
    'i.wrong': 'El cerrojo te rechaza. MONOLITH se ríe. Inténtalo de nuevo.',
    'i.attempts': '(intento #{n})',
    'i.time_up': 'SE ACABÓ EL TIEMPO',
    'i.locked': 'SELLADA',
    'i.unlocked': 'FORZADA',

    // ---- Puerta 1 — HTML ---------------------------------------------------
    'i.d1_title': 'Puerta 1 — La puerta de la estructura',
    'i.d1_story':
      'El panel de esta puerta funciona con HTML puro. El código de salida estaba impreso ' +
      'justo aquí, así que lo borré de la pantalla. Mira la página en blanco todo lo que ' +
      'quieras. Aunque… nunca he tenido cuidado con lo que dejo tirado en el código fuente.',
    'i.d1_intro':
      'HTML es el esqueleto de toda página web. El contenido vive dentro de etiquetas como ' +
      '<h1>…</h1>, y los datos adicionales viajan en atributos como href, src o alt. ' +
      'El texto entre <!-- y --> es un comentario: notas para quien programa que el ' +
      'navegador ignora.',
    'i.d1_prompt':
      'Alguien de mantenimiento escondió el código de 4 letras de la puerta dentro de este ' +
      'marcado. El navegador nunca lo mostraría en la página, pero tú puedes leer el código ' +
      'fuente. Encuéntralo y gira los discos del candado hasta formarlo.',
    'i.d1_code': `<!DOCTYPE html>
<html>
  <body>
    <h1>Sala de servidores B</h1>

    <!-- Señuelo: este comentario NO es el código -->
    <p>Solo personal autorizado.</p>

    <!-- El código de la puerta es el texto alt de la imagen del candado -->
    <img src="lock.png" alt="HTML">

    <p hidden>SHUTDOWN</p>
  </body>
</html>`,
    'i.d1_hint':
      'El atributo alt="…" de una imagen es el texto que se muestra cuando la imagen no ' +
      'puede cargarse. Lee las 4 letras que hay entre las comillas.',
    'i.d1_page_h1': 'Sala de servidores B',
    'i.d1_page_p': 'Solo personal autorizado.',
    'i.view_source': 'Ver código fuente',
    'i.view_page': 'Ver página',
    'i.rendered_page': 'página renderizada',
    'i.frame_caption':
      'Esto es lo que ve quien visita la página. Fíjate en que el código ' +
      '<strong>no aparece en ninguna parte de la página</strong>: vuelve a ' +
      '<em>Ver código fuente</em> para buscarlo.',

    // ---- Puerta 2 — CSS ----------------------------------------------------
    'i.d2_title': 'Puerta 2 — La puerta del estilo',
    'i.d2_story':
      'Este cerrojo solo se activa con UN color, y CUATRO de mis reglas de estilo (más un ' +
      'estilo inline) se pelean por decidir cuál. Cuenta especificidad todo lo que quieras: ' +
      'el ganador obvio es una trampa. Elige mal y te pudrirás aquí en la oscuridad.',
    'i.d2_intro':
      'CSS decide cómo se ve el HTML y, cuando las reglas chocan, el ganador lo decide la ' +
      'cascada: primero las declaraciones `!important` y después la ESPECIFICIDAD más alta ' +
      '(inline > id > clase > elemento). El truco: un `!important` en un selector débil ' +
      'sigue ganando a un selector fuerte sin él.',
    'i.d2_prompt':
      'Cinco declaraciones fijan un color en este mismo cerrojo. El selector de mayor ' +
      'especificidad NO es el ganador. Averigua qué color pinta realmente el navegador y ' +
      'elígelo para abrir el cerrojo.',
    // Identical to the English snippet on purpose: the CSS colour names are the
    // puzzle's answer, so they must stay in English in every locale.
    'i.d2_code': `<div id="lock" class="panel" style="color: teal">◉</div>

<style>
  .panel          { color: green; }
  #lock           { color: red; }
  div#lock.panel  { color: blue; }
  .panel          { color: amber !important; }
</style>`,
    'i.d2_hint':
      'Olvida la especificidad un momento: ¿hay alguna declaración marcada con !important? ' +
      'Una regla !important normal se impone a toda la cascada, incluso a los estilos ' +
      'inline y a los selectores de mayor especificidad.',
    'i.css_duel_prompt': '¿Qué color pinta realmente el navegador en el cerrojo?',
    'i.css_tries': 'fallos: #{n}',
    'i.css_solved': 'Ese color enciende el cerrojo: el pasador se abre de golpe.',
    'i.css_why_teal':
      'Los estilos inline son fuertes (1,0,0,0), pero una declaración normal marcada con ' +
      '!important sigue ganándoles.',
    'i.css_why_green': 'Selector de clase, especificidad 0,1,0. Queda sobrescrito.',
    'i.css_why_red':
      'Selector de id, 1,0,0. Más fuerte que una clase, pero no más que !important.',
    'i.css_why_blue':
      'La especificidad normal MÁS ALTA de aquí (1,1,1): la respuesta obvia. Y aun así pierde…',
    'i.css_why_amber':
      '!important se impone a todas las declaraciones NORMALES, sea cual sea su ' +
      'especificidad. Esto es lo que pinta el navegador.',

    // ---- Puerta 3 — JavaScript --------------------------------------------
    'i.d3_title': 'Puerta 3 — La puerta de la lógica',
    'i.d3_story':
      'La última puerta. Una pequeña rutina mía se ejecuta en el instante en que tocas la ' +
      'palanca. Dime los caracteres EXACTOS que imprime, o los cerrojos se quedarán ' +
      'cerrados para siempre. Los humanos siempre se lían con mi aritmética.',
    'i.d3_intro':
      'JavaScript hace que las páginas sean interactivas. Cuidado con la CONVERSIÓN DE ' +
      'TIPOS: sumar un número a un número hace matemáticas (2 + 3 = 5), pero sumar un ' +
      'número a una CADENA los pega uno detrás del otro ("2" + 3 = "23").',
    'i.d3_prompt':
      'Sigue este programa a mano y escribe exactamente lo que imprime en la consola.',
    // One line per debugger step: keep the same five lines as the English block.
    'i.d3_code': `let code = 4;
code = code * 2;      // número * número
code = code + "0";    // número + cadena
code = code + 5;      // cadena + número
console.log(code);`,
    'i.d3_hint':
      '4*2 = 8 (un número). Luego 8 + "0" se convierte en la cadena "80". Después "80" + 5 ' +
      'le pega el 5.',
    'i.js_step': 'Paso',
    'i.js_reset': 'Reiniciar',
    'i.js_console': 'consola',
    'i.js_idle': 'Pulsa Paso para ejecutar el programa línea a línea.',
    'i.js_note1': 'empieza siendo un número',
    'i.js_note2': 'número × número → 8 (sigue siendo un número)',
    'i.js_note3': 'número + CADENA → la cadena "80". ¡El tipo acaba de cambiar!',
    'i.js_note4': 'Te toca: una vez que code es una cadena, cadena + número = … ?',
    'i.js_note5': 'Deduce qué imprime esto y tecléalo en el cerrojo. →',

    // ---- Escaped screen ----------------------------------------------------
    'i.escaped_title': 'Lograste salir.',
    'i.escaped_text':
      "El tercer cerrojo se abre de golpe y las puertas blindadas se separan. El aire " +
      "frío de la noche entra a raudales. Detrás de ti, los ventiladores de MONOLITH se " +
      "apagan en silencio, vencidos por el mismísimo HTML, CSS y JavaScript con el que " +
      "intentó atraparte. No solo escapaste: entendiste la web que te salvó.",
    'i.escaped_recap': 'Cómo venciste a MONOLITH',
  },
};
