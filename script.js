/* =========================================
   TECH ARENA - LÓGICA DEL JUEGO
   ========================================= */

"use strict";

// 1. CONFIGURACIÓN DEL JUEGO

const CONFIG = {
    xpPerMission: 100,
    xpPerLevel: 400,
    maxXP: 1200,
    maxLevel: 3,
    maxAttempts: 3,
    storagePrefix: "techArenaProgress:",
    sessionKey: "techArenaSession"
};

// 2. MUNDOS Y MISIONES

// mk(id, título, subtítulo, reporte, pregunta, correcta, [[respuesta, título, mensaje] x3], [objetivo, texto], pista, insignia)
const mk = (id, title, tagline, report, question, correct, opts, objective, tip, badge) => ({
    id, title, tagline, report, question, objective, tip, badge,
    correctAnswer: correct,
    reward: CONFIG.xpPerMission,
    answers: opts.map(option => option[0]),
    feedback: Object.fromEntries(opts.map((option, i) => [
        "abc"[i],
        { correct: "abc"[i] === correct, title: option[1], message: option[2] }
    ]))
});

const WORLDS = [
    {
        id: "hardware", name: "HARDWARE LAB", short: "Hardware",
        description: "Construye, identifica y repara. Conoce lo que ocurre dentro de una computadora.",
        missions: [
            mk("hardware-001", "LA PC NO ARRANCA", "Piensa como un técnico. Diagnostica antes de reemplazar.",
                "Mi computadora enciende y los ventiladores giran, pero el monitor no muestra ninguna imagen. Necesito recuperar mi equipo.",
                "¿Qué revisarías primero?", "a", [
                    ["Comprobar la conexión del monitor y la memoria RAM.", "¡Buen diagnóstico, técnico!",
                        "Comprobar el monitor, los cables y la RAM es un buen comienzo. Una RAM mal instalada puede impedir que la computadora muestre imagen. Recuerda que existen otras causas posibles: un diagnóstico profesional debe comprobar cada una antes de cambiar componentes."],
                    ["Probar con otro cable o monitor compatible y, si sigue sin imagen, cambiar la tarjeta gráfica.", "¡No compres componentes todavía!",
                        "Probar otro cable o monitor ayuda a aislar la causa, pero reemplazar la tarjeta gráfica sin comprobar alimentación, RAM y conexiones puede llevar a un gasto innecesario."],
                    ["Iniciar una reinstalación del sistema operativo desde una memoria USB.", "Ese no es el primer paso.",
                        "La reinstalación del sistema no corrige un fallo que aparece antes de que cargue el sistema operativo y podría poner en riesgo tus archivos. Primero identifica si el problema es de pantalla, conexión o hardware."]
                ], ["Diagnóstico técnico", "Identifica posibles causas antes de decidir una solución."],
                "No reemplaces un componente sin comprobar primero las causas más sencillas.", "DIAGNÓSTICO INICIAL"),
            mk("hardware-002", "LA PC VA MUY LENTA", "Busca la causa antes de gastar dinero.",
                "Mi computadora antes abría los programas en segundos y ahora tarda minutos. Tiene muchos programas instalados y casi no queda espacio en el disco.",
                "¿Qué harías primero?", "b", [
                    ["Ejecutar un análisis completo de malware antes de revisar el uso de recursos.", "Demasiado pronto.", "Un análisis de malware puede ser útil, pero primero conviene comprobar el espacio libre, los programas en segundo plano y el uso de CPU, RAM y disco para encontrar la causa real."],
                    ["Liberar espacio, cerrar programas innecesarios y revisar qué se inicia con el sistema.", "¡Excelente diagnóstico!", "Un disco casi lleno y demasiados programas en segundo plano son causas muy comunes de lentitud, y revisarlos no cuesta nada."],
                    ["Ampliar la memoria RAM inmediatamente, sin revisar qué recursos están saturados.", "Eso no ayuda.", "Ampliar la RAM podría ayudar, pero sin medir el consumo no sabes si es el cuello de botella. Primero revisa el Administrador de tareas y libera espacio."]
                ], ["Rendimiento", "Reconoce las causas comunes de una computadora lenta."],
                "Disco lleno y programas de inicio: dos sospechosos habituales.", "OPTIMIZADOR"),
            mk("hardware-003", "SE APAGA SOLA", "El calor también rompe computadoras.",
                "Mi laptop se apaga sola cuando veo videos o juego, y el ventilador suena muy fuerte. Casi siempre la uso sobre mi cama.",
                "¿Cuál es la causa más probable y qué harías?", "c", [
                    ["Reinstalar el sistema operativo porque los apagados suelen ser un fallo de software.", "Esa no es la causa.", "Reinstalar el sistema no resuelve una ventilación obstruida. El ventilador fuerte y los apagados durante tareas exigentes apuntan primero a una posible temperatura elevada."],
                    ["Usar una base refrigerante, pero mantener la laptop sobre la cama.", "Eso empeoraría el problema.", "Una base refrigerante puede ayudar, pero la cama sigue bloqueando las entradas de aire. Coloca la laptop en una superficie dura y revisa las rejillas."],
                    ["Usarla sobre una superficie dura y limpiar el polvo de las rejillas y del ventilador.", "¡Buen ojo, técnico!", "Las camas bloquean la ventilación y el polvo atasca el ventilador. Sin aire fresco, el equipo se apaga para protegerse."]
                ], ["Refrigeración", "Relaciona los síntomas con el sobrecalentamiento."],
                "Si el ventilador grita, el equipo te está pidiendo aire.", "ENFRIAMIENTO")
        ]
    },
    {
        id: "cyber", name: "CYBER DEFENSE", short: "Ciber",
        description: "Detecta amenazas, descubre estafas y protege los sistemas de los atacantes.",
        missions: [
            mk("cyber-001", "CORREO SOSPECHOSO", "Si presiona con urgencia, desconfía.",
                "Recibí un correo que dice ser de mi banco: 'Tu cuenta será bloqueada hoy. Haz clic aquí para verificar tu clave'. El remitente es soporte@seguro-banco.xyz.",
                "¿Qué haces?", "c", [
                    ["Abro el enlace y reviso si la página tiene el candado HTTPS antes de escribir mis datos.", "¡Cuidado, es una trampa!", "El candado HTTPS cifra la conexión, pero no garantiza que el sitio pertenezca al banco. No uses el enlace del correo: entra por la aplicación o dirección oficial."],
                    ["Respondo al remitente para pedirle que confirme si el aviso es auténtico.", "Eso lo propaga.", "Responder confirma que tu dirección está activa y no demuestra que el remitente sea legítimo. Verifica el aviso directamente con el banco y reporta el correo."],
                    ["No hago clic, no respondo y consulto al banco por sus canales oficiales.", "¡Excelente reflejo!", "Los bancos no piden claves por correo. Verificar por un canal oficial es la forma segura de salir de dudas."]
                ], ["Anti-phishing", "Reconoce las señales de un correo fraudulento."],
                "Revisa siempre la dirección del remitente, no solo el nombre.", "CAZAPHISHING"),
            mk("cyber-002", "CONTRASEÑA DÉBIL", "Una clave fácil es una puerta abierta.",
                "Un amigo usa '12345' como contraseña en todas sus cuentas para no olvidarla. Te pide consejo.",
                "¿Qué le recomiendas?", "a", [
                    ["Una contraseña larga y distinta para cada cuenta, y activar la verificación en dos pasos.", "¡Gran consejo!", "Si una cuenta se filtra, las demás siguen a salvo. La verificación en dos pasos agrega otra barrera."],
                    ["Crear una clave con su fecha de nacimiento y cambiarla cada mes.", "Demasiado fácil de adivinar.", "Cambiarla con frecuencia no compensa que sea predecible ni que se reutilice. Es mejor una clave larga y única, idealmente guardada en un gestor de contraseñas."],
                    ["Guardar la misma contraseña en una nota del teléfono para no olvidarla.", "Todas las cuentas importan.", "Una nota sin protección puede quedar expuesta si alguien accede al teléfono. Un gestor de contraseñas ayuda a guardar claves únicas de forma más segura."]
                ], ["Contraseñas", "Aprende a crear y proteger tus claves."],
                "Una frase larga es más fuerte que una palabra corta con números.", "GUARDIÁN DE CLAVES"),
            mk("cyber-003", "WI-FI PÚBLICO", "No todas las redes son de confianza.",
                "Estás en un café con Wi-Fi gratis y necesitas revisar tu cuenta bancaria.",
                "¿Qué es lo más seguro?", "b", [
                    ["Usar el Wi-Fi del café si la aplicación del banco muestra que la conexión está cifrada.", "No es tan seguro.", "El cifrado de la aplicación es importante, pero no elimina todos los riesgos de una red pública o de un punto de acceso falso. Para operaciones bancarias, prefiere datos móviles o una red confiable."],
                    ["Usar mis datos móviles o esperar a una red de confianza.", "¡Buena decisión!", "Para operaciones sensibles conviene una red propia o de confianza, no una abierta."],
                    ["Abrir una ventana de incógnito y entrar al banco desde la red pública.", "El candado no basta.", "El modo incógnito solo evita guardar parte del historial en el dispositivo; no vuelve segura la red. Usa datos móviles o espera a una conexión confiable."]
                ], ["Redes seguras", "Decide dónde y cómo conectarte con seguridad."],
                "Wi-Fi gratis: bueno para ver videos, malo para el banco.", "ESCUDO DE RED")
        ]
    },
    {
        id: "creator", name: "DIGITAL CREATOR", short: "Creador",
        description: "Investiga, organiza información y resuelve problemas usando lógica digital.",
        missions: [
            mk("creator-001", "BÚSQUEDA EFICAZ", "Buscar bien también es una habilidad.",
                "Debes investigar cuántos años tardó la construcción de Machu Picchu. Tu búsqueda 'cosas del Perú antiguo' no da buenos resultados.",
                "¿Cómo mejoras tu búsqueda?", "a", [
                    ["Usar palabras clave precisas y revisar fuentes confiables.", "¡Búsqueda de experto!", "Palabras como 'construcción Machu Picchu años' acotan los resultados, y las fuentes confiables evitan errores."],
                    ["Buscar una pregunta completa muy larga que mezcle varios temas distintos.", "Más largo no es mejor.", "Una consulta demasiado larga con varios temas puede mezclar resultados. Usa palabras clave específicas y cambia la búsqueda si no obtienes fuentes pertinentes."],
                    ["Elegir el primer resultado que tenga una apariencia profesional, sin revisar quién lo publica.", "Revísalo antes.", "Una apariencia profesional no garantiza exactitud. Comprueba autoría, fecha, referencias y contrasta la información con otras fuentes confiables."]
                ], ["Investigación", "Convierte una duda en una búsqueda precisa."],
                "Piensa en las 3 o 4 palabras que más importan de tu pregunta.", "INVESTIGADOR"),
            mk("creator-002", "ARCHIVOS EN CAOS", "Un buen orden ahorra horas.",
                "Tu escritorio tiene 80 archivos llamados 'documento1', 'imagen(3)' y 'final final'. No encuentras tu tarea.",
                "¿Qué haces?", "c", [
                    ["Crear una sola carpeta llamada “Tareas” y mover allí todos los archivos sin clasificarlos.", "¡Perderías tu trabajo!", "Una sola carpeta sin clasificación solo traslada el desorden. Organiza por materia o tipo de archivo y usa nombres descriptivos antes de moverlos."],
                    ["Mantener los nombres actuales y confiar en que el buscador encuentre cada archivo.", "No resuelve el desorden.", "El buscador puede ayudar, pero los nombres genéricos hacen más difícil distinguir versiones. Renombra y clasifica los archivos para encontrarlos con rapidez."],
                    ["Crear carpetas por tema y nombrar los archivos con una descripción y la fecha.", "¡Orden perfecto!", "Nombres claros y carpetas por tema hacen que todo se encuentre rápido."]
                ], ["Organización", "Aplica buenas prácticas con archivos y carpetas."],
                "Un nombre como 'Matematica_Tarea3_2026' dice mucho más que 'documento1'.", "ARCHIVISTA"),
            mk("creator-003", "LÓGICA PASO A PASO", "Los programas siguen un orden.",
                "Quieres que un robot prepare jugo de naranja. Sus pasos: exprimir, servir, comprar naranjas y lavarlas.",
                "¿Cuál es el orden lógico correcto?", "b", [
                    ["Comprar las naranjas, servir el vaso y después exprimirlas y lavarlas.", "Ese orden no funciona.", "El robot no puede servir antes de preparar el jugo. Define una secuencia donde cada acción tenga disponibles los materiales y resultados necesarios."],
                    ["Comprar, lavar, exprimir, servir.", "¡Lógica impecable!", "Cada paso necesita el resultado del anterior. Pensar así es la base de los algoritmos."],
                    ["Lavar las naranjas, exprimirlas, comprarlas y finalmente servir el jugo.", "Falta lógica.", "El orden empieza por conseguir las naranjas. Después se lavan, se exprimen y finalmente se sirve el jugo."]
                ], ["Algoritmos", "Ordena instrucciones para lograr un resultado."],
                "Pregúntate qué necesita cada paso antes de poder hacerse.", "PENSADOR LÓGICO")
        ]
    },
    {
        id: "ai", name: "AI ARENA", short: "IA",
        description: "Desafía a la inteligencia artificial, crea instrucciones y verifica sus respuestas.",
        missions: [
            mk("ai-001", "RESPUESTA SOSPECHOSA", "Que suene seguro no significa que sea cierto.",
                "Le preguntaste a una IA por la fecha de un hecho histórico. Respondió con mucha seguridad, pero tu libro dice otra fecha.",
                "¿Qué haces?", "b", [
                    ["Le pido a la misma IA que explique con más detalle por qué esa fecha es correcta.", "Las IA sí se equivocan.", "Pedirle a la misma IA que repita la explicación no constituye una verificación independiente. Contrasta el dato con fuentes confiables y rastreables."],
                    ["Contrasto con fuentes confiables antes de decidir.", "¡Muy buen criterio!", "Verificar con libros y sitios confiables es la mejor forma de usar la IA."],
                    ["Busco la misma fecha en publicaciones de redes sociales y acepto la que más se repita.", "No lo hagas.", "Que una publicación repita la misma fecha no basta si no cita fuentes confiables. Busca una fuente primaria o una referencia educativa reconocida."]
                ], ["Verificación", "Comprueba la información antes de creerla."],
                "Pídele a la IA sus fuentes y compruébalas tú mismo.", "VERIFICADOR"),
            mk("ai-002", "INSTRUCCIÓN CLARA", "Una buena pregunta da una buena respuesta.",
                "Le pides a una IA: 'hazme una tarea'. La respuesta es vaga y no te sirve.",
                "¿Cómo mejoras tu instrucción?", "c", [
                    ["Indico solamente el tema y dejo que la IA decida el nivel, la extensión y el formato.", "Gritar no ayuda.", "El tema por sí solo no indica para qué nivel, con qué extensión ni en qué formato necesitas la respuesta. Añade esos requisitos y el propósito de la tarea."],
                    ["Pido que redacte toda la tarea, sin explicar para qué curso es ni qué estructura necesito.", "Aún menos claro.", "Pedir una tarea completa sin contexto puede producir algo demasiado general o inadecuado. Indica el curso, el objetivo, la extensión y la estructura esperada."],
                    ["Explico el tema, mi nivel, la extensión y el formato que necesito.", "¡Instrucción de experto!", "Dar contexto y detalles hace que la IA responda con precisión."]
                ], ["Prompts", "Redacta instrucciones claras y completas."],
                "Dile a la IA quién eres, qué necesitas y cómo lo quieres.", "PROMPT MASTER"),
            mk("ai-003", "DATOS PRIVADOS", "Lo que compartes puede no ser privado.",
                "Para que una IA te ayude con un trámite, quieres pegarle tu DNI, tu dirección y tus contraseñas.",
                "¿Qué es lo más seguro?", "a", [
                    ["No compartir datos personales ni contraseñas con una IA.", "¡Decisión inteligente!", "Tu información privada no debe escribirse en chats. Puedes pedir ayuda usando datos de ejemplo."],
                    ["Oculto mi número de DNI, pero comparto mi dirección y mis contraseñas para recibir una respuesta más exacta.", "Cuidado con tu privacidad.", "Ocultar solo el DNI no basta si compartes dirección y contraseñas. No incluyas credenciales y reemplaza los datos personales por ejemplos ficticios."],
                    ["Comparto los datos y le pido a la IA que no los guarde ni los utilice después.", "Borrar no basta.", "Pedirle al sistema que no guarde los datos no garantiza cómo serán tratados. La opción más segura es no compartirlos y usar información ficticia."]
                ], ["Privacidad", "Protege tus datos al usar inteligencia artificial."],
                "Usa nombres y datos inventados cuando pidas ayuda con trámites.", "DATOS A SALVO")
        ]
    }
];

