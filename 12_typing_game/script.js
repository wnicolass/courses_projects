const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

let score = 0;
let time = 10;
let randomWord;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

difficultySelect.value = difficulty;
let startTimer = false;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function fetchWords() {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?length=${rand(3, 8)}`
  );
  const data = await res.json();

  randomWord = String(data);
  word.innerHTML = randomWord;
}

fetchWords();

function gameOver() {
  endgameEl.innerHTML = `
          <h1>Time ran out 🕛</h1>
          <p>Your final score is ${score}</p>
          <button onclick="location.reload()">Play Again</button>
      `;

  endgameEl.style.display = "flex";
}

function updateTime() {
  if (!startTimer) return;
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

const timeInterval = setInterval(updateTime, 1000);

function updateScore() {
  score++;
  scoreEl.innerHTML = `${score}`;
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText.length === 1 && !startTimer) startTimer = true;

  if (insertedText === randomWord) {
    updateScore();
    fetchWords();

    e.target.value = "";

    if (difficulty === "medium") {
      time += 3;
    } else if (difficulty === "hard") {
      time += 2;
    } else {
      time += 5;
    }

    updateTime();
  }
});

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
});
