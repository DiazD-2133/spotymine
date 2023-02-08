navMenu.addEventListener("click", () => {
  overlay.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.querySelector(".sidenav").classList.toggle("active");
});

overlay.addEventListener("click", openNavbar);

for (let i = 0; i < dropdownBtn.length; i++) {
  dropdownBtn[i].style.cursor = "pointer";

  dropdownBtn[i].addEventListener("mouseover", () => {
    dropdownBtn[i].firstElementChild.style.color = "#d6d1d1";
    dropdownBtn[i].firstElementChild.nextElementSibling.style.color = "#d6d1d1";
  });

  dropdownBtn[i].addEventListener("mouseout", () => {
    dropdownBtn[i].firstElementChild.style.color = "#818181";
    dropdownBtn[i].firstElementChild.nextElementSibling.style.color = "#818181";
  });

  dropdownBtn[i].addEventListener("click", function () {
    this.classList.toggle("active");
    this.firstElementChild.classList.toggle("active");
    this.firstElementChild.nextElementSibling.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

for (let i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.parentElement.classList.toggle("active");
    this.previousElementSibling.classList.toggle("active");
    this.classList.toggle("active");
    var dropdownContent = this.parentElement.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

for (i = 0; i < auto_dropdown.length; i++) {
  if (auto_dropdown[i].style.display === "block") {
    dropdown.style.display = "none";
  } else {
    auto_dropdown[i].style.display = "block";
  }
}

if (window.screen.availWidth <= 600) {
  for (let i = 0; i < songs.length; i++) {
    addSong[i].classList.remove("hidden");
  }
}