const MISSION_ART = {
    "hardware-001": `<svg viewBox="0 0 520 190" role="img" aria-label="Monitor sin señal y torre encendida"><rect x="30" y="25" width="280" height="130" rx="12" fill="#27253c" stroke="#39e7f5" stroke-width="3"/><rect x="45" y="40" width="250" height="100" rx="5" fill="#090b16"/><text x="170" y="83" text-anchor="middle" fill="#f044b8" font-size="20" font-weight="bold">NO SIGNAL</text><path d="M170 94v15" stroke="#39e7f5" stroke-width="3"/><rect x="150" y="155" width="40" height="10" rx="3" fill="#49465e"/><rect x="125" y="165" width="90" height="7" rx="3" fill="#49465e"/><rect x="350" y="32" width="105" height="140" rx="10" fill="#29273d" stroke="#a855f7" stroke-width="3"/><circle cx="402" cy="80" r="27" fill="#10101e" stroke="#39e7f5" stroke-width="3"/><circle cx="402" cy="80" r="12" fill="none" stroke="#a855f7" stroke-width="3"/><path d="M402 55v50M377 80h50M384 62l36 36M420 62l-36 36" stroke="#39e7f5" stroke-width="2"/><circle cx="430" cy="125" r="5" fill="#7dfc89"/><text x="400" y="20" text-anchor="middle" fill="#aaa6c4" font-size="11">TORRE ENCENDIDA</text></svg>`,
    "hardware-002": `<svg viewBox="0 0 520 190" role="img" aria-label="Computadora lenta con disco casi lleno y programas activos"><rect x="35" y="28" width="230" height="128" rx="10" fill="#27253c" stroke="#39e7f5" stroke-width="3"/><rect x="49" y="42" width="202" height="98" rx="4" fill="#0b0b18"/><path d="M65 65h120M65 82h95M65 99h140" stroke="#a855f7" stroke-width="6" stroke-linecap="round"/><circle cx="218" cy="119" r="12" fill="none" stroke="#f044b8" stroke-width="3"/><path d="M218 119l7-7" stroke="#f044b8" stroke-width="3"/><path d="M150 157v13M105 171h90" stroke="#49465e" stroke-width="8"/><rect x="315" y="34" width="160" height="50" rx="8" fill="#201e33" stroke="#f044b8" stroke-width="2"/><text x="395" y="54" fill="#f044b8" text-anchor="middle" font-size="12">DISCO</text><rect x="333" y="63" width="124" height="8" rx="4" fill="#48445e"/><rect x="333" y="63" width="108" height="8" rx="4" fill="#f044b8"/><text x="395" y="103" fill="#aaa6c4" text-anchor="middle" font-size="12">MUCHOS PROCESOS</text><rect x="315" y="112" width="160" height="52" rx="8" fill="#201e33" stroke="#a855f7" stroke-width="2"/><path d="M333 148l18-20 18 12 19-17 19 10 18-15 19 13" fill="none" stroke="#39e7f5" stroke-width="3"/><text x="395" y="127" fill="#39e7f5" text-anchor="middle" font-size="10">RENDIMIENTO</text></svg>`,
    "hardware-003": `<svg viewBox="0 0 520 190" role="img" aria-label="Laptop sobre una cama con señales de calor"><path d="M30 150h460" stroke="#49465e" stroke-width="5"/><path d="M35 151q20-25 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" fill="none" stroke="#a855f7" stroke-width="3"/><path d="M120 40h235l18 100H102z" fill="#27253c" stroke="#39e7f5" stroke-width="3"/><rect x="133" y="52" width="209" height="74" rx="4" fill="#0b0b18"/><path d="M110 140h270l-28 15H137z" fill="#49465e" stroke="#39e7f5" stroke-width="2"/><path d="M185 30c-10-13 10-18 0-29M235 30c-10-13 10-18 0-29M285 30c-10-13 10-18 0-29" transform="translate(0 22)" stroke="#f044b8" stroke-width="4" fill="none" stroke-linecap="round"/><text x="240" y="91" text-anchor="middle" fill="#f044b8" font-size="17" font-weight="bold">OVERHEAT</text><circle cx="430" cy="65" r="28" fill="#201e33" stroke="#f044b8" stroke-width="3"/><path d="M430 43v44M408 65h44M414 49l32 32M446 49l-32 32" stroke="#f044b8" stroke-width="3"/><text x="430" y="111" text-anchor="middle" fill="#aaa6c4" font-size="11">VENTILADOR</text></svg>`,
    "cyber-001": `<svg viewBox="0 0 520 190" role="img" aria-label="Correo sospechoso con enlace y señal de alerta"><rect x="48" y="22" width="300" height="145" rx="10" fill="#201e33" stroke="#a855f7" stroke-width="3"/><path d="M50 35l148 72L346 35" fill="none" stroke="#39e7f5" stroke-width="3"/><path d="M52 155l105-70M344 155L239 85" stroke="#49465e" stroke-width="2"/><rect x="80" y="54" width="150" height="10" rx="5" fill="#aaa6c4"/><rect x="80" y="75" width="200" height="7" rx="3" fill="#49465e"/><rect x="80" y="90" width="170" height="7" rx="3" fill="#49465e"/><rect x="80" y="112" width="130" height="20" rx="5" fill="#f044b8"/><text x="145" y="126" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">VERIFICAR CUENTA</text><path d="M402 30l52 94h-104z" fill="#f044b8"/><text x="402" y="98" text-anchor="middle" fill="#fff" font-size="36" font-weight="bold">!</text><text x="402" y="145" text-anchor="middle" fill="#f044b8" font-size="12">PHISHING</text></svg>`,
    "cyber-002": `<svg viewBox="0 0 520 190" role="img" aria-label="Contraseña débil frente a una contraseña protegida"><rect x="35" y="35" width="205" height="120" rx="12" fill="#201e33" stroke="#f044b8" stroke-width="3"/><text x="137" y="59" fill="#f044b8" text-anchor="middle" font-size="12">CLAVE DÉBIL</text><rect x="57" y="73" width="160" height="30" rx="5" fill="#0b0b18"/><text x="137" y="93" fill="#f044b8" text-anchor="middle" font-size="19">12345</text><path d="M65 125h145" stroke="#f044b8" stroke-width="3" stroke-dasharray="5 5"/><path d="M260 95h40m-12-12l12 12-12 12" stroke="#aaa6c4" stroke-width="4" fill="none"/><rect x="320" y="35" width="165" height="120" rx="12" fill="#201e33" stroke="#7dfc89" stroke-width="3"/><rect x="382" y="55" width="40" height="35" rx="8" fill="none" stroke="#7dfc89" stroke-width="4"/><path d="M390 55v-9a12 12 0 0124 0v9" fill="none" stroke="#7dfc89" stroke-width="4"/><text x="402" y="112" fill="#7dfc89" text-anchor="middle" font-size="12">CLAVE ÚNICA</text><text x="402" y="132" fill="#aaa6c4" text-anchor="middle" font-size="10">+ 2FA</text></svg>`,
    "cyber-003": `<svg viewBox="0 0 520 190" role="img" aria-label="Red Wi-Fi pública y conexión segura alternativa"><path d="M55 65q70-70 140 0M80 88q45-45 90 0M108 111q17-17 34 0" fill="none" stroke="#f044b8" stroke-width="6" stroke-linecap="round"/><circle cx="125" cy="128" r="6" fill="#f044b8"/><text x="125" y="153" text-anchor="middle" fill="#f044b8" font-size="12">WI-FI PÚBLICO</text><path d="M215 90h75m-15-15l15 15-15 15" stroke="#aaa6c4" stroke-width="4" fill="none"/><rect x="315" y="30" width="110" height="135" rx="12" fill="#201e33" stroke="#39e7f5" stroke-width="3"/><rect x="327" y="45" width="86" height="98" rx="5" fill="#0b0b18"/><circle cx="370" cy="130" r="4" fill="#39e7f5"/><path d="M353 82v-10a17 17 0 0134 0v10" fill="none" stroke="#7dfc89" stroke-width="4"/><rect x="346" y="81" width="48" height="36" rx="6" fill="#7dfc89"/><path d="M359 98l8 8 15-17" stroke="#10101e" stroke-width="4" fill="none"/><text x="465" y="88" fill="#7dfc89" text-anchor="middle" font-size="11">DATOS</text><text x="465" y="103" fill="#7dfc89" text-anchor="middle" font-size="11">MÓVILES</text></svg>`,
    "creator-001": `<svg viewBox="0 0 520 190" role="img" aria-label="Búsqueda con palabras clave y verificación de fuentes"><rect x="35" y="35" width="280" height="42" rx="20" fill="#201e33" stroke="#39e7f5" stroke-width="3"/><circle cx="60" cy="55" r="9" fill="none" stroke="#39e7f5" stroke-width="3"/><path d="M67 62l9 9" stroke="#39e7f5" stroke-width="3"/><text x="94" y="60" fill="#f3f0ff" font-size="13">construcción Machu Picchu años</text><rect x="45" y="94" width="250" height="25" rx="5" fill="#27253c"/><text x="58" y="110" fill="#39e7f5" font-size="11">FUENTE EDUCATIVA</text><rect x="45" y="126" width="250" height="25" rx="5" fill="#27253c"/><text x="58" y="142" fill="#aaa6c4" font-size="11">AUTOR · FECHA · REFERENCIAS</text><circle cx="400" cy="85" r="45" fill="#201e33" stroke="#a855f7" stroke-width="3"/><path d="M379 85l14 14 29-32" fill="none" stroke="#7dfc89" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><text x="400" y="148" text-anchor="middle" fill="#7dfc89" font-size="12">CONTRASTAR</text></svg>`,
    "creator-002": `<svg viewBox="0 0 520 190" role="img" aria-label="Archivos desordenados que se organizan en carpetas"><g fill="#27253c" stroke="#f044b8" stroke-width="2"><rect x="35" y="38" width="62" height="52" rx="5" transform="rotate(-8 66 64)"/><rect x="92" y="25" width="62" height="52" rx="5" transform="rotate(8 123 51)"/><rect x="58" y="95" width="62" height="52" rx="5" transform="rotate(7 89 121)"/><rect x="135" y="87" width="62" height="52" rx="5" transform="rotate(-9 166 113)"/></g><g fill="#f044b8" font-size="10"><text x="43" y="65">final2</text><text x="103" y="52">doc1</text><text x="68" y="123">img(3)</text><text x="144" y="116">final</text></g><path d="M220 91h65m-15-15l15 15-15 15" stroke="#aaa6c4" stroke-width="4" fill="none"/><path d="M330 55h65l15 15h45v70H330z" fill="#201e33" stroke="#39e7f5" stroke-width="3"/><path d="M330 70h125" stroke="#39e7f5" stroke-width="3"/><text x="390" y="96" text-anchor="middle" fill="#39e7f5" font-size="12">TAREAS</text><text x="390" y="114" text-anchor="middle" fill="#aaa6c4" font-size="10">2026</text><text x="390" y="128" text-anchor="middle" fill="#aaa6c4" font-size="10">MATEMÁTICA</text></svg>`,
    "creator-003": `<svg viewBox="0 0 520 190" role="img" aria-label="Secuencia lógica de pasos para preparar jugo"><g><rect x="20" y="52" width="100" height="75" rx="10" fill="#201e33" stroke="#a855f7" stroke-width="3"/><text x="70" y="82" text-anchor="middle" fill="#f3f0ff" font-size="12">1. COMPRAR</text><circle cx="70" cy="103" r="10" fill="#ffad5c"/><rect x="150" y="52" width="100" height="75" rx="10" fill="#201e33" stroke="#39e7f5" stroke-width="3"/><text x="200" y="82" text-anchor="middle" fill="#f3f0ff" font-size="12">2. LAVAR</text><path d="M185 95q15 20 30 0" stroke="#39e7f5" stroke-width="3" fill="none"/><rect x="280" y="52" width="100" height="75" rx="10" fill="#201e33" stroke="#ffad5c" stroke-width="3"/><text x="330" y="82" text-anchor="middle" fill="#f3f0ff" font-size="12">3. EXPRIMIR</text><path d="M310 95h40l-8 20h-24z" fill="#ffad5c"/><rect x="410" y="52" width="90" height="75" rx="10" fill="#201e33" stroke="#7dfc89" stroke-width="3"/><text x="455" y="82" text-anchor="middle" fill="#f3f0ff" font-size="12">4. SERVIR</text><path d="M440 93h30l-4 25h-22z" fill="#7dfc89"/></g><path d="M122 90h23m-7-7l7 7-7 7M252 90h23m-7-7l7 7-7 7M382 90h23m-7-7l7 7-7 7" stroke="#aaa6c4" stroke-width="3" fill="none"/></svg>`,
    "ai-001": `<svg viewBox="0 0 520 190" role="img" aria-label="Respuesta de inteligencia artificial que necesita verificación"><rect x="35" y="30" width="265" height="125" rx="12" fill="#201e33" stroke="#a855f7" stroke-width="3"/><circle cx="65" cy="55" r="10" fill="#a855f7"/><text x="85" y="59" fill="#a855f7" font-size="12">RESPUESTA IA</text><rect x="55" y="77" width="220" height="8" rx="4" fill="#49465e"/><rect x="55" y="94" width="190" height="8" rx="4" fill="#49465e"/><text x="55" y="128" fill="#f044b8" font-size="12">¿FUENTE VERIFICABLE?</text><circle cx="400" cy="85" r="47" fill="#201e33" stroke="#f044b8" stroke-width="3"/><text x="400" y="100" text-anchor="middle" fill="#f044b8" font-size="45" font-weight="bold">?</text><path d="M350 145h100" stroke="#39e7f5" stroke-width="3"/><text x="400" y="163" text-anchor="middle" fill="#39e7f5" font-size="11">COMPROBAR</text></svg>`,
    "ai-002": `<svg viewBox="0 0 520 190" role="img" aria-label="Instrucción vaga que se transforma en una instrucción clara"><rect x="25" y="35" width="185" height="115" rx="12" fill="#201e33" stroke="#f044b8" stroke-width="3"/><text x="117" y="60" text-anchor="middle" fill="#f044b8" font-size="12">PROMPT VAGO</text><text x="117" y="92" text-anchor="middle" fill="#f3f0ff" font-size="15">“Hazme una</text><text x="117" y="112" text-anchor="middle" fill="#f3f0ff" font-size="15">tarea”</text><path d="M225 92h60m-13-13l13 13-13 13" stroke="#aaa6c4" stroke-width="4" fill="none"/><rect x="300" y="25" width="195" height="135" rx="12" fill="#201e33" stroke="#39e7f5" stroke-width="3"/><text x="397" y="49" text-anchor="middle" fill="#39e7f5" font-size="12">PROMPT CLARO</text><g fill="#aaa6c4" font-size="11"><text x="320" y="73">TEMA + CONTEXTO</text><text x="320" y="94">NIVEL + EXTENSIÓN</text><text x="320" y="115">FORMATO + OBJETIVO</text></g><path d="M320 132h150" stroke="#7dfc89" stroke-width="3"/></svg>`,
    "ai-003": `<svg viewBox="0 0 520 190" role="img" aria-label="Datos personales protegidos y alerta de privacidad"><rect x="45" y="28" width="205" height="135" rx="12" fill="#201e33" stroke="#f044b8" stroke-width="3"/><circle cx="83" cy="63" r="14" fill="#49465e"/><path d="M58 104q25-35 50 0" fill="#49465e"/><rect x="120" y="49" width="105" height="8" rx="4" fill="#aaa6c4"/><rect x="120" y="66" width="85" height="8" rx="4" fill="#49465e"/><rect x="60" y="120" width="165" height="22" rx="5" fill="#f044b8"/><text x="142" y="135" text-anchor="middle" fill="#fff" font-size="11">DATO PRIVADO</text><path d="M325 66v-12a35 35 0 0170 0v12" fill="none" stroke="#7dfc89" stroke-width="5"/><rect x="313" y="65" width="94" height="75" rx="12" fill="#7dfc89"/><circle cx="360" cy="91" r="8" fill="#10101e"/><path d="M360 98v17" stroke="#10101e" stroke-width="5"/><text x="360" y="160" text-anchor="middle" fill="#7dfc89" font-size="12">PRIVACIDAD</text><path d="M270 92h30m-10-10l10 10-10 10" stroke="#aaa6c4" stroke-width="4" fill="none"/></svg>`
};

