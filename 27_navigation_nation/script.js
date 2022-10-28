const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navItems = document.querySelectorAll(".item");

function navAnimation(firstDirection, secondDirection) {
  navItems.forEach((item, idx) =>
    item.classList.replace(
      `slide-${firstDirection}-${idx + 1}`,
      `slide-${secondDirection}-${idx + 1}`
    )
  );
}

function toggleNav() {
  menuBars.classList.toggle("change");

  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    navAnimation("out", "in");
  } else {
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    navAnimation("in", "out");
  }
}

menuBars.addEventListener("click", toggleNav);
navItems.forEach((item) => item.addEventListener("click", toggleNav));
