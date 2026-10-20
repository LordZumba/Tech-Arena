/* =========================================
   TECH ARENA - LÓGICA DEL JUEGO
   ========================================= */

"use strict";

// 1. CONFIGURACIÓN DEL JUEGO

const CONFIG = {
    xpPerMission: 100,
    xpPerLevel: 500,
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
                    ["Comprar una tarjeta gráfica nueva inmediatamente.", "¡No compres componentes todavía!",
                        "Una tarjeta gráfica defectuosa puede causar problemas de imagen, pero no es la única explicación. Primero revisa las conexiones, el monitor y los componentes básicos."],
                    ["Formatear el disco duro para reparar la imagen.", "Ese no es el primer paso.",
                        "Formatear un disco no suele solucionar una computadora que no muestra imagen antes de iniciar el sistema operativo. Además, podrías perder información. Primero hay que diagnosticar el hardware."]
                ], ["Diagnóstico técnico", "Identifica posibles causas antes de decidir una solución."],
                "No reemplaces un componente sin comprobar primero las causas más sencillas.", "DIAGNÓSTICO INICIAL"),
            mk("hardware-002", "LA PC VA MUY LENTA", "Busca la causa antes de gastar dinero.",
                "Mi computadora antes abría los programas en segundos y ahora tarda minutos. Tiene muchos programas instalados y casi no queda espacio en el disco.",
                "¿Qué harías primero?", "b", [
                    ["Comprar otra computadora de inmediato.", "Demasiado pronto.", "Antes de gastar, revisa si el equipo puede mejorar: muchas lentitudes tienen una solución sencilla."],
                    ["Liberar espacio, cerrar programas innecesarios y revisar qué se inicia con el sistema.", "¡Excelente diagnóstico!", "Un disco casi lleno y demasiados programas en segundo plano son causas muy comunes de lentitud, y revisarlos no cuesta nada."],
                    ["Desconectar el teclado para que el equipo trabaje menos.", "Eso no ayuda.", "El teclado casi no consume recursos. La lentitud suele venir del disco, la memoria o los programas abiertos."]
                ], ["Rendimiento", "Reconoce las causas comunes de una computadora lenta."],
                "Disco lleno y programas de inicio: dos sospechosos habituales.", "OPTIMIZADOR"),
            mk("hardware-003", "SE APAGA SOLA", "El calor también rompe computadoras.",
                "Mi laptop se apaga sola cuando veo videos o juego, y el ventilador suena muy fuerte. Casi siempre la uso sobre mi cama.",
                "¿Cuál es la causa más probable y qué harías?", "c", [
                    ["Es un virus en el monitor; cambiaría la pantalla.", "Esa no es la causa.", "Un monitor no hace que el equipo se apague. El ventilador fuerte y el apagado apuntan a exceso de calor."],
                    ["Taparía las rejillas para que no entre polvo.", "Eso empeoraría el problema.", "Las rejillas dejan salir el aire caliente. Taparlas aumenta la temperatura."],
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
                    ["Hago clic de inmediato para no perder mi cuenta.", "¡Cuidado, es una trampa!", "Los estafadores usan la urgencia para que actúes sin pensar. Ese clic podría llevarte a una página falsa."],
                    ["Reenvío el correo a mis amigos para advertirles.", "Eso lo propaga.", "Reenviarlo puede hacer que más personas caigan. Es mejor reportarlo y eliminarlo."],
                    ["No hago clic, no respondo y consulto al banco por sus canales oficiales.", "¡Excelente reflejo!", "Los bancos no piden claves por correo. Verificar por un canal oficial es la forma segura de salir de dudas."]
                ], ["Anti-phishing", "Reconoce las señales de un correo fraudulento."],
                "Revisa siempre la dirección del remitente, no solo el nombre.", "CAZAPHISHING"),
            mk("cyber-002", "CONTRASEÑA DÉBIL", "Una clave fácil es una puerta abierta.",
                "Un amigo usa '12345' como contraseña en todas sus cuentas para no olvidarla. Te pide consejo.",
                "¿Qué le recomiendas?", "a", [
                    ["Una contraseña larga y distinta para cada cuenta, y activar la verificación en dos pasos.", "¡Gran consejo!", "Si una cuenta se filtra, las demás siguen a salvo. La verificación en dos pasos agrega otra barrera."],
                    ["Usar su fecha de nacimiento, que es fácil de recordar.", "Demasiado fácil de adivinar.", "Las fechas personales son de lo primero que prueban los atacantes."],
                    ["Dejarla igual: a nadie le interesan sus cuentas.", "Todas las cuentas importan.", "Los ataques suelen ser automáticos y prueban claves comunes como '12345' en miles de cuentas."]
                ], ["Contraseñas", "Aprende a crear y proteger tus claves."],
                "Una frase larga es más fuerte que una palabra corta con números.", "GUARDIÁN DE CLAVES"),
            mk("cyber-003", "WI-FI PÚBLICO", "No todas las redes son de confianza.",
                "Estás en un café con Wi-Fi gratis y necesitas revisar tu cuenta bancaria.",
                "¿Qué es lo más seguro?", "b", [
                    ["Conectarme y entrar normalmente: el Wi-Fi gratis es igual de seguro.", "No es tan seguro.", "En una red abierta otras personas podrían espiar lo que haces."],
                    ["Usar mis datos móviles o esperar a una red de confianza.", "¡Buena decisión!", "Para operaciones sensibles conviene una red propia o de confianza, no una abierta."],
                    ["Entrar al banco desde cualquier red abierta porque la página tiene candado.", "El candado no basta.", "El candado protege la conexión con la página, pero una red abierta o falsa sigue siendo un riesgo."]
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
                    ["Escribir una frase más larga y confusa.", "Más largo no es mejor.", "Las frases vagas devuelven resultados vagos. Elige palabras clave concretas."],
                    ["Copiar el primer resultado que aparezca.", "Revísalo antes.", "El primer resultado no siempre es el más confiable. Contrasta con otras fuentes."]
                ], ["Investigación", "Convierte una duda en una búsqueda precisa."],
                "Piensa en las 3 o 4 palabras que más importan de tu pregunta.", "INVESTIGADOR"),
            mk("creator-002", "ARCHIVOS EN CAOS", "Un buen orden ahorra horas.",
                "Tu escritorio tiene 80 archivos llamados 'documento1', 'imagen(3)' y 'final final'. No encuentras tu tarea.",
                "¿Qué haces?", "c", [
                    ["Mover todo a la papelera para empezar de cero.", "¡Perderías tu trabajo!", "Borrar sin revisar puede eliminar archivos importantes."],
                    ["Dejar todo en el escritorio y usar siempre el buscador.", "No resuelve el desorden.", "El buscador ayuda, pero con nombres como esos seguirás perdido."],
                    ["Crear carpetas por tema y nombrar los archivos con una descripción y la fecha.", "¡Orden perfecto!", "Nombres claros y carpetas por tema hacen que todo se encuentre rápido."]
                ], ["Organización", "Aplica buenas prácticas con archivos y carpetas."],
                "Un nombre como 'Matematica_Tarea3_2026' dice mucho más que 'documento1'.", "ARCHIVISTA"),
            mk("creator-003", "LÓGICA PASO A PASO", "Los programas siguen un orden.",
                "Quieres que un robot prepare jugo de naranja. Sus pasos: exprimir, servir, comprar naranjas y lavarlas.",
                "¿Cuál es el orden lógico correcto?", "b", [
                    ["Servir, exprimir, lavar, comprar.", "Ese orden no funciona.", "No se puede servir jugo que aún no existe."],
                    ["Comprar, lavar, exprimir, servir.", "¡Lógica impecable!", "Cada paso necesita el resultado del anterior. Pensar así es la base de los algoritmos."],
                    ["Lavar, servir, comprar, exprimir.", "Falta lógica.", "Primero necesitas tener las naranjas para poder lavarlas."]
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
                    ["Confío en la IA, porque nunca se equivoca.", "Las IA sí se equivocan.", "Pueden inventar datos con mucha seguridad. Siempre hay que verificar."],
                    ["Contrasto con fuentes confiables antes de decidir.", "¡Muy buen criterio!", "Verificar con libros y sitios confiables es la mejor forma de usar la IA."],
                    ["Cambio lo que dice mi libro por lo que dijo la IA.", "No lo hagas.", "Un libro revisado suele ser más confiable que una respuesta sin fuentes."]
                ], ["Verificación", "Comprueba la información antes de creerla."],
                "Pídele a la IA sus fuentes y compruébalas tú mismo.", "VERIFICADOR"),
            mk("ai-002", "INSTRUCCIÓN CLARA", "Una buena pregunta da una buena respuesta.",
                "Le pides a una IA: 'hazme una tarea'. La respuesta es vaga y no te sirve.",
                "¿Cómo mejoras tu instrucción?", "c", [
                    ["La repito más fuerte: 'HAZME UNA TAREA'.", "Gritar no ayuda.", "La IA necesita más información, no más mayúsculas."],
                    ["Escribo una sola palabra.", "Aún menos claro.", "Con menos información, la respuesta será todavía más general."],
                    ["Explico el tema, mi nivel, la extensión y el formato que necesito.", "¡Instrucción de experto!", "Dar contexto y detalles hace que la IA responda con precisión."]
                ], ["Prompts", "Redacta instrucciones claras y completas."],
                "Dile a la IA quién eres, qué necesitas y cómo lo quieres.", "PROMPT MASTER"),
            mk("ai-003", "DATOS PRIVADOS", "Lo que compartes puede no ser privado.",
                "Para que una IA te ayude con un trámite, quieres pegarle tu DNI, tu dirección y tus contraseñas.",
                "¿Qué es lo más seguro?", "a", [
                    ["No compartir datos personales ni contraseñas con una IA.", "¡Decisión inteligente!", "Tu información privada no debe escribirse en chats. Puedes pedir ayuda usando datos de ejemplo."],
                    ["Compartirlos: solo es un programa.", "Cuidado con tu privacidad.", "No sabes cómo se guardará lo que escribes ni quién podría acceder a ello."],
                    ["Compartirlos y luego borrar el chat.", "Borrar no basta.", "Aunque borres el chat, la información pudo haberse almacenado."]
                ], ["Privacidad", "Protege tus datos al usar inteligencia artificial."],
                "Usa nombres y datos inventados cuando pidas ayuda con trámites.", "DATOS A SALVO")
        ]
    }
];

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
    attemptCount: document.getElementById("attempt-count"),

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
        player = {
            xp: saved.xp,
            completedMissions: saved.completedMissions.filter(
                missionId => typeof missionId === "string"
            ),
            log: saved.log && typeof saved.log === "object" ? saved.log : {}
        };
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
    return Math.floor(player.xp / CONFIG.xpPerLevel) + 1;
}