WORLDS.forEach(world => world.missions.forEach(item => { item.world = world; }));
const ALL_MISSIONS = WORLDS.flatMap(world => world.missions);

let mission = null;
let currentWorld = null;

// 3. REFERENCIAS A LOS ELEMENTOS HTML

const elements = {
    screens: document.querySelectorAll(".screen"),

    loginScreen: document.getElementById("login-screen"),
    worldScreen: document.getElementById("world-screen"),
    worldKicker: document.getElementById("world-kicker"),
    worldTitle: document.getElementById("world-title"),
    worldDescription: document.getElementById("world-description"),
    levelList: document.getElementById("level-list"),
    worldBackButton: document.getElementById("world-back-button"),
    missionKicker: document.getElementById("mission-kicker"),
    missionTitle: document.getElementById("mission-title"),
    missionTagline: document.getElementById("mission-tagline"),
    missionCase: document.getElementById("mission-case"),
    missionDifficulty: document.getElementById("mission-difficulty"),
    missionArt: document.getElementById("mission-art"),
    caseText: document.getElementById("case-text"),
    questionNumber: document.getElementById("question-number"),
    questionTitle: document.getElementById("question-title"),
    objectiveTitle: document.getElementById("objective-title"),
    objectiveText: document.getElementById("objective-text"),
    tipText: document.getElementById("tip-text"),
    loginForm: document.getElementById("login-form"),
    loginError: document.getElementById("login-error"),
    topbarRight: document.getElementById("topbar-right"),
    playerName: document.getElementById("player-name"),
    downloadButton: document.getElementById("download-report"),
    logoutButton: document.getElementById("logout-button"),

    homeScreen: document.getElementById("home-screen"),
    missionScreen: document.getElementById("mission-screen"),
    resultScreen: document.getElementById("result-screen"),

    playButton: document.getElementById("play-button"),
    insertCoinButton: document.getElementById("insert-coin-button"),
    brandHome: document.getElementById("brand-home"),
    backButton: document.getElementById("back-button"),

    checkAnswerButton: document.getElementById("check-answer"),
    nextMissionButton: document.getElementById("next-mission"),
    resultHomeButton: document.getElementById("result-home-button"),

    answerButtons: document.querySelectorAll(".answer-option"),
    answerList: document.getElementById("answer-list"),
    feedback: document.getElementById("feedback"),

    playerLevel: document.getElementById("player-level"),
    playerXP: document.getElementById("player-xp"),
    playerRank: document.getElementById("player-rank"),

    xpProgressLabel: document.getElementById("xp-progress-label"),
    xpProgressPercent: document.getElementById("xp-progress-percent"),
    xpProgressBar: document.getElementById("xp-progress-bar"),

    missionsCompleted: document.getElementById("missions-completed"),
    worldsAvailable: document.getElementById("worlds-available"),
    attemptCount: document.getElementById("attempt-count"),

    arenaMapPanel: document.getElementById("arena-map-panel"),
    arenaMap: document.getElementById("arena-map"),
    mapNodes: document.querySelectorAll(".map-node"),
    mapCoordinate: document.getElementById("map-coordinate"),
    mapSelectedKicker: document.getElementById("map-selected-kicker"),
    mapSelectedTitle: document.getElementById("map-selected-title"),
    mapSelectedDescription: document.getElementById("map-selected-description"),
    mapSelectedProgress: document.getElementById("map-selected-progress"),
    mapSelectedProgressLabel: document.getElementById("map-selected-progress-label"),
    mapNotice: document.getElementById("map-notice"),
    mapEnterButton: document.getElementById("map-enter-button"),
    mapPlayerMarker: document.getElementById("map-player-marker"),
    mapNpcs: document.querySelectorAll(".map-npc"),
    mapSigns: document.querySelectorAll(".map-sign"),
    mapCollectibles: document.querySelectorAll(".map-collectible"),
    collectionItems: document.querySelectorAll("[data-collection-item]"),
    collectionCount: document.getElementById("collection-count"),
    collectionCaption: document.getElementById("collection-caption"),
    explorerName: document.getElementById("explorer-name"),
    explorerSummary: document.getElementById("explorer-summary"),
    explorerTitle: document.getElementById("explorer-title"),
    explorerBadges: document.getElementById("explorer-badges"),
    explorerProfileCaption: document.getElementById("explorer-profile-caption"),
    achievementProgressLabel: document.getElementById("achievement-progress-label"),
    achievementProgressBar: document.getElementById("achievement-progress-bar"),
    achievementCardName: document.getElementById("achievement-card-name"),
    achievementCardTitle: document.getElementById("achievement-card-title"),
    achievementCardMissions: document.getElementById("achievement-card-missions"),
    achievementCardItems: document.getElementById("achievement-card-items"),
    achievementCardBadges: document.getElementById("achievement-card-badges"),
    downloadAchievementCardButton: document.getElementById("download-achievement-card"),

    resultTitle: document.getElementById("result-title"),
    resultDescription: document.getElementById("result-description"),
    resultXP: document.getElementById("result-xp"),
    resultBadgeTitle: document.getElementById("result-badge-title"),
    resultBadgeDescription: document.getElementById("result-badge-description")
};

