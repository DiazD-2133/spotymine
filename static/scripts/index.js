const sideBar = document.querySelector(".sidenav"),
  audio = document.querySelector("audio"),
  songLength = document.getElementById("SongLength"),
  volIcon = document.getElementById("vol"),
  volume = document.getElementById("volume-slider"),
  songs = document.querySelectorAll(".get-music"),
  playlistObjets = document.querySelectorAll(".playlist-object"),
  songTitle = document.querySelector(".song-title"),
  songTitleAuthor = document.querySelector(".song-title-author"),
  songAuthor = document.querySelector(".song-author"),
  addSong = document.querySelectorAll(".add-song"),
  previousButtom = document.querySelector(".previous"),
  nextButtom = document.querySelector(".next"),
  currentTime = document.getElementById("CurrentSongTime"),
  seeMoreLink = document.querySelector(".see-more-link");
let onPlayList = [],
  songElements = [],
  listIndex = 0;

audio.removeAttribute("src");

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60),
    seconds = Math.floor(secs % 60),
    returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

const displayDuration = () => {
  songLength.innerHTML = calculateTime(audio.duration);
};

if (audio.readyState > 0) {
  displayDuration();
  currentTime.innerHTML = calculateTime(audio.currentTime);
} else {
  audio.addEventListener("loadedmetadata", () => {
    displayDuration();
  });
}

audio.ontimeupdate = function () {
  currentTime.innerHTML = calculateTime(audio.currentTime);
  setProgress();
};

function setProgress() {
  let percentage = (audio.currentTime / audio.duration) * 100;
  document.querySelector(".progress").style.width = percentage + "%";
}

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
  sideBar.appendChild(navItem);
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

// Playlist interactions
// Create a new playlist with songs object
const newPlayList = (songData) => {
  onPlayList = [];
  onPlayList.push(songData);
  songElements = [];
  addSidebarSong(songData, 0);
  songElements[0].classList.add("active");

  return onPlayList;
};

const addPlayListItem = (songData) => {
  onPlayList.push(songData);
  console.log(onPlayList);

  addSidebarSong(songData, onPlayList.length - 1);
};

const changeSong = (listIndex) => {
  if (listIndex < onPlayList.length) {
    playPause.src = "static/img/mediaPlayer/pause.svg";
    songTitle.innerHTML = onPlayList[listIndex].title;
    songAuthor.innerHTML = onPlayList[listIndex].author;
    songTitleAuthor.innerHTML =
      onPlayList[listIndex].title + " - " + onPlayList[listIndex].author;
    songElements[listIndex].classList.add("active");

    audio.src = onPlayList[listIndex].file;
    audio.play();
  }
};

// Audio Controls
const playPause = document.getElementById("PlayPause"),
  plus10 = document.getElementById("Plus10"),
  back10 = document.getElementById("Back10");

playPause.addEventListener("click", () => {
  if (audio.src) {
    if (audio.paused) {
      playPause.src = "static/img/mediaPlayer/pause.svg";
      audio.play();
    } else {
      playPause.src = "static/img/mediaPlayer/Play.svg";
      audio.pause();
    }
  } else {
    alert("Seleciona una canción!");
  }
});

/* 
move 10 seconds in timebar
plus10.addEventListener("click", () => {
  audio.currentTime += 10;
});

back10.addEventListener("click", () => {
  audio.currentTime -= 10;
}); 
*/

nextButtom.addEventListener("click", () => {
  if (listIndex < onPlayList.length && onPlayList.length > 1) {
    songElements[listIndex].classList.remove("active");
    listIndex++;
    if(listIndex === onPlayList.length) {
      listIndex--;
    }
    changeSong(listIndex);
  }
});

previousButtom.addEventListener("click", () => {
  if (listIndex > 0) {
    songElements[listIndex].classList.remove("active");
    listIndex--;
    console.log(listIndex, onPlayList.length)
  }
  changeSong(listIndex);
});

/* Volume */

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

