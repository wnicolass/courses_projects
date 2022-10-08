const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

let score;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function fetchWords() {
  const res = await fetch("https://random-word-api.herokuapp.com/all");
  const data = await res.json();

  return data[rand(1, 178187)];
}

fetchWords();
