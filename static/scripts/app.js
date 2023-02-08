var dropdown = document.getElementsByClassName("dropdown-icon");
var auto_dropdown = document.getElementsByClassName("open");
const navMenu = document.querySelector("#navMenu");
const overlay = document.getElementById("overlay");
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdownBtnChild = document.querySelector(".language-child");

const playlistContainerElement = document.querySelector(".songs-container"),
  audio = document.querySelector("audio"),
  songLength = document.getElementById("SongLength"),
  divisor = document.querySelector(".divisor"),
  volIcon = document.getElementById("vol"),
  volume = document.getElementById("volume-slider"),
  songs = document.querySelectorAll(".get-music"),
  playlistObjets = document.querySelectorAll(".playlist-object"),
  playingSongImg = document.querySelector(".playing-song-img"),
  songTitle = document.querySelector(".song-title"),
  songTitleAuthor = document.querySelector(".song-title-author"),
  songAuthor = document.querySelector(".song-author"),
  addSong = document.querySelectorAll(".add-song"),
  previousButtom = document.querySelector(".previous"),
  nextButtom = document.querySelector(".next"),
  currentTime = document.getElementById("CurrentSongTime"),
  seeCount = document.querySelectorAll(".see-count"),
  seeMoreLink = document.querySelector(".see-more-link");

let onPlayList = [],
  songElements = [],
  listIndex = 0;

// Max displayed songs
if (seeCount.length === 7) {
  seeMoreLink.classList.remove("hidden");
}

// remove src
audio.removeAttribute("src");

// Save Volumen
const localVolume = localStorage.getItem("volumen");
if (localVolume) {
  if (localVolume / 100 === 0) {
    volIcon.src = "static/img/mediaPlayer/muted.svg";
  } else if (localVolume / 100 < 0.5) {
    volIcon.src = "static/img/mediaPlayer/volume-down.svg";
  } else {
    volIcon.src = "static/img/mediaPlayer/volume.svg";
  }
  audio.volume = (localVolume / 100).toString();
  volume.value = localVolume;
}
