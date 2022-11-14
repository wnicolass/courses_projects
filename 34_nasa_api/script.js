const resultsNav = document.getElementById("results-nav");
const favoritesNav = document.getElementById("favorites-nav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

const count = 10;
const API_KEY = "DEMO_KEY";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`;

let resultsArr = [];
let favorites = {};

function createDOMNodes(page) {
  const currentArray =
    page === "results" ? resultsArr : Object.values(favorites);
  console.log(currentArray);
  currentArray.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";

    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture Of The Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;

    const fav = document.createElement("p");
    fav.classList.add("clickable");
    if (page === "results") {
      fav.textContent = "Add To Favorites";
      fav.setAttribute("onclick", `saveFavorite('${result.url}')`);
    } else {
      fav.textContent = "Remove Favorite";
      fav.setAttribute("onclick", `removeFavorite('${result.url}')`);
    }

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = result.explanation;

    const footer = document.createElement("small");
    footer.classList.add("text-muted");

    const date = document.createElement("strong");
    date.textContent = result.date;

    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;

    footer.append(date, copyright);
    cardBody.append(cardTitle, cardText, fav, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
    console.log("fav from ls", favorites);
  }

  imagesContainer.textContent = "";
  createDOMNodes(page);
}

async function getNasaPictures() {
  try {
    const res = await fetch(API_URL);
    resultsArr = await res.json();
    updateDOM("favorites");
  } catch (e) {
    console.log(e);
  }
}

function saveFavorite(itemUrl) {
  resultsArr.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;

      saveConfirmed.classList.remove("hidden");
      setTimeout(() => {
        saveConfirmed.classList.add("hidden");
      }, 2000);

      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
  }

  localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
  updateDOM("favorites");
}

getNasaPictures();