// 4. PERFIL Y ESTADO DEL JUGADOR

let profile = null; // { id, nombre, escuela, grado }
let player = { xp: 0, completedMissions: [], log: {} };

let selectedAnswer = null;
let attemptsRemaining = CONFIG.maxAttempts;
let answerLocked = false;
let missionFinished = false;
let earnedXPThisRun = 0;
let selectedMapWorldIndex = 0;

function makeProfileId(nombre, escuela, grado) {
    return [nombre, escuela, grado]
        .map(text => text.trim().toLowerCase().replace(/\s+/g, " "))
        .join("|");
}

function loadPlayer(id) {
    try {
        const saved = JSON.parse(
            localStorage.getItem(CONFIG.storagePrefix + id)
        );

        if (
            !saved ||
            !saved.profile ||
            !Number.isFinite(saved.xp) ||
            saved.xp < 0 ||
            !Array.isArray(saved.completedMissions)
        ) {
            return false;
        }

        profile = { ...saved.profile, id };
        // Conserva solo misiones reales y elimina duplicados de partidas antiguas.
        const validMissionIds = new Set(ALL_MISSIONS.map(item => item.id));
        const completedMissions = [...new Set(saved.completedMissions)]
            .filter(missionId => validMissionIds.has(missionId))
            .slice(0, ALL_MISSIONS.length);

        player = {
            // La XP se recalcula desde las misiones completadas para corregir
            // valores antiguos o manipulados y mantener el máximo de 1200 XP.
            xp: Math.min(completedMissions.length * CONFIG.xpPerMission, CONFIG.maxXP),
            completedMissions,
            log: saved.log && typeof saved.log === "object" ? saved.log : {}
        };
        // Guarda la versión normalizada para que el progreso antiguo no vuelva
        // a introducir XP fuera del límite en el siguiente inicio.
        saveProgress();
        return true;
    } catch (error) {
        console.warn("No se pudo cargar el progreso guardado.", error);
        return false;
    }
}

// 5. GUARDAR PROGRESO Y REGISTRAR RESULTADOS

function saveProgress() {
    if (!profile) {
        return;
    }

    try {
        localStorage.setItem(
            CONFIG.storagePrefix + profile.id,
            JSON.stringify({
                profile,
                xp: player.xp,
                completedMissions: player.completedMissions,
                log: player.log
            })
        );
    } catch (error) {
        console.warn("No se pudo guardar el progreso.", error);
    }
}

// Guarda cómo le fue al jugador en la misión (se usa en el informe PDF).
// Si ya la había completado, se conserva su primer logro y solo se cuentan las repeticiones.
function recordResult(completed, attemptsUsed) {
    const previous = player.log[mission.id];

    if (previous && previous.completed) {
        previous.runs += 1;
    } else {
        player.log[mission.id] = {
            title: mission.title,
            completed,
            attempts: attemptsUsed,
            xp: earnedXPThisRun,
            date: new Date().toISOString(),
            runs: (previous ? previous.runs : 0) + 1
        };
    }

    saveProgress();
}

// 6. CAMBIAR ENTRE PANTALLAS

