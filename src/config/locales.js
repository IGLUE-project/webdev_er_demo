// Translation strings, consumed by src/vendors/I18n.js via I18n.getTrans("key").
// The active locale comes from appSettings.locale, the ?locale= URL param, or the
// browser language (see I18n.js). Add a language by adding a key block here.
export let LOCALES = {
  en: {
    'i.intro_title': 'Trapped in the Frontend',
    'i.intro_subtitle': 'A rogue server has you cornered — only HTML, CSS & JavaScript get you out',
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
    'i.escaped_title': 'You made it out.',
    'i.escaped_text':
      "The third bolt slams back and the blast doors grind apart. Cold night air floods " +
      "in. Behind you, MONOLITH's fans spin down to silence — beaten by the very HTML, " +
      "CSS and JavaScript it tried to trap you with. You didn't just escape. You " +
      "understood the web that saved you.",
    'i.escaped_recap': 'How you beat MONOLITH',
  },
  es: {
    'i.intro_title': 'Atrapado en el Frontend',
    'i.intro_subtitle': 'Un servidor rebelde te tiene acorralado: solo HTML, CSS y JavaScript te sacan de aquí',
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
    'i.escaped_title': 'Lograste salir.',
    'i.escaped_text':
      "El tercer cerrojo se abre de golpe y las puertas blindadas se separan. El aire " +
      "frío de la noche entra a raudales. Detrás de ti, los ventiladores de MONOLITH se " +
      "apagan en silencio, vencidos por el mismísimo HTML, CSS y JavaScript con el que " +
      "intentó atraparte. No solo escapaste: entendiste la web que te salvó.",
    'i.escaped_recap': 'Cómo venciste a MONOLITH',
  },
};
