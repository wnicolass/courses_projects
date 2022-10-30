const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "nic-1",
    title: "Cowbell Warrior",
    artist: "SXMPRA",
  },
  {
    name: "nic-2",
    title: "Miss The Rage",
    artist: "Trippie Redd",
  },
  {
    name: "nic-3",
    title: "High Enough",
    artist: "K.Flay",
  },
  {
    name: "metric-1",
    title: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  music.src = `assets/music/${song.name}.mp3`;
  image.src = `assets/img/${song.name}.jpg`;
}

let currentSongIndex = 0;

function nextSong() {
  currentSongIndex++;

  if (currentSongIndex > songs.length - 1) {
    currentSongIndex = 0;
  }

  loadSong(songs[currentSongIndex]);
  playSong();
}

function prevSong() {
  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }

  loadSong(songs[currentSongIndex]);
  playSong();
}

loadSong(songs[currentSongIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

music.addEventListener("timeupdate", updateProgressBar);
