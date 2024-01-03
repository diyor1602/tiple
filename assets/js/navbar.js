let xMark = document.querySelector(".fa-xmark");
let hamburger = document.querySelector(".fa-bars");
let navMenu = document.querySelector(".nav__menu");
let blackShadow = document.querySelector(".blackShadow");

hamburger.addEventListener("click", () => toggleNav());
xMark.addEventListener("click", () => toggleNav());
blackShadow.addEventListener("click", () => toggleNav());

function toggleNav() {
  if (navMenu.classList.contains("showNav")) {
    navMenu.classList.remove("showNav");
    navMenu.classList.add("hideNav");
    blackShadow.style.display = "none";
  } else {
    navMenu.classList.remove("hideNav");
    navMenu.classList.add("showNav");
    blackShadow.style.display = "block";
  }
}
