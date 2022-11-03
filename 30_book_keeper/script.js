const modal = document.getElementById("modal");
const showModalBtn = document.getElementById("show-modal");
const closeModalBtn = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteURLEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

showModalBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});
