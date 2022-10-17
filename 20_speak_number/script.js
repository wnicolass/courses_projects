const msgEl = document.getElementById("msg");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

function writeMessage(msg) {
  msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `;
}

function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

recognition.start();

const randomNum = getRandomNumber(1, 100);

recognition.addEventListener("result", onSpeak);
