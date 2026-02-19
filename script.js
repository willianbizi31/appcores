const mainColors = [
  { name: "vermelho", value: "#ef4444", object: "🍅 Tomate" },
  { name: "azul", value: "#3b82f6", object: "🫐 Mirtilo" },
  { name: "amarelo", value: "#facc15", text: "#2a2a2a", object: "🍌 Banana" },
  { name: "verde", value: "#22c55e", object: "🥦 Brócolis" },
  { name: "laranja", value: "#fb923c", object: "🍊 Laranja" },
  { name: "roxo", value: "#8b5cf6", object: "🍇 Uvas" },
];

const allColors = [
  ...mainColors,
  { name: "rosa", value: "#f472b6", object: "🌸 Flor" },
  { name: "marrom", value: "#92400e", object: "🥥 Coco" },
  { name: "preto", value: "#111827", object: "🫒 Azeitona" },
  { name: "branco", value: "#f8fafc", text: "#111827", object: "🥛 Leite" },
  { name: "cinza", value: "#6b7280", object: "🪨 Pedra" },
  { name: "turquesa", value: "#14b8a6", object: "🧜 Sereia" },
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
  button.setAttribute("aria-label", `Cor ${color.name}`);

  const inner = document.createElement("span");
  inner.className = "color-card-inner";

  const front = document.createElement("span");
  front.className = "card-face card-front";
  front.style.backgroundColor = color.value;
  front.style.color = color.text || "#fff";
  front.textContent = color.name;

  const back = document.createElement("span");
  back.className = "card-face card-back";
  back.style.backgroundColor = color.value;
  back.style.color = color.text || "#fff";
  back.textContent = color.object || `Objeto da cor ${color.name}`;

  inner.append(front, back);
  button.appendChild(inner);

  button.addEventListener("click", () => {
    button.classList.toggle("is-flipped");

    if (isMain) {
      checkAnswer(color);
      return;
    }

    feedback.className = "feedback";
    feedback.textContent = `Essa é a cor ${color.name}. ${color.object}`;
    say(`Essa é a cor ${color.name}. ${color.object}`);
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
    feedback.textContent = `🎉 Muito bem! Você acertou: ${selectedColor.name}. ${selectedColor.object}`;
    say(`Muito bem! É a cor ${selectedColor.name}. ${selectedColor.object}`);
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