function showScreen(screenToShow) {
    elements.screens.forEach(screen => {
        screen.classList.remove("active");
    });

    screenToShow.classList.add("active");

    if (screenToShow === elements.homeScreen) {
        requestAnimationFrame(() => initializeArcadeMap());
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function goHome() {
    if (!profile) {
        showScreen(elements.loginScreen);
        return;
    }

    showScreen(elements.homeScreen);
    updateDashboard();
}

// 7. ACTUALIZAR NIVEL Y EXPERIENCIA

function getPlayerLevel() {
    const safeXP = Math.min(Math.max(0, player.xp), CONFIG.maxXP);
    return Math.min(CONFIG.maxLevel, Math.floor(safeXP / CONFIG.xpPerLevel) + 1);
}

function getPlayerRank(level) {
    if (level >= CONFIG.maxLevel) {
        return "EXPERTO TECH";
    }

    if (level >= 2) {
        return "TÉCNICO DIGITAL";
    }

    return "NOVATO DIGITAL";
}

function updateDashboard() {
    // Mantiene los datos válidos aunque se cargue un progreso antiguo.
    player.xp = Math.min(
        Math.max(0, player.completedMissions.length * CONFIG.xpPerMission),
        CONFIG.maxXP
    );

    const level = getPlayerLevel();
    const atMaxXP = player.xp >= CONFIG.maxXP;
    const xpInsideLevel = atMaxXP ? CONFIG.xpPerLevel : player.xp % CONFIG.xpPerLevel;
    const percentage = atMaxXP ? 100 : Math.floor((xpInsideLevel / CONFIG.xpPerLevel) * 100);

    elements.playerLevel.textContent = String(level).padStart(2, "0");
    elements.playerXP.textContent = `${player.xp} / ${CONFIG.maxXP} XP`;
    elements.playerRank.textContent = getPlayerRank(level);
    elements.xpProgressLabel.textContent = atMaxXP
        ? "¡Arena completada! Nivel máximo alcanzado"
        : level >= CONFIG.maxLevel
            ? `Nivel máximo · ${xpInsideLevel} / ${CONFIG.xpPerLevel} XP para completar la arena`
            : `${xpInsideLevel} / ${CONFIG.xpPerLevel} XP para el siguiente nivel`;
    elements.xpProgressPercent.textContent = `${percentage}%`;
    elements.xpProgressBar.style.width = `${percentage}%`;

    elements.missionsCompleted.textContent =
        String(player.completedMissions.length).padStart(2, "0");
    elements.worldsAvailable.textContent = String(
        WORLDS.filter(world => isWorldUnlocked(world)).length
    ).padStart(2, "0");

    updateWorldCards();
}

// 8. INICIAR O REINICIAR LA MISIÓN

function isWorldUnlocked(targetWorld) {
    const worldIndex = WORLDS.indexOf(targetWorld);

    if (worldIndex < 0) {
        return false;
    }

    // El primer mundo siempre está disponible.
    if (worldIndex === 0) {
        return true;
    }

    // Para abrir un mundo, deben completarse todas las misiones del anterior.
    const previousWorld = WORLDS[worldIndex - 1];
    return previousWorld.missions.every(item =>
        player.completedMissions.includes(item.id)
    );
}

function isWorldCompleted(targetWorld) {
    return targetWorld.missions.every(item =>
        player.completedMissions.includes(item.id)
    );
}

function updateWorldCards() {
    document.querySelectorAll(".world-card").forEach(card => {
        const button = card.querySelector(".world-button");
        const status = card.querySelector(".world-status");
        if (!button || !status) return;

        const world = WORLDS.find(item => item.id === button.dataset.world);
        if (!world) return;

        const unlocked = isWorldUnlocked(world);
        const completed = unlocked && isWorldCompleted(world);

        card.classList.toggle("locked-card", !unlocked);
        status.classList.toggle("available-status", unlocked && !completed);
        status.classList.toggle("locked-status", !unlocked);
        status.classList.toggle("completed-status", completed);
        status.textContent = completed
            ? "✔ COMPLETADO"
            : unlocked
                ? "● DISPONIBLE"
                : "🔒 BLOQUEADO";

        button.disabled = !unlocked;
        button.textContent = !unlocked ? "🔒" : completed ? "✓" : "↗";
        button.setAttribute("aria-label", unlocked
            ? `Entrar a ${world.name}${completed ? ", mundo completado" : ""}`
            : `${world.name} bloqueado. Completa el mundo anterior.`);

        const progressLabel = card.querySelector(`[data-world-count="${world.id}"]`);
        if (progressLabel) {
            const completedCount = world.missions.filter(item =>
                player.completedMissions.includes(item.id)
            ).length;
            progressLabel.textContent = `${completedCount} / ${world.missions.length} MISIONES`;
        }
    });

    updateMapWorldStates();
}

// El personaje se mueve por una red de caminos. Las coordenadas se calculan
// a partir de la posición real de los mundos para adaptarse a pantallas pequeñas.
let mapPlayerPosition = { x: 18, y: 36 };
let mapPlayerDirection = "down";
const MAP_STEP_X = 2.4;
const MAP_STEP_Y = 4.6;

function getMapNodePositions() {
    const mapRect = elements.arenaMap.getBoundingClientRect();
    if (!mapRect.width || !mapRect.height) return [];
    return [...elements.mapNodes].map(node => {
        const rect = node.getBoundingClientRect();
        return {
            x: ((rect.left + rect.width / 2 - mapRect.left) / mapRect.width) * 100,
            y: ((rect.top + rect.height / 2 - mapRect.top) / mapRect.height) * 100
        };
    });
}

function getMapGeometry() {
    const nodes = getMapNodePositions();
    if (nodes.length < 4) return { nodes: [], points: [], segments: [] };
    const [one, two, three, four] = nodes;
    const middleX = (one.x + two.x) / 2;
    const middleY = (one.y + four.y) / 2;
    const lowerY = Math.min(94, three.y + 13);
    const outerX = Math.min(92, two.x + 12);
    const points = [
        one, { x: one.x, y: one.y + 12 }, { x: one.x, y: middleY },
        { x: middleX, y: middleY }, { x: middleX, y: two.y }, two,
        { x: two.x, y: middleY }, { x: outerX, y: middleY },
        { x: outerX, y: three.y }, three, { x: middleX, y: three.y },
        { x: middleX, y: lowerY }, { x: one.x, y: lowerY }, four,
        { x: four.x, y: middleY }, { x: one.x, y: middleY }
    ];
    const segments = [];
    for (let i = 0; i < points.length - 1; i++) segments.push([points[i], points[i + 1]]);
    // Ramales secundarios: conectan el camino principal con las casas y los NPC.
    // Ramales en forma de lazo: cada salida vuelve a un tramo existente,
    // evitando caminos que terminan sin conexión.
    const branches = [
        // Sendero principal vertical que conecta directamente a NOVA con PIXEL.
        // Ambos puntos coinciden con los centros de sus zonas de encuentro.
        [{ x: middleX, y: middleY }, { x: middleX, y: lowerY }],
        [{ x: middleX - 10, y: middleY }, { x: middleX - 10, y: middleY - 5 }, { x: middleX - 5, y: middleY - 5 }, { x: middleX - 5, y: middleY }],
        [{ x: outerX, y: middleY + 8 }, { x: outerX + 4, y: middleY + 8 }, { x: outerX + 4, y: middleY + 3 }, { x: outerX, y: middleY + 3 }],
        [{ x: middleX - 10, y: lowerY }, { x: middleX - 10, y: lowerY - 5 }, { x: middleX - 5, y: lowerY - 5 }, { x: middleX - 5, y: lowerY }]
    ];
    branches.forEach(pointsInBranch => {
        for (let i = 0; i < pointsInBranch.length - 1; i++) segments.push([pointsInBranch[i], pointsInBranch[i + 1]]);
    });
    return { nodes, points, segments, branches };
}

function updateMapRoutes() {
    if (!elements.arenaMap || !elements.mapNodes.length) return;
    const geometry = getMapGeometry();
    if (!geometry.points.length) return;
    const [hardware, cyber, creator, ai] = geometry.nodes;
    const middleX = (hardware.x + cyber.x) / 2;
    const middleY = (hardware.y + ai.y) / 2;
    const outerX = Math.min(92, cyber.x + 12);
    const lowerY = Math.min(94, creator.y + 13);
    const npcPositions = {
        guide: { x: middleX, y: middleY },
        tech: { x: cyber.x, y: middleY },
        librarian: { x: middleX, y: lowerY }
    };
    elements.mapNpcs?.forEach(npc => {
        const position = npcPositions[npc.dataset.npc];
        if (!position) return;
        npc.dataset.npcX = position.x;
        npc.dataset.npcY = position.y;
        npc.style.left = `${position.x}%`;
        npc.style.top = `${position.y}%`;
    });
    // Posiciones restauradas desde la versión 9.1, donde los cinco secretos eran alcanzables.
    // Cada objeto queda centrado sobre un tramo real del camino transitable.
    const collectiblePositions = {
        chip: { x: hardware.x, y: (hardware.y + middleY) / 2 },
        // El escudo se coloca sobre el tramo vertical real que sube hacia Cyber Defense.
        shield: { x: middleX, y: (middleY + cyber.y) / 2 },
        code: { x: middleX, y: (middleY + lowerY) / 2 },
        // El cristal queda en el camino vertical del lado derecho, entre el cruce central y Creator.
        // Este tramo pertenece al camino principal, así que se puede alcanzar caminando por la ruta.
        crystal: { x: outerX, y: (middleY + creator.y) / 2 },
        key: { x: (hardware.x + middleX) / 2, y: middleY }
    };
    elements.mapCollectibles?.forEach(item => {
        const position = collectiblePositions[item.dataset.collectible];
        if (!position) return;
        item.dataset.itemX = position.x;
        item.dataset.itemY = position.y;
        item.style.left = `${position.x}%`;
        item.style.top = `${position.y}%`;
    });
    renderCollection();
    const mainPath = geometry.points.map((point, index) => `${index ? "L" : "M"}${(point.x / 100 * 800).toFixed(1)} ${(point.y / 100 * 390).toFixed(1)}`).join(" ");
    const branchPath = geometry.branches.map(pointsInBranch => pointsInBranch.map((point, index) => `${index ? "L" : "M"}${(point.x / 100 * 800).toFixed(1)} ${(point.y / 100 * 390).toFixed(1)}`).join(" ")).join(" ");
    // No cerrar el camino principal con Z: eso dibujaba una diagonal fantasma.
    elements.arenaMap.querySelectorAll(".map-route path").forEach(path => path.setAttribute("d", `${mainPath} ${branchPath}`));
}

function renderMapPlayer() {
    if (!elements.mapPlayerMarker) return;
    elements.mapPlayerMarker.style.left = `${mapPlayerPosition.x}%`;
    elements.mapPlayerMarker.style.top = `${mapPlayerPosition.y}%`;
    elements.mapPlayerMarker.classList.remove("facing-up", "facing-down", "facing-left", "facing-right");
    elements.mapPlayerMarker.classList.add(`facing-${mapPlayerDirection}`);
    const nearbyNpc = getNearbyNpc();
    elements.mapNpcs?.forEach(npc => npc.classList.toggle("npc-nearby", npc === nearbyNpc));
    const nearbyItem = getNearbyCollectible();
    elements.mapCollectibles?.forEach(item => {
        const collected = getExplorationData().collectedItems.includes(item.dataset.collectible);
        item.classList.toggle("is-collected", collected);
        item.classList.toggle("collectible-nearby", item === nearbyItem && !collected);
    });
    let closestSign = null;
    let closestSignDistance = Infinity;
    elements.mapSigns?.forEach(sign => {
        const dx = (mapPlayerPosition.x - Number(sign.dataset.signX)) * 0.8;
        const dy = mapPlayerPosition.y - Number(sign.dataset.signY);
        const distance = Math.hypot(dx, dy);
        if (distance < closestSignDistance) { closestSignDistance = distance; closestSign = sign; }
    });
    elements.mapSigns?.forEach(sign => sign.classList.toggle("sign-nearby", sign === closestSign && closestSignDistance <= 8));
}

function isWalkableMapPosition(candidate) {
    const { segments } = getMapGeometry();
    // Tolerancias más estrechas para que el personaje permanezca sobre la calzada.
    const horizontalTolerance = 3.1;
    const verticalTolerance = 2.7;
    const endpointTolerance = 2.4;

    return segments.some(([a, b]) => {
        if (Math.abs(a.y - b.y) < 0.8) {
            const minX = Math.min(a.x, b.x) - endpointTolerance;
            const maxX = Math.max(a.x, b.x) + endpointTolerance;
            return candidate.x >= minX && candidate.x <= maxX && Math.abs(candidate.y - a.y) <= horizontalTolerance;
        }
        if (Math.abs(a.x - b.x) < 0.8) {
            const minY = Math.min(a.y, b.y) - endpointTolerance;
            const maxY = Math.max(a.y, b.y) + endpointTolerance;
            return candidate.y >= minY && candidate.y <= maxY && Math.abs(candidate.x - a.x) <= verticalTolerance;
        }
        // También permite recorrer los ramales diagonales que llevan a zonas de descanso.
        const px = candidate.x * 0.65, py = candidate.y;
        const ax = a.x * 0.65, ay = a.y, bx = b.x * 0.65, by = b.y;
        const vx = bx - ax, vy = by - ay;
        const lengthSquared = vx * vx + vy * vy;
        const t = lengthSquared ? Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / lengthSquared)) : 0;
        const nearestX = ax + t * vx, nearestY = ay + t * vy;
        return Math.hypot(px - nearestX, py - nearestY) <= 2.7;
    });
}

const COLLECTIBLE_INFO = {
    chip: { name: "CHIP DE MEMORIA", hint: "Un componente pequeño, una función importante." },
    shield: { name: "ESCUDO DIGITAL", hint: "La seguridad se construye con varias capas de protección." },
    code: { name: "FRAGMENTO DE CÓDIGO", hint: "Cada programa empieza con una idea bien ordenada." },
    crystal: { name: "CRISTAL DE ENERGÍA", hint: "La curiosidad es energía para seguir aprendiendo." },
    key: { name: "LLAVE DE DATOS", hint: "Protege tus datos y piensa antes de compartirlos." }
};

function getNearbyCollectible() {
    const collected = getExplorationData().collectedItems;
    let nearest = null;
    let bestDistance = Infinity;
    elements.mapCollectibles?.forEach(item => {
        if (collected.includes(item.dataset.collectible)) return;
        const dx = (mapPlayerPosition.x - Number(item.dataset.itemX)) * 0.8;
        const dy = mapPlayerPosition.y - Number(item.dataset.itemY);
        const distance = Math.hypot(dx, dy);
        if (distance < bestDistance) { bestDistance = distance; nearest = item; }
    });
    return bestDistance <= 5.5 ? nearest : null;
}

function renderCollection() {
    if (!elements.collectionCount) return;
    const collected = getExplorationData().collectedItems;
    elements.collectionCount.textContent = `${collected.length} / 5`;
    elements.collectionItems?.forEach(item => item.classList.toggle("is-unlocked", collected.includes(item.dataset.collectionItem)));
    if (elements.collectionCaption) {
        elements.collectionCaption.textContent = collected.length === 5
            ? "¡Colección completa! Encontraste todos los secretos de TECH ARENA."
            : `Explora los caminos y recoge los objetos secretos. Te faltan ${5 - collected.length}. Acércate y pulsa E.`;
    }
    renderExplorerProfile();
}

function renderExplorerProfile() {
    if (!elements.explorerBadges) return;
    const data = getExplorationData();
    const completed = player.completedMissions.length;
    const collected = data.collectedItems.length;
    const discoveries = data.discoveries.length;
    const badges = {
        "first-mission": completed >= 1,
        "npc-friend": discoveries >= 3,
        collector: collected >= 5,
        "arena-master": completed >= ALL_MISSIONS.length
    };
    elements.explorerBadges.querySelectorAll("[data-badge]").forEach(badge => {
        const unlocked = Boolean(badges[badge.dataset.badge]);
        badge.classList.toggle("is-unlocked", unlocked);
        badge.classList.toggle("is-locked", !unlocked);
        const state = badge.querySelector("small");
        if (state) {
            const original = {
                "first-mission": "Completa una misión",
                "npc-friend": "Habla con los 3 NPC",
                collector: "Encuentra los 5 objetos",
                "arena-master": "Completa las 12 misiones"
            }[badge.dataset.badge];
            state.textContent = unlocked ? "INSIGNIA DESBLOQUEADA" : original;
        }
    });
    let title = "RECLUTA DIGITAL";
    if (completed >= 1) title = "APRENDIZ TECNOLÓGICO";
    if (discoveries >= 3) title = "EXPLORADOR DE LA ARENA";
    if (collected >= 5) title = "CAZASECRETOS";
    if (completed >= ALL_MISSIONS.length) title = "LEYENDA TECH";
    if (elements.explorerTitle) elements.explorerTitle.textContent = title;
    if (elements.explorerName) elements.explorerName.textContent = profile?.nombre || "Explorador";
    if (elements.explorerSummary) elements.explorerSummary.textContent = `${completed}/${ALL_MISSIONS.length} misiones · ${discoveries}/3 personajes · ${collected}/5 secretos`;
    const unlockedCount = Object.values(badges).filter(Boolean).length;
    if (elements.explorerProfileCaption) {
        elements.explorerProfileCaption.textContent = `${unlockedCount}/4 insignias desbloqueadas. Sigue jugando para cambiar tu título y completar tu perfil.`;
    }
    if (elements.achievementProgressLabel) elements.achievementProgressLabel.textContent = `${unlockedCount} / 4`;
    if (elements.achievementProgressBar) elements.achievementProgressBar.style.width = `${unlockedCount / 4 * 100}%`;
    if (elements.achievementCardName) elements.achievementCardName.textContent = profile?.nombre || "Explorador";
    if (elements.achievementCardTitle) elements.achievementCardTitle.textContent = title;
    if (elements.achievementCardMissions) elements.achievementCardMissions.textContent = `${completed}/${ALL_MISSIONS.length}`;
    if (elements.achievementCardItems) elements.achievementCardItems.textContent = `${collected}/5`;
    if (elements.achievementCardBadges) elements.achievementCardBadges.textContent = `${unlockedCount}/4`;
}

