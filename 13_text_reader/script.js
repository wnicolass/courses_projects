const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./assets/images/drink.jpg",
    text: "I'm thirsty",
  },
  {
    image: "./assets/images/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./assets/images/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./assets/images/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./assets/images/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./assets/images/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./assets/images/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./assets/images/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./assets/images/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./assets/images/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./assets/images/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./assets/images/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

  main.appendChild(box);
}

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerHTML = `${voice.name} - ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

speechSynthesis.addEventListener("voiceschanged", getVoices);

data.forEach(createBox);

toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

getVoices();
