const msgEl = document.getElementById("msg");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function writeMessage(msg) {
  msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `;
}

function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again!</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  }
}

function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

recognition.start();

const randomNum = getRandomNumber(1, 100);

recognition.addEventListener("result", onSpeak);

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  e.target.id === "play-again" ? window.location.reload() : false;
});
