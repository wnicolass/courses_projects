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
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
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
