const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const animes = [
  "Bleach: Sennen Kessen-hen",
  "Steins;Gate",
  "Hunter x Hunter (2011)",
  "Gintama: The Final",
  "Gintama': Enchousen",
  "Shingeki no Kyojin Season 3 Part 2",
  "Gintama'",
  "Gintama°",
  "Fullmetal Alchemist: Brotherhood",
  "Kaguya-sama wa Kokurasetai: Ultra Romantic",
];

const listItems = [];

let dragStartIndex;

function createList() {
  [...animes].forEach((anime, index) => {
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
  });
}

createList();
