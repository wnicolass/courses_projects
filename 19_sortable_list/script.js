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
    });
}

createList();
