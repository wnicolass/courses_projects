const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const animes = [
  "Fullmetal Alchemist: Brotherhood",
  "Kaguya-sama wa Kokurasetai: Ultra Romantic",
  "Bleach: Sennen Kessen-hen",
  "Gintama°",
  "Steins;Gate",
  "Shingeki no Kyojin Season 3 Part 2",
  "Gintama'",
  "Gintama: The Final",
  "Gintama': Enchousen",
  "Hunter x Hunter (2011)",
];

const listItems = [];

let dragStartIndex;

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}
function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function checkOrder() {
  listItems.forEach((listItem, idx) => {
    const animeName = listItem.querySelector(".draggable").innerText.trim();

    if (animeName !== animes[idx]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function createList() {
  [...animes]
    .map((anime) => ({ value: anime, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((anime) => anime.value)
    .forEach((anime, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="anime-name">${anime}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);

      addEventListeners();
    });
}

createList();

check.addEventListener("click", checkOrder);
