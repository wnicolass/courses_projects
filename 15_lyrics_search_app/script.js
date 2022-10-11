//this project is on stand-by!!! the api isn't working due server issues.

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const API_URL = "https://api.lyrics.ovh";

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

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

  if (songs.prev || songs.next) {
    more.innerHTML = `
        ${
          songs.prev
            ? `<button class="btn" onclick="getMoreSongs('${songs.prev}')">Prev</button>`
            : ""
        }
        ${
          songs.next
            ? `<button class="btn" onclick="getMoreSongs('${songs.next}')">Next</button>`
            : ""
        }
    `;
  } else {
    more.innerHTML = "";
  }
}

// async function getLyrics(artist, songTitle) {
//   const res = await fetch(`${API_URL}/v1/${artist}/${songTitle}`);
//   const data = await res.json();

//   console.log(data);
// }

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
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    console.log(artist, songTitle);
    getLyrics(artist, songTitle);
  }
});
