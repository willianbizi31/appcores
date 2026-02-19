const mainColors = [
  {
    name: "vermelho",
    value: "#ef4444",
    objects: [
      { emoji: "🍅", label: "Tomate" },
      { emoji: "🍓", label: "Morango" },
      { emoji: "🚗", label: "Carro" },
    ],
  },
  {
    name: "azul",
    value: "#3b82f6",
    objects: [
      { emoji: "🫐", label: "Mirtilo" },
      { emoji: "🐟", label: "Peixe" },
      { emoji: "🧢", label: "Boné" },
    ],
  },
  {
    name: "amarelo",
    value: "#facc15",
    text: "#2a2a2a",
    objects: [
      { emoji: "🍌", label: "Banana" },
      { emoji: "🌽", label: "Milho" },
      { emoji: "⭐", label: "Estrela" },
    ],
  },
  {
    name: "verde",
    value: "#22c55e",
    objects: [
      { emoji: "🥦", label: "Brócolis" },
      { emoji: "🥝", label: "Kiwi" },
      { emoji: "🐢", label: "Tartaruga" },
    ],
  },
  {
    name: "laranja",
    value: "#fb923c",
    objects: [
      { emoji: "🍊", label: "Laranja" },
      { emoji: "🥕", label: "Cenoura" },
      { emoji: "🏀", label: "Bola" },
    ],
  },
  {
    name: "roxo",
    value: "#8b5cf6",
    objects: [
      { emoji: "🍇", label: "Uvas" },
      { emoji: "☂️", label: "Guarda-chuva" },
      { emoji: "🧃", label: "Suco de uva" },
    ],
  },
];

const allColors = [
  ...mainColors,
  {
    name: "rosa",
    value: "#f472b6",
    objects: [
      { emoji: "🌸", label: "Flor" },
      { emoji: "🦩", label: "Flamingo" },
      { emoji: "🍬", label: "Doce" },
    ],
  },
  {
    name: "marrom",
    value: "#92400e",
    objects: [
      { emoji: "🥥", label: "Coco" },
      { emoji: "🐻", label: "Urso" },
      { emoji: "🍫", label: "Chocolate" },
    ],
  },
  {
    name: "preto",
    value: "#111827",
    objects: [
      { emoji: "🫒", label: "Azeitona" },
      { emoji: "🐈", label: "Gato" },
      { emoji: "🎩", label: "Chapéu" },
    ],
  },
  {
    name: "branco",
    value: "#f8fafc",
    text: "#111827",
    objects: [
      { emoji: "🥛", label: "Leite" },
      { emoji: "☁️", label: "Nuvem" },
      { emoji: "⚽", label: "Bola" },
    ],
  },
  {
    name: "cinza",
    value: "#6b7280",
    objects: [
      { emoji: "🪨", label: "Pedra" },
      { emoji: "🐘", label: "Elefante" },
      { emoji: "🛴", label: "Patinete" },
    ],
  },
  {
    name: "turquesa",
    value: "#14b8a6",
    objects: [
      { emoji: "🧜", label: "Sereia" },
      { emoji: "🌊", label: "Mar" },
      { emoji: "🦋", label: "Borboleta" },
    ],
  },
];

const targetText = document.getElementById("target-text");
const feedback = document.getElementById("feedback");
const mainCards = document.getElementById("main-cards");
const allCards = document.getElementById("all-cards");
const newRoundBtn = document.getElementById("new-round");
const speakColorBtn = document.getElementById("speak-color");

let targetColor = null;

function pickRandomObject(color, previousIndex = -1) {
  const options = color.objects || [];
  if (options.length === 0) {
    return { item: { emoji: "🎨", label: `Objeto ${color.name}` }, index: -1 };
  }

  if (options.length === 1) {
    return { item: options[0], index: 0 };
  }

  let index = Math.floor(Math.random() * options.length);
  while (index === previousIndex) {
    index = Math.floor(Math.random() * options.length);
  }

  return { item: options[index], index };
}

function createCard(color, isMain) {
  const button = document.createElement("button");
  button.className = "color-card";
  button.type = "button";
  button.setAttribute("aria-label", `Cor ${color.name}`);

  let lastObjectIndex = -1;

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

  const backEmoji = document.createElement("span");
  backEmoji.className = "object-emoji";

  const backLabel = document.createElement("span");
  backLabel.className = "object-label";

  back.append(backEmoji, backLabel);
  inner.append(front, back);
  button.appendChild(inner);

  function updateCardObject() {
    const next = pickRandomObject(color, lastObjectIndex);
    lastObjectIndex = next.index;
    backEmoji.textContent = next.item.emoji;
    backLabel.textContent = next.item.label;
    return next.item;
  }

  updateCardObject();

  button.addEventListener("click", () => {
    const selectedObject = updateCardObject();
    button.classList.toggle("is-flipped");

    if (isMain) {
      checkAnswer(color, selectedObject);
      return;
    }

    feedback.className = "feedback";
    feedback.textContent = `Essa é a cor ${color.name}. ${selectedObject.label}.`;
    say(`Essa é a cor ${color.name}. ${selectedObject.label}`);
  });

  return button;
}

function pickTargetColor() {
  targetColor = mainColors[Math.floor(Math.random() * mainColors.length)];
  targetText.innerHTML = `Toque em: <span style="color:${targetColor.value}">${targetColor.name.toUpperCase()}</span>`;
  feedback.className = "feedback";
  feedback.textContent = "";
}

function checkAnswer(selectedColor, selectedObject) {
  if (!targetColor) {
    pickTargetColor();
    return;
  }

  const isCorrect = selectedColor.name === targetColor.name;
  feedback.className = `feedback ${isCorrect ? "ok" : "error"}`;

  if (isCorrect) {
    feedback.textContent = `🎉 Muito bem! Você acertou: ${selectedColor.name}. ${selectedObject.label}.`;
    say(`Muito bem! É a cor ${selectedColor.name}. Objeto: ${selectedObject.label}`);
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