volume.addEventListener("input", function (e) {
  audio.volume = e.currentTarget.value / 100;
  localStorage.setItem("volumen", e.currentTarget.value);
  if (e.currentTarget.value / 100 === 0) {
    volIcon.src = "static/img/mediaPlayer/muted.svg";
  } else if (e.currentTarget.value / 100 < 0.5) {
    volIcon.src = "static/img/mediaPlayer/volume-down.svg";
  } else {
    volIcon.src = "static/img/mediaPlayer/volume.svg";
  }
});

volIcon.addEventListener("click", function () {
  volIcon.classList.toggle("muted");

  if (volIcon.classList.contains("muted")) {
    audio.volume = 0;
    volume.value = "0";
    volIcon.src = "static/img/mediaPlayer/muted.svg";
  } else {
    audio.volume = 0.8;
    volume.value = "80";
    volIcon.src = "static/img/mediaPlayer/volume.svg";
    localStorage.setItem("volumen", "0.8");
  }
});

/* Media player
songTitle.innerHTML = songs[0].childNodes[3].innerHTML;
songAuthor.innerHTML = songs[0].childNodes[5].innerHTML;
audio.src = songs[0].childNodes[7].href;
*/

// Create song object
const createNewSong = (songs, i) => {
  const songData = {
    title: songs[i].childNodes[5].innerHTML,
    author: songs[i].childNodes[7].innerHTML,
    file: songs[i].childNodes[9].href,
  };

  return newPlayList(songData);
};

const startPlaylist = (startPlaylist) => {
  // console.log(songs[i].childNodes)

  songTitle.innerHTML = startPlaylist[0].title;
  songAuthor.innerHTML = startPlaylist[0].author;
  songTitleAuthor.innerHTML =
    startPlaylist[0].title + " - " + startPlaylist[0].author;
  audio.src = startPlaylist[0].file;

  playPause.src = "static/img/mediaPlayer/pause.svg";
  audio.play();
};

for (let i = 0; i < songs.length; i++) {
  // add click event to song tittle
  songs[i].childNodes[5].addEventListener("click", () => {
    // Delete songs in sideBar
    removeSideBarSongs();

    const myNewList = createNewSong(songs, i);
    startPlaylist(myNewList);
  });

  // Show and hidde plus circle
  songs[i].addEventListener("mouseover", () => {
    addSong[i].classList.remove("hidden");
  });

  songs[i].addEventListener("mouseout", () => {
    if (window.screen.availWidth > 600) {
      for (let i = 0; i < songs.length; i++) {
        addSong[i].classList.add("hidden");
      }
    }
  });

  // add new song to the list
  addSong[i].addEventListener("click", () => {
    if (onPlayList.length > 0) {
      const songData = {
        title: songs[i].childNodes[5].innerHTML,
        author: songs[i].childNodes[7].innerHTML,
        file: songs[i].childNodes[9].href,
      };

      if (
        onPlayList.filter(function (e) {
          return e.title === songData.title;
        }).length > 0 &&
        onPlayList.filter(function (e) {
          return e.author === songData.author;
        }).length > 0
      ) {
        console.log(true);
      } else {
        addPlayListItem(songData);
      }
    } else {
      const myNewList = createNewSong(songs, i);
      startPlaylist(myNewList);
    }
  });
}

audio.addEventListener("ended", () => {
  songElements[listIndex].classList.remove("active");
  listIndex = listIndex + 1;
  songElements[listIndex].classList.add("active");
  changeSong(listIndex);
});

// Playlists evets
for (let i = 0; i < playlistObjets.length; i++) {
  playlistObjets[i].addEventListener("click", () => {
    // Active navBAr to show list in phones
    navMenu.previousElementSibling.classList.toggle("active");
    navMenu.classList.toggle("active");
    navMenu.nextElementSibling.classList.toggle("active");

    songElements = [];

    onPlayList = myPlayLists[i].songs;
    removeSideBarSongs();

    for (let i = 0; i < onPlayList.length; i++) {
      const songData = {
        title: onPlayList[i].title,
        author: onPlayList[i].author,
        file: onPlayList[i].file,
      };

      addSidebarSong(songData, i);
    }

    songElements[0].classList.add("active");
    startPlaylist(onPlayList);
  });
}

if (songs.length === 7) {
  seeMoreLink.classList.remove("hidden");
}