function collectNearbyItem() {
    const item = getNearbyCollectible();
    if (!item) return false;
    const data = getExplorationData();
    const id = item.dataset.collectible;
    if (!data.collectedItems.includes(id)) {
        data.collectedItems.push(id);
        saveExplorationData(data);
        const info = COLLECTIBLE_INFO[id];
        elements.mapNotice.textContent = `✦ ¡OBJETO SECRETO ENCONTRADO! ${info.name}. ${info.hint}`;
        elements.mapNotice.classList.add("notice-dialogue-active", "notice-exploration-reward", "notice-item-reward");
        item.classList.add("collectible-picked-up");
        window.clearTimeout(mapDialogueTimer);
        mapDialogueTimer = window.setTimeout(() => {
            elements.mapNotice.classList.remove("notice-dialogue-active", "notice-exploration-reward", "notice-item-reward");
        }, 3200);
        renderCollection();
        renderMapPlayer();
    }
    return true;
}

let mapWalkTimer = null;
function moveMapCharacter(direction) {
    if (!elements.arenaMap || !elements.arenaMapPanel || !elements.arenaMapPanel.offsetParent) return;
    mapPlayerDirection = direction;
    elements.mapPlayerMarker?.classList.add("is-walking");
    clearTimeout(mapWalkTimer);
    mapWalkTimer = setTimeout(() => elements.mapPlayerMarker?.classList.remove("is-walking"), 180);
    const candidate = { ...mapPlayerPosition };
    if (direction === "left") candidate.x -= MAP_STEP_X;
    if (direction === "right") candidate.x += MAP_STEP_X;
    if (direction === "up") candidate.y -= MAP_STEP_Y;
    if (direction === "down") candidate.y += MAP_STEP_Y;

    candidate.x = Math.max(4, Math.min(96, candidate.x));
    candidate.y = Math.max(6, Math.min(94, candidate.y));
    if (isWalkableMapPosition(candidate)) mapPlayerPosition = candidate;
    renderMapPlayer();

    const nodes = getMapNodePositions();
    let nearestIndex = -1;
    let nearestDistance = Infinity;
    nodes.forEach((node, index) => {
        const dx = (mapPlayerPosition.x - node.x) * 0.65;
        const dy = mapPlayerPosition.y - node.y;
        const distance = Math.hypot(dx, dy);
        if (distance < nearestDistance) { nearestDistance = distance; nearestIndex = index; }
    });
    if (nearestIndex >= 0 && nearestDistance <= 13.5 && nearestIndex !== selectedMapWorldIndex) {
        selectMapWorld(nearestIndex);
    }
    const nearbyItem = getNearbyCollectible();
    const nearbyNpc = getNearbyNpc();
    if (nearbyItem && !elements.mapNotice.classList.contains("notice-dialogue-active")) {
        const itemInfo = COLLECTIBLE_INFO[nearbyItem.dataset.collectible];
        elements.mapNotice.textContent = `OBJETO SECRETO · ${itemInfo.name}. Pulsa E para recogerlo.`;
        elements.mapNotice.classList.add("notice-sign-active");
    } else if (nearbyNpc && !elements.mapNotice.classList.contains("notice-dialogue-active")) {
        const npcHints = {
            guide: "Nova, la guía: completa las misiones en orden. Cada mundo te prepara para el siguiente. Pulsa E para escuchar una pista.",
            tech: "Byte, el técnico: antes de cambiar piezas, observa los síntomas y descarta primero las causas más sencillas. Pulsa E para hablar.",
            librarian: "Pixel, la archivista: organiza tus archivos, comprueba las fuentes y protege tus datos personales. Pulsa E para una pista."
        };
        elements.mapNotice.textContent = `Estás cerca de ${nearbyNpc.dataset.npc.toUpperCase()}. Pulsa E para hablar.`;
    } else if (nearestDistance > 13.5 && !elements.mapNotice.classList.contains("notice-dialogue-active")) {
        elements.mapNotice.textContent = "Explora los senderos, visita las casas y acércate a un portal para ver sus misiones.";
        elements.mapNotice.classList.remove("notice-sign-active");
    }
    const nearbySign = [...(elements.mapSigns || [])].find(sign => sign.classList.contains("sign-nearby"));
    if (nearbySign && !nearbyNpc && !elements.mapNotice.classList.contains("notice-dialogue-active")) {
        const signNames = { hardware: "HARDWARE LAB", cyber: "CYBER DEFENSE", creator: "DIGITAL CREATOR", ai: "AI ARENA" };
        elements.mapNotice.textContent = `LETRERO · ${signNames[nearbySign.dataset.sign] || "MUNDO"}. Sigue el sendero para acercarte a este portal.`;
        elements.mapNotice.classList.add("notice-sign-active");
    } else if (!nearbySign) {
        elements.mapNotice.classList.remove("notice-sign-active");
    }
}

function getNearbyNpc() {
    if (!elements.mapNpcs?.length) return null;
    let closest = null;
    let bestDistance = Infinity;
    elements.mapNpcs.forEach(npc => {
        const dx = (mapPlayerPosition.x - Number(npc.dataset.npcX)) * 0.8;
        const dy = mapPlayerPosition.y - Number(npc.dataset.npcY);
        const distance = Math.hypot(dx, dy);
        if (distance < bestDistance) { bestDistance = distance; closest = npc; }
    });
    return bestDistance <= 7.2 ? closest : null;
}

let mapDialogueTimer = null;
function getExplorationData() {
    const key = `techArenaExploration:${profile?.id || "guest"}`;
    try {
        const parsed = JSON.parse(localStorage.getItem(key) || "{}");
        return {
            discoveries: Array.isArray(parsed.discoveries) ? parsed.discoveries.filter(id => ["guide", "tech", "librarian"].includes(id)) : [],
            conversations: parsed.conversations && typeof parsed.conversations === "object" ? parsed.conversations : {},
            collectedItems: Array.isArray(parsed.collectedItems) ? parsed.collectedItems.filter(id => Object.prototype.hasOwnProperty.call(COLLECTIBLE_INFO, id)) : []
        };
    } catch (error) {
        return { discoveries: [], conversations: {}, collectedItems: [] };
    }
}

function saveExplorationData(data) {
    const key = `techArenaExploration:${profile?.id || "guest"}`;
    try { localStorage.setItem(key, JSON.stringify(data)); }
    catch (error) { console.warn("No se pudo guardar el progreso de exploración.", error); }
}

function talkToNearbyNpc() {
    if (collectNearbyItem()) return;
    const npc = getNearbyNpc();
    if (!npc) {
        elements.mapNotice.textContent = "No hay nadie cerca. Sigue el sendero hasta una casa o un personaje para pedir una pista.";
        elements.mapNotice.classList.remove("notice-dialogue-active");
        return;
    }

    // Cada personaje tiene una pequeña personalidad y varias líneas para que explorar
    // y volver a conversar se sienta menos repetitivo. No altera la XP de las misiones.
    const dialogue = {
        guide: [
            "NOVA · GUÍA DE LA ARENA: ¡Hey, explorador! ✨ Me encanta ver curiosidad. Completa las tres misiones de un mundo para abrir el siguiente.",
            "NOVA · GUÍA DE LA ARENA: Consejo de ruta: lee el caso, identifica qué te están preguntando y luego revisa las opciones. ¡Paso a paso se llega lejos!",
            "NOVA · GUÍA DE LA ARENA: ¡Vas muy bien! Si te pierdes, mira los letreros y sigue los caminos conectados. Cada zona es una nueva habilidad."
        ],
        tech: [
            "BYTE · TÉCNICO: *ajusta sus gafas* Un buen técnico no adivina: observa los síntomas y prueba primero las causas más sencillas.",
            "BYTE · TÉCNICO: ¡Dato de taller! Si un equipo no enciende, revisa alimentación y conexiones antes de pensar en una pieza dañada.",
            "BYTE · TÉCNICO: Me gusta tu método. Cambiar componentes sin comprobar puede empeorar el problema. Diagnóstico primero, herramientas después."
        ],
        librarian: [
            "PIXEL · ARCHIVISTA: ¡Shhh…! Es broma, puedes hablar conmigo. 📚 Comprueba las fuentes y protege tus datos personales.",
            "PIXEL · ARCHIVISTA: Una buena carpeta y nombres de archivo claros te ahorran tiempo. La organización también es una habilidad tecnológica.",
            "PIXEL · ARCHIVISTA: Recuerda: no todo lo que aparece en internet es cierto. Compara fuentes y piensa antes de compartir información."
        ]
    };

    const data = getExplorationData();
    const npcId = npc.dataset.npc;
    const lines = dialogue[npcId] || ["¡Sigue explorando la arena!"];
    const lineIndex = Number(data.conversations[npcId] || 0) % lines.length;
    data.conversations[npcId] = Number(data.conversations[npcId] || 0) + 1;

    let rewardMessage = "";
    if (!data.discoveries.includes(npcId)) {
        data.discoveries.push(npcId);
        const count = data.discoveries.length;
        rewardMessage = `\n\n✦ DESCUBRIMIENTO ${count}/3: encontraste a ${npcId === "guide" ? "NOVA" : npcId === "tech" ? "BYTE" : "PIXEL"}.`;
        if (count === 3) {
            rewardMessage += "\n🏆 ¡INSIGNIA EXPLORADOR DE LA ARENA DESBLOQUEADA! Has hablado con los tres personajes.";
        }
    } else {
        rewardMessage = `\n\nSello de exploración: ${data.discoveries.length}/3. ${data.discoveries.length === 3 ? "Insignia Explorador desbloqueada." : "Busca a los otros personajes para completar tu colección."}`;
    }
    saveExplorationData(data);

    elements.mapNotice.textContent = lines[lineIndex] + rewardMessage;
    elements.mapNotice.classList.add("notice-dialogue-active", "notice-exploration-reward");
    elements.mapNotice.dataset.speaker = npcId;
    npc.classList.remove("npc-speaking");
    void npc.offsetWidth;
    npc.classList.add("npc-speaking");
    window.clearTimeout(mapDialogueTimer);
    mapDialogueTimer = window.setTimeout(() => {
        elements.mapNotice.classList.remove("notice-dialogue-active", "notice-exploration-reward");
        delete elements.mapNotice.dataset.speaker;
    }, 11000);
}

function moveCharacterToWorld(index) {
    const node = getMapNodePositions()[index];
    if (!node) return;
    const approach = index < 2
        ? { x: node.x, y: Math.min(94, node.y + 12) }
        : { x: node.x, y: Math.max(6, node.y - 12) };
    mapPlayerPosition = approach;
    mapPlayerDirection = index < 2 ? "up" : "down";
    renderMapPlayer();
}

function getWorldProgress(world) {
    return world.missions.filter(item => player.completedMissions.includes(item.id)).length;
}

function updateMapWorldStates() {
    if (!elements.mapNodes || !elements.mapNodes.length) return;

    elements.mapNodes.forEach((node, index) => {
        const world = WORLDS.find(item => item.id === node.dataset.mapWorld);
        if (!world) return;

        const unlocked = isWorldUnlocked(world);
        const completed = isWorldCompleted(world);
        const status = node.querySelector(`[data-map-status="${world.id}"]`);
        node.classList.toggle("is-locked", !unlocked);
        node.classList.toggle("is-completed", completed);
        node.classList.toggle("is-available", unlocked && !completed);
        if (status) status.textContent = completed ? "COMPLETADO" : unlocked ? "DISPONIBLE" : "BLOQUEADO";
        node.setAttribute("aria-label", `${world.name}: ${completed ? "completado" : unlocked ? "disponible" : "bloqueado"}. ${getWorldProgress(world)} de ${world.missions.length} misiones.`);
    });

    renderMapSelection();
}

