const count = 10;
const API_KEY = "DEMO_KEY";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`;

let resultsArr = [];

async function getNasaPictures() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

getNasaPictures();
