//this project is on stand-by!!! the api isn't working due server issues.

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const API_URL = "https://api.lyrics.ovh";

function showData(songs) {
  result.innerHTML = `
    <ul class="songs">
        ${songs.data
          .map(
            (song) => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-id="${song.id}" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
          )
          .join("")}
    </ul>
  `;

  more.innerHTML = "";
}

async function getSongInfo(term, target) {
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json();

  const resultsArr = [...data.data];
  const songId = target.getAttribute("data-id");

  let wantedInfo = resultsArr.find((result) => result.id === Number(songId));

  result.innerHTML = `
    <h2>${wantedInfo.title} - ${wantedInfo.artist.name}</h2>
    <img class="picture" src="${wantedInfo.artist.picture_medium}" alt="${wantedInfo.artist.name}" />
    <p>Hear this song by clicking <a href="${wantedInfo.link}" target="_blank">HERE</a></p>
    <br>
    <div>
      <h3>Album: ${wantedInfo.album.title}</h3>
      <img src="${wantedInfo.album.cover_medium}">
    </div>
  `;

  more.innerHTML = `<button class="btn" onclick="searchSongs('${term}')">Back to results</button>`;

  console.log(wantedInfo);
}

async function searchSongs(term) {
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    //@todo - notification
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const term = search.value.trim();
    const target = e.target;

    getSongInfo(term, target);
  }
});
