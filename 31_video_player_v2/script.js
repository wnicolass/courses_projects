const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

function displayTime(time) {
  let min =
    Math.floor(time / 60) < 10
      ? `0${Math.floor(time / 60)}`
      : Math.floor(time % 60);
  let sec =
    Math.floor(time % 60) < 10
      ? `0${Math.floor(time % 60)}`
      : Math.floor(time % 60);

  return `${min}:${sec}`;
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

let lastVolume = 1;

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;

  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }

  lastVolume = volume;
}

function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add(
      "fas",
      video.volume > 0.7 ? "fa-volume-up" : "fa-volume-down"
    );
    volumeIcon.setAttribute("title", "Mute");
  }
}

function changeSpeed() {
  video.playbackRate = +speed.value;
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }

  video.classList.add("video-fullscreen");
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }

  video.classList.remove("video-fullscreen");
}

let isFullscreen = false;

function toggleFullscreen() {
  if (!isFullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }

  isFullscreen = !isFullscreen;
}

video.addEventListener("ended", showPlayIcon);
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);