function renderMapSelection() {
    if (!elements.mapNodes || !elements.mapNodes.length) return;
    selectedMapWorldIndex = Math.max(0, Math.min(selectedMapWorldIndex, WORLDS.length - 1));
    const world = WORLDS[selectedMapWorldIndex];
    const node = [...elements.mapNodes].find(item => item.dataset.mapWorld === world.id);
    const unlocked = isWorldUnlocked(world);
    const completed = isWorldCompleted(world);
    const done = getWorldProgress(world);

    elements.mapNodes.forEach(item => {
        const selected = item.dataset.mapWorld === world.id;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
    });
    elements.mapCoordinate.textContent = `SECTOR ${String(selectedMapWorldIndex + 1).padStart(2, "0")} · 04`;
    elements.mapSelectedKicker.textContent = `MUNDO SELECCIONADO · ${String(selectedMapWorldIndex + 1).padStart(2, "0")}`;
    elements.mapSelectedTitle.textContent = world.name;
    elements.mapSelectedDescription.textContent = world.description;
    elements.mapSelectedProgress.style.width = `${(done / world.missions.length) * 100}%`;
    elements.mapSelectedProgressLabel.textContent = `${done} / ${world.missions.length} MISIONES COMPLETADAS`;
    elements.mapEnterButton.disabled = !unlocked;
    elements.mapEnterButton.textContent = !unlocked ? "MUNDO BLOQUEADO 🔒" : completed ? "REVISAR MUNDO ↗" : "ENTRAR AL MUNDO ↗";
    elements.mapNotice.textContent = !unlocked
        ? `Completa las 3 misiones de ${WORLDS[selectedMapWorldIndex - 1].name} para desbloquear este sector.`
        : completed
            ? "Sector completado. Puedes volver a jugar sus misiones."
            : "Sector listo. Pulsa ENTER o el botón para acceder.";

    // La selección del panel no teletransporta al personaje: se mueve por los caminos.
    renderMapPlayer();
}

function selectMapWorld(index, focusNode = false) {
    selectedMapWorldIndex = (index + WORLDS.length) % WORLDS.length;
    renderMapSelection();
    if (focusNode) elements.mapNodes[selectedMapWorldIndex]?.focus({ preventScroll: true });
}

function enterSelectedMapWorld() {
    const world = WORLDS[selectedMapWorldIndex];
    if (!isWorldUnlocked(world)) {
        elements.mapNotice.textContent = `Mundo bloqueado. Completa primero las misiones de ${WORLDS[selectedMapWorldIndex - 1].name}.`;
        return;
    }
    openWorld(world.id);
}

function isUnlocked(target) {
    if (!target || !isWorldUnlocked(target.world)) {
        return false;
    }

    const list = target.world.missions;
    const index = list.indexOf(target);
    return index === 0 || player.completedMissions.includes(list[index - 1].id);
}

function renderMission() {
    const list = currentWorld.missions;
    const index = list.indexOf(mission);
    const pad = number => String(number).padStart(2, "0");

    elements.missionKicker.textContent = `${currentWorld.name} / MISIÓN ${pad(index + 1)}`;
    elements.missionTitle.textContent = mission.title;
    elements.missionTagline.textContent = mission.tagline;
    elements.missionCase.textContent = `CASO #${String(ALL_MISSIONS.indexOf(mission) + 1).padStart(3, "0")}`;
    elements.missionDifficulty.textContent = `DIFICULTAD: ${["FÁCIL", "NORMAL", "DIFÍCIL"][index] || "NORMAL"}`;
    elements.missionArt.hidden = false;
    elements.missionArt.classList.add("mission-art-visual");
    elements.missionArt.innerHTML = MISSION_ART[mission.id] || MISSION_ART["hardware-001"];
    elements.caseText.textContent = `"${mission.report}"`;
    elements.questionNumber.textContent = `${pad(index + 1)} / ${pad(list.length)}`;
    elements.questionTitle.textContent = mission.question;
    elements.objectiveTitle.textContent = mission.objective[0];
    elements.objectiveText.textContent = mission.objective[1];
    elements.tipText.textContent = mission.tip;

    elements.answerButtons.forEach(button => {
        button.children[1].textContent = mission.answers["abc".indexOf(button.dataset.answer)];
    });
}

function openWorld(worldId) {
    const world = WORLDS.find(item => item.id === worldId);

    if (!profile || !world) {
        return;
    }

    if (!isWorldUnlocked(world)) {
        const worldIndex = WORLDS.indexOf(world);
        const previousWorld = WORLDS[worldIndex - 1];
        alert(`Mundo bloqueado. Completa las ${previousWorld.missions.length} misiones de ${previousWorld.name} para desbloquearlo.`);
        return;
    }

    currentWorld = world;
    elements.worldKicker.textContent = `WORLD_0${WORLDS.indexOf(world) + 1}`;
    elements.worldTitle.textContent = world.name;
    elements.worldDescription.textContent = world.description;

    const rows = world.missions.map((item, index) => {
        const done = player.completedMissions.includes(item.id);
        const unlocked = isUnlocked(item);

        const row = document.createElement("div");
        row.className = "level-row" + (done ? " done" : "") + (unlocked ? "" : " locked");

        const info = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = `NIVEL ${String(index + 1).padStart(2, "0")} · ${item.title}`;
        const status = document.createElement("span");
        status.textContent = done ? "✔ Completado" : unlocked ? "Disponible" : "Completa el nivel anterior para desbloquear";
        info.append(name, status);

        const button = document.createElement("button");
        button.className = "button " + (done ? "button-secondary" : "button-primary");
        button.textContent = done ? "REPETIR" : unlocked ? "JUGAR →" : "🔒";
        button.disabled = !unlocked;
        button.setAttribute("aria-label", done
            ? `Repetir misión: ${item.title}`
            : unlocked
                ? `Jugar misión: ${item.title}`
                : `${item.title} bloqueada. Completa la misión anterior.`);
        button.addEventListener("click", () => startMission(item.id));

        row.append(info, button);
        return row;
    });

    elements.levelList.replaceChildren(...rows);
    showScreen(elements.worldScreen);
}

function startMission(missionId) {
    const target = ALL_MISSIONS.find(item => item.id === missionId);

    if (!profile || !target || !isUnlocked(target)) {
        return;
    }

    mission = target;
    currentWorld = target.world;
    renderMission();

    selectedAnswer = null;
    attemptsRemaining = CONFIG.maxAttempts;
    answerLocked = false;
    missionFinished = false;
    earnedXPThisRun = 0;

    elements.feedback.hidden = true;
    elements.feedback.textContent = "";
    elements.feedback.className = "feedback";

    elements.checkAnswerButton.hidden = false;
    elements.checkAnswerButton.disabled = true;

    elements.nextMissionButton.hidden = true;

    elements.answerButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove("selected");
    });

    updateAttempts();
    showScreen(elements.missionScreen);
}

// 9. SELECCIONAR RESPUESTA

function selectAnswer(button) {
    if (answerLocked || missionFinished) {
        return;
    }

    selectedAnswer = button.dataset.answer;

    elements.answerButtons.forEach(answerButton => {
        answerButton.classList.remove("selected");
    });

    button.classList.add("selected");
    elements.checkAnswerButton.disabled = false;
}

// 10. MOSTRAR RETROALIMENTACIÓN

function showFeedback(isCorrect, title, message) {
    elements.feedback.hidden = false;
    elements.feedback.className = isCorrect
        ? "feedback correct"
        : "feedback incorrect";

    const heading = document.createElement("strong");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    elements.feedback.replaceChildren(heading, paragraph);
}

// 11. COMPROBAR LA RESPUESTA

function checkAnswer() {
    if (
        !selectedAnswer ||
        answerLocked ||
        missionFinished
    ) {
        return;
    }

    const result = mission.feedback[selectedAnswer];

    if (!result) {
        return;
    }

    if (result.correct) {
        answerLocked = true;
        missionFinished = true;

        elements.answerButtons.forEach(button => {
            button.disabled = true;
        });

        // La misión solo recompensa la primera finalización.
        const alreadyCompleted =
            player.completedMissions.includes(mission.id);

        if (!alreadyCompleted) {
            player.completedMissions.push(mission.id);
            player.xp = Math.min(
                player.completedMissions.length * CONFIG.xpPerMission,
                CONFIG.maxXP
            );
            earnedXPThisRun = Math.min(mission.reward, CONFIG.maxXP);
            saveProgress();
        }

        recordResult(true, CONFIG.maxAttempts - attemptsRemaining + 1);
        updateDashboard();

        if (alreadyCompleted) {
            showFeedback(
                true,
                result.title,
                result.message +
                " Ya completaste esta misión anteriormente, " +
                "así que no obtendrás experiencia adicional."
            );
        } else {
            showFeedback(
                true,
                result.title,
                result.message
            );
        }

        elements.checkAnswerButton.hidden = true;
        elements.nextMissionButton.hidden = false;

        return;
    }

    attemptsRemaining--;
    updateAttempts();

    if (attemptsRemaining <= 0) {
        answerLocked = true;
        missionFinished = true;

        elements.answerButtons.forEach(button => {
            button.disabled = true;
        });

        recordResult(false, CONFIG.maxAttempts);

        showFeedback(
            false,
            "FIN DE LOS INTENTOS",
            result.message +
            ` La respuesta recomendada era la ${mission.correctAnswer.toUpperCase()}. ` +
            "Revisa la explicación antes de intentarlo de nuevo."
        );

        elements.checkAnswerButton.hidden = true;
        elements.nextMissionButton.hidden = false;

        return;
    }

    showFeedback(
        false,
        result.title,
        `${result.message} Te quedan ${attemptsRemaining} intentos.`
    );

    // Se permite elegir otra respuesta.
    selectedAnswer = null;

    elements.answerButtons.forEach(button => {
        button.classList.remove("selected");
    });

    elements.checkAnswerButton.disabled = true;
}

// 12. ACTUALIZAR LOS INTENTOS

function updateAttempts() {
    elements.attemptCount.textContent =
        String(attemptsRemaining).padStart(2, "0");
}

// 13. MOSTRAR EL RESULTADO FINAL

function finishMission() {
    if (!missionFinished) {
        return;
    }

    elements.resultScreen.classList.toggle("mission-celebration", earnedXPThisRun > 0);
    if (earnedXPThisRun > 0) {
        elements.resultTitle.textContent = "¡MISIÓN COMPLETADA!";
        elements.resultDescription.textContent =
            `Superaste "${mission.title}". ¡Sigue avanzando por el mundo!`;

        elements.resultBadgeTitle.textContent = mission.badge;
        elements.resultBadgeDescription.textContent =
            `Insignia de ${currentWorld.name}.`;
    } else if (
        player.completedMissions.includes(mission.id)
    ) {
        elements.resultTitle.textContent = "¡DESAFÍO TERMINADO!";
        elements.resultDescription.textContent =
            "Has revisado el caso. Puedes volver a practicar cuando quieras.";

        elements.resultBadgeTitle.textContent = "PRÁCTICA COMPLETADA";
        elements.resultBadgeDescription.textContent =
            "Esta repetición no otorga experiencia adicional.";
    } else {
        elements.resultTitle.textContent = "FIN DEL DESAFÍO";
        elements.resultDescription.textContent =
            "Sigue practicando. Cada error puede ayudarte a aprender.";

        elements.resultBadgeTitle.textContent = "RETO PENDIENTE";
        elements.resultBadgeDescription.textContent =
            "Puedes volver a intentarlo y mejorar tu resultado.";
    }

    elements.resultXP.textContent = `+${earnedXPThisRun} XP`;

    showScreen(elements.resultScreen);
}

// 14. EVENTOS DE LOS BOTONES

function enterArena() {
    if (!profile) {
        showScreen(elements.loginScreen);
        return;
    }

    const pending = ALL_MISSIONS.find(item =>
        !player.completedMissions.includes(item.id) && isUnlocked(item)
    );
    const nextMission = pending || ALL_MISSIONS[ALL_MISSIONS.length - 1];
    const nextWorldIndex = WORLDS.findIndex(world => world.id === nextMission.world.id);
    selectMapWorld(Math.max(0, nextWorldIndex));
    showScreen(elements.homeScreen);
    updateDashboard();
    elements.arenaMapPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    elements.mapNodes[selectedMapWorldIndex]?.focus({ preventScroll: true });
}

elements.playButton.addEventListener("click", enterArena);
elements.insertCoinButton.addEventListener("click", enterArena);

elements.brandHome.addEventListener("click", event => {
    event.preventDefault();
    goHome();
});

elements.backButton.addEventListener("click", () => openWorld(currentWorld.id));

elements.worldBackButton.addEventListener("click", goHome);

elements.resultHomeButton.addEventListener("click", () => openWorld(currentWorld.id));

elements.checkAnswerButton.addEventListener("click", checkAnswer);

elements.nextMissionButton.addEventListener("click", finishMission);

elements.answerButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectAnswer(button);
    });
});

