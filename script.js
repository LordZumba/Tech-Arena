
/* =========================================
   TECH ARENA - LÓGICA DEL JUEGO
   ========================================= */

"use strict";

// 1. CONFIGURACIÓN DEL JUEGO

const CONFIG = {
    xpPerMission: 100,
    xpPerLevel: 500,
    maxAttempts: 3,
    storageKey: "techArenaProgress"
};

// 2. DATOS DE LA MISIÓN

const mission = {
    id: "hardware-001",
    correctAnswer: "a",
    title: "LA PC NO ARRANCA",
    reward: CONFIG.xpPerMission,

    feedback: {
        a: {
            correct: true,
            title: "¡Buen diagnóstico, técnico!",
            message:
                "Comprobar el monitor, los cables y la RAM es un buen comienzo. " +
                "Una RAM mal instalada puede impedir que la computadora muestre imagen. " +
                "Recuerda que existen otras causas posibles: un diagnóstico profesional " +
                "debe comprobar cada una antes de cambiar componentes."
        },

        b: {
            correct: false,
            title: "¡No compres componentes todavía!",
            message:
                "Una tarjeta gráfica defectuosa puede causar problemas de imagen, " +
                "pero no es la única explicación. Primero revisa las conexiones, " +
                "el monitor y los componentes básicos."
        },

        c: {
            correct: false,
            title: "Ese no es el primer paso.",
            message:
                "Formatear un disco no suele solucionar una computadora que no muestra " +
                "imagen antes de iniciar el sistema operativo. Además, podrías perder " +
                "información. Primero hay que diagnosticar el hardware."
        }
    }
};

// 3. REFERENCIAS A LOS ELEMENTOS HTML

const elements = {
    screens: document.querySelectorAll(".screen"),

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

// 4. ESTADO DEL JUGADOR

function loadProgress() {
    const defaultProgress = {
        xp: 0,
        completedMissions: []
    };

    try {
        const savedData = localStorage.getItem(CONFIG.storageKey);

        if (!savedData) {
            return defaultProgress;
        }

        const parsedData = JSON.parse(savedData);

        if (
            !parsedData ||
            !Number.isFinite(parsedData.xp) ||
            parsedData.xp < 0 ||
            !Array.isArray(parsedData.completedMissions)
        ) {
            return defaultProgress;
        }

        return {
            xp: parsedData.xp,
            completedMissions: parsedData.completedMissions.filter(
                id => typeof id === "string"
            )
        };
    } catch (error) {
        console.warn("No se pudo cargar el progreso guardado.", error);
        return defaultProgress;
    }
}

const player = loadProgress();

let selectedAnswer = null;
let attemptsRemaining = CONFIG.maxAttempts;
let answerLocked = false;
let missionFinished = false;
let earnedXPThisRun = 0;

// 5. GUARDAR PROGRESO

function saveProgress() {
    try {
        localStorage.setItem(
            CONFIG.storageKey,
            JSON.stringify({
                xp: player.xp,
                completedMissions: player.completedMissions
            })
        );
    } catch (error) {
        console.warn("No se pudo guardar el progreso.", error);
    }
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

function startMission() {
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

        showFeedback(
            false,
            "FIN DE LOS INTENTOS",
            result.message +
            " La respuesta recomendada era la A. " +
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
            "Has demostrado que sabes diagnosticar antes de reemplazar.";

        elements.resultBadgeTitle.textContent = "DIAGNÓSTICO INICIAL";
        elements.resultBadgeDescription.textContent =
            "Tu aventura tecnológica ha comenzado.";
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

elements.playButton.addEventListener("click", startMission);

elements.brandHome.addEventListener("click", event => {
    event.preventDefault();
    goHome();
});

elements.backButton.addEventListener("click", goHome);

elements.resultHomeButton.addEventListener("click", goHome);

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
        if (button.dataset.world === "hardware") {
            startMission();
        }
    });
});

// 15. INICIAR LA APLICACIÓN

updateDashboard();

console.log("TECH ARENA está listo para jugar.");
