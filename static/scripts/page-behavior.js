// Fill sideBar
const addSidebarSong = (songData, id) => {
  // Create new div item
  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.classList.add("to-delete");
  const songName = document.createElement("a");
  songName.innerHTML = songData.title + " - " + songData.author;
  songName.setAttribute("id", id);
  songName.classList.add("song-elements");
  navItem.appendChild(songName);
  playlistContainerElement.appendChild(navItem);
  songElements.push(songName);

  songName.addEventListener("click", () => {
    changeSong(songName.id);
    listIndex = parseInt(songName.id);

    for (let i = 0; i < songElements.length; i++) {
      songElements[i].classList.remove("active");
    }
    songName.classList.add("active");
    playPause.src = "static/img/mediaPlayer/pause.svg";
  });
};

// empty sidebar
const removeSideBarSongs = () => {
  const sideSongs = document.querySelectorAll(".to-delete");
  if (sideSongs) {
    for (let i = 0; i < sideSongs.length; i++) {
      sideSongs[i].remove();
    }
  }
};

// Open Navbar
const openNavbar = () => {
  overlay.classList.toggle("active");
  navMenu.classList.toggle("active");
  navMenu.nextElementSibling.classList.toggle("active");
};
