const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

function darkMode() {
  nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.lastElementChild.classList.remove("fa-sun");
  toggleIcon.lastElementChild.classList.add("fa-moon");
  image1.src = "assets/images/undraw_proud_coder_dark.svg";
  image2.src = "assets/images/undraw_feeling_proud_dark.svg";
  image3.src = "assets/images/undraw_conceptual_idea_dark.svg";
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    lightMode();
  }
}

toggleSwitch.addEventListener("change", switchTheme);
