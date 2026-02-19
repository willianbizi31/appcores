const mainColors = [
  { name: "vermelho", value: "#ef4444" },
  { name: "azul", value: "#3b82f6" },
  { name: "amarelo", value: "#facc15", text: "#2a2a2a" },
  { name: "verde", value: "#22c55e" },
  { name: "laranja", value: "#fb923c" },
  { name: "roxo", value: "#8b5cf6" },
];

const allColors = [
  ...mainColors,
  { name: "rosa", value: "#f472b6" },
  { name: "marrom", value: "#92400e" },
  { name: "preto", value: "#111827" },
  { name: "branco", value: "#f8fafc", text: "#111827" },
  { name: "cinza", value: "#6b7280" },
  { name: "turquesa", value: "#14b8a6" },
];

const targetText = document.getElementById("target-text");
const feedback = document.getElementById("feedback");
const mainCards = document.getElementById("main-cards");
const allCards = document.getElementById("all-cards");
const newRoundBtn = document.getElementById("new-round");
const speakColorBtn = document.getElementById("speak-color");

let targetColor = null;

function createCard(color, isMain) {
  const button = document.createElement("button");
  button.className = "color-card";
  button.type = "button";
  button.style.backgroundColor = color.value;
  button.style.color = color.text || "#fff";
  button.textContent = color.name;
  button.setAttribute("aria-label", `Cor ${color.name}`);

  button.addEventListener("click", () => {
    if (isMain) {
      checkAnswer(color);
      return;
    }

    feedback.className = "feedback";
    feedback.textContent = `Essa é a cor ${color.name}.`;
    say(`Essa é a cor ${color.name}`);
  });

  return button;
}

function pickTargetColor() {
  targetColor = mainColors[Math.floor(Math.random() * mainColors.length)];
  targetText.innerHTML = `Toque em: <span style="color:${targetColor.value}">${targetColor.name.toUpperCase()}</span>`;
  feedback.className = "feedback";
  feedback.textContent = "";
}

function checkAnswer(selectedColor) {
  if (!targetColor) {
    pickTargetColor();
    return;
  }

  const isCorrect = selectedColor.name === targetColor.name;
  feedback.className = `feedback ${isCorrect ? "ok" : "error"}`;

  if (isCorrect) {
    feedback.textContent = `🎉 Muito bem! Você acertou: ${selectedColor.name}.`;
    say(`Muito bem! É a cor ${selectedColor.name}`);
    setTimeout(pickTargetColor, 1200);
    return;
  }

  feedback.textContent = `💛 Quase! Vamos tentar de novo. A cor é ${targetColor.name}.`;
  say(`Vamos tentar de novo. Procure a cor ${targetColor.name}`);
}

function say(text) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "pt-BR";
  msg.rate = 0.9;
  window.speechSynthesis.speak(msg);
}

function init() {
  mainColors.forEach((color) => mainCards.appendChild(createCard(color, true)));
  allColors.forEach((color) => allCards.appendChild(createCard(color, false)));

  newRoundBtn.addEventListener("click", pickTargetColor);
  speakColorBtn.addEventListener("click", () => {
    if (targetColor) {
      say(`Toque na cor ${targetColor.name}`);
    }
  });

  pickTargetColor();
}

init();
