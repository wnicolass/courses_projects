const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");
const labels = document.querySelectorAll(".modal-form label");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

open.addEventListener("click", () => modal.classList.add("show-modal"));
close.addEventListener("click", () => modal.classList.remove("show-modal"));

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((letter) => `<span>${letter}</span>`)
    .join("");
});
