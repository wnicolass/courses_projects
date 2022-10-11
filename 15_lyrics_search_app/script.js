const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const API_URL = "https://api.lyrics.ovh";

function showData(data) {}

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
