const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMe(joke) {
  VoiceRSS.speech({
    key: "d543dfa4a84a402b9140d695a4bca653",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  let joke = "";
  const apiURL =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    toggleButton();
    tellMe(joke);
  } catch (err) {
    console.log("whoops", err);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
