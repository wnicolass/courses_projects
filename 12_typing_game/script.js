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

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function fetchWords() {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?number=100"
  );
  const data = await res.json();

  randomWord = data[rand(1, data.length)];
  word.innerHTML = randomWord;
}

fetchWords();

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out 🕛</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `;

  endgameEl.style.display = "flex";
}

const timeInterval = setInterval(updateTime, 1000);

function updateScore() {
  score++;
  scoreEl.innerHTML = `${score}`;
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    fetchWords();
    e.target.value = "";
    updateScore();
  }
});