// Los botones de cada mundo respetan el desbloqueo progresivo.

document.querySelectorAll(".world-button").forEach(button => {
    button.addEventListener("click", () => {
        openWorld(button.dataset.world);
    });
});

// El mapa se controla con clic, WASD, flechas y Enter.
elements.mapNodes.forEach((node, index) => {
    node.addEventListener("click", () => {
        selectMapWorld(index);
        moveCharacterToWorld(index);
    });
});

elements.mapEnterButton.addEventListener("click", enterSelectedMapWorld);

// Ajusta el trazado al tamaño real del mapa y coloca al personaje junto al primer portal.
function initializeArcadeMap() {
    if (!elements.arenaMap || !elements.arenaMap.getBoundingClientRect().width) return;
    updateMapRoutes();
    const nodes = getMapNodePositions();
    if (nodes.length) mapPlayerPosition = { x: nodes[0].x, y: Math.min(94, nodes[0].y + 12) };
    renderMapPlayer();
    renderCollection();
}
window.addEventListener("resize", () => {
    updateMapRoutes();
    renderMapPlayer();
});
initializeArcadeMap();

const mapKeyDirections = {
    arrowleft: "left", a: "left",
    arrowright: "right", d: "right",
    arrowup: "up", w: "up",
    arrowdown: "down", s: "down"
};

document.addEventListener("keydown", event => {
    if (!elements.homeScreen.classList.contains("active") || !profile) return;
    const target = event.target;
    if (target && (target.matches("input, textarea, select, button") || target.isContentEditable)) {
        // Permite usar el teclado normalmente en controles; los nodos siguen siendo clicables.
        if (target.matches("input, textarea, select") || target.isContentEditable) return;
        if (target.matches("button") && !elements.arenaMap.contains(target)) return;
    }

    const key = event.key.toLowerCase();
    if (mapKeyDirections[key]) {
        event.preventDefault();
        moveMapCharacter(mapKeyDirections[key]);
    } else if (key === "e" && !event.repeat && !target?.matches?.("input, textarea, select") && !target?.isContentEditable) {
        // E debe funcionar aunque el foco esté en el mapa, en el documento o en un control del mapa.
        if (elements.arenaMapPanel && !elements.arenaMapPanel.hidden && elements.arenaMapPanel.offsetParent !== null) {
            event.preventDefault();
            talkToNearbyNpc();
        }
    } else if (key === "enter" && !event.repeat) {
        const mapFocused = elements.arenaMapPanel.contains(target) || target === document.body;
        if (mapFocused) {
            event.preventDefault();
            enterSelectedMapWorld();
        }
    }
});

// 15. REGISTRO, SESIÓN E INFORME PDF

function applySession() {
    elements.topbarRight.hidden = !profile;
    elements.playerName.textContent = profile ? profile.nombre : "";
}

function login(nombre, escuela, grado) {
    const id = makeProfileId(nombre, escuela, grado);

    // Si ya existe ese perfil en este equipo, se retoma su progreso.
    if (!loadPlayer(id)) {
        profile = { id, nombre, escuela, grado };
        player = { xp: 0, completedMissions: [], log: {} };
    }

    saveProgress();

    try {
        localStorage.setItem(CONFIG.sessionKey, profile.id);
    } catch (error) {
        console.warn("No se pudo recordar la sesión.", error);
    }

    applySession();
    goHome();
}

function logout() {
    profile = null;
    player = { xp: 0, completedMissions: [], log: {} };

    try {
        localStorage.removeItem(CONFIG.sessionKey);
    } catch (error) {
        console.warn("No se pudo cerrar la sesión.", error);
    }

    elements.loginForm.reset();
    applySession();
    showScreen(elements.loginScreen);
}

function downloadAchievementCard() {
    if (!profile) return;
    if (!window.jspdf) {
        alert("No se encontró jsPDF. Comprueba que jspdf.umd.min.js esté junto a index.html.");
        return;
    }
    const data = getExplorationData();
    const completed = player.completedMissions.length;
    const discoveries = data.discoveries.length;
    const collected = data.collectedItems.length;
    const badgeStates = [
        completed >= 1,
        discoveries >= 3,
        collected >= 5,
        completed >= ALL_MISSIONS.length
    ];
    const unlocked = badgeStates.filter(Boolean).length;
    let title = "RECLUTA DIGITAL";
    if (completed >= 1) title = "APRENDIZ TECNOLÓGICO";
    if (discoveries >= 3) title = "EXPLORADOR DE LA ARENA";
    if (collected >= 5) title = "CAZASECRETOS";
    if (completed >= ALL_MISSIONS.length) title = "LEYENDA TECH";

    const doc = new window.jspdf.jsPDF({ orientation: "landscape", unit: "mm", format: [180, 120] });
    doc.setFillColor(16, 14, 31);
    doc.roundedRect(5, 5, 170, 110, 5, 5, "F");
    doc.setDrawColor(99, 232, 255);
    doc.setLineWidth(0.8);
    doc.roundedRect(9, 9, 162, 102, 4, 4, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(99, 232, 255);
    doc.text("TECH ARENA", 16, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(190, 181, 220);
    doc.text("TARJETA OFICIAL DE EXPLORADOR", 164, 20, { align: "right" });
    doc.setFillColor(43, 35, 70);
    doc.circle(31, 43, 10, "F");
    doc.setTextColor(255, 225, 138);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("*", 31, 49, { align: "center" });
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(17);
    doc.text(doc.splitTextToSize(profile.nombre || "Explorador", 105), 47, 39);
    doc.setTextColor(255, 225, 138);
    doc.setFontSize(9);
    doc.text(title, 47, 47);
    doc.setDrawColor(85, 75, 120);
    doc.line(16, 59, 164, 59);
    const stats = [
        { x: 18, label: "MISIONES", value: `${completed}/${ALL_MISSIONS.length}` },
        { x: 67, label: "SECRETOS", value: `${collected}/5` },
        { x: 116, label: "INSIGNIAS", value: `${unlocked}/4` }
    ];
    stats.forEach(stat => {
        doc.setFillColor(34, 29, 54);
        doc.roundedRect(stat.x, 66, 43, 22, 3, 3, "F");
        doc.setTextColor(99, 232, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(stat.value, stat.x + 21.5, 76, { align: "center" });
        doc.setTextColor(190, 181, 220);
        doc.setFontSize(6);
        doc.text(stat.label, stat.x + 21.5, 83, { align: "center" });
    });
    const badgeNames = ["PRIMER PASO", "AMIGO DE LA ARENA", "CAZASECRETOS", "LEYENDA TECH"];
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 225, 138);
    doc.text("INSIGNIAS", 17, 98);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.text(badgeNames.map((name, i) => `${badgeStates[i] ? "[X]" : "[ ]"} ${name}`).join("     "), 17, 104, { maxWidth: 145 });
    doc.setFontSize(6);
    doc.setTextColor(150, 142, 180);
    doc.text(`Generada el ${new Date().toLocaleDateString("es-PE")} · Sigue explorando y aprendiendo.`, 90, 109, { align: "center" });
    const safeName = String(profile.nombre || "explorador").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-|-$/g, "");
    doc.save(`TECH-ARENA-tarjeta-${safeName || "explorador"}.pdf`);
}

function downloadReport() {
    if (!profile) {
        return;
    }

    if (!window.jspdf) {
        alert("No se encontró el archivo jspdf.umd.min.js. Debe estar en la misma carpeta que index.html.");
        return;
    }

    const doc = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = 210;
    const margin = 18;
    const formatDate = iso => new Date(iso).toLocaleDateString("es-PE");
    let y = 0;

    // Cabecera
    doc.setFillColor(17, 16, 28);
    doc.rect(0, 0, pageWidth, 34, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("TECH ARENA", margin, 16);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(57, 231, 245);
    doc.text("Informe de progreso del estudiante", margin, 26);
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`Generado: ${new Date().toLocaleString("es-PE")}`, pageWidth - margin, 26, { align: "right" });
    y = 48;

    const sectionTitle = text => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(168, 85, 247);
        doc.text(text, margin, y);
        doc.setDrawColor(168, 85, 247);
        doc.line(margin, y + 2, pageWidth - margin, y + 2);
        doc.setTextColor(40, 40, 40);
        y += 11;
    };

    const dataRow = (label, value) => {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(label, margin, y);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(String(value), pageWidth - margin * 2 - 48);
        doc.text(lines, margin + 48, y);
        y += 7 * lines.length;
    };

    // Datos del estudiante
    sectionTitle("Datos del estudiante");
    dataRow("Nombre:", profile.nombre);
    dataRow("Escuela:", profile.escuela);
    dataRow("Grado:", profile.grado);
    y += 6;

    // Resumen
    const level = getPlayerLevel();
    const missions = ALL_MISSIONS;
    const completedCount = missions.filter(m => player.completedMissions.includes(m.id)).length;

    sectionTitle("Resumen del progreso");
    dataRow("Nivel:", `${level} (${getPlayerRank(level)})`);
    dataRow("Experiencia total:", `${player.xp} XP`);
    dataRow("Progreso de nivel:", player.xp >= CONFIG.maxXP
        ? `Arena completada; nivel máximo (${CONFIG.maxLevel} de ${CONFIG.maxLevel})`
        : getPlayerLevel() >= CONFIG.maxLevel
            ? `${player.xp % CONFIG.xpPerLevel} / ${CONFIG.xpPerLevel} XP para completar la arena`
            : `${player.xp % CONFIG.xpPerLevel} / ${CONFIG.xpPerLevel} XP para el siguiente nivel`);
    dataRow("Misiones completadas:", `${completedCount} de ${missions.length} disponibles`);
    y += 6;

    // Detalle de misiones
    sectionTitle("Detalle de misiones");
    const columns = [margin, 92, 124, 146, 162];

    doc.setFillColor(238, 232, 250);
    doc.rect(margin - 2, y - 5, pageWidth - margin * 2 + 4, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    ["Misión", "Estado", "Intentos", "XP", "Fecha"].forEach((text, i) => doc.text(text, columns[i], y));
    y += 8;

    doc.setFont("helvetica", "normal");
    missions.forEach(m => {
        if (y > 272) {
            doc.addPage();
            y = 20;
        }

        const r = player.log[m.id];
        const cells = [
            `${m.world.short} - ${m.title}`,
            r ? (r.completed ? "Completada" : "No superada") : "Pendiente",
            r ? String(r.attempts) : "-",
            r ? `+${r.xp}` : "-",
            r ? formatDate(r.date) : "-"
        ];
        cells.forEach((text, i) => doc.text(text, columns[i], y));
        y += 7;
    });

    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("Informe generado desde TECH ARENA, un proyecto educativo de Ingeniería de Sistemas.", margin, 285);

    const safeName = profile.nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "_");

    doc.save(`Informe_TechArena_${safeName}.pdf`);
}

elements.loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(elements.loginForm);
    const nombre = String(data.get("nombre") || "").trim();
    const escuela = String(data.get("escuela") || "").trim();
    const grado = String(data.get("grado") || "");

    if (nombre.length < 3 || escuela.length < 2 || !grado) {
        elements.loginError.textContent = "Completa tu nombre, tu escuela y tu grado.";
        elements.loginError.hidden = false;
        return;
    }

    elements.loginError.hidden = true;
    login(nombre, escuela, grado);
});

elements.downloadButton.addEventListener("click", downloadReport);
elements.downloadAchievementCardButton?.addEventListener("click", downloadAchievementCard);
elements.logoutButton.addEventListener("click", () => {
    if (confirm("¿Cerrar sesión? Tu progreso queda guardado en este equipo.")) {
        logout();
    }
});

// 16. INICIAR LA APLICACIÓN

(function init() {
    let savedId = null;

    try {
        savedId = localStorage.getItem(CONFIG.sessionKey);
    } catch (error) {
        console.warn("No se pudo leer la sesión.", error);
    }

    applySession();

    if (savedId && loadPlayer(savedId)) {
        applySession();
        goHome();
    } else {
        showScreen(elements.loginScreen);
    }
})();

console.log("TECH ARENA está listo para jugar.");