function getPlayerRank(level) {
    if (level >= 5) {
        return "MAESTRO DIGITAL";
    }

    if (level >= 3) {
        return "EXPERTO TECH";
    }

    if (level >= 2) {
        return "TÉCNICO DIGITAL";
    }

    return "NOVATO DIGITAL";
}

function updateDashboard() {
    const level = getPlayerLevel();
    const xpInsideLevel = player.xp % CONFIG.xpPerLevel;

    const percentage = Math.round(
        (xpInsideLevel / CONFIG.xpPerLevel) * 100
    );

    elements.playerLevel.textContent = String(level).padStart(2, "0");
    elements.playerXP.textContent = `${player.xp} XP`;

    elements.playerRank.textContent = getPlayerRank(level);

    elements.xpProgressLabel.textContent =
        `${xpInsideLevel} / ${CONFIG.xpPerLevel} XP para el siguiente nivel`;

    elements.xpProgressPercent.textContent = `${percentage}%`;
    elements.xpProgressBar.style.width = `${percentage}%`;

    elements.missionsCompleted.textContent =
        String(player.completedMissions.length).padStart(2, "0");
}

// 8. INICIAR O REINICIAR LA MISIÓN

function isUnlocked(target) {
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
    elements.missionArt.hidden = mission.id !== "hardware-001";
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
            player.xp += mission.reward;
            player.completedMissions.push(mission.id);

            earnedXPThisRun = mission.reward;

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

elements.playButton.addEventListener("click", () => {
    const pending = ALL_MISSIONS.find(item => !player.completedMissions.includes(item.id));
    openWorld((pending || ALL_MISSIONS[0]).world.id);
});

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

// Las tarjetas de mundos usan el mismo punto de entrada.
// Por ahora, solo Hardware Lab está habilitado.

document.querySelectorAll(".world-button").forEach(button => {
    button.addEventListener("click", () => {
        openWorld(button.dataset.world);
    });
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
    dataRow("Hacia el siguiente nivel:", `${player.xp % CONFIG.xpPerLevel} / ${CONFIG.xpPerLevel} XP`);
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
