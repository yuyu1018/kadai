//ハンバーガーメニュー
const hamburger = document.querySelector(".hamburger");
const drawer = document.querySelector(".drawer");
const overlay = document.querySelector(".drawer-overlay");

function toggleMenu() {
  const isOpen = drawer.classList.contains("is-open");
  hamburger.classList.toggle("is-open");
  drawer.classList.toggle("is-open");
  overlay.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);