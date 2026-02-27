const track = document.getElementById("track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function getGap() {
  const style = getComputedStyle(track);
  return parseFloat(style.gap) || 0;
}

function getVisible() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
}

// 元のスライドを保持
const originals = Array.from(track.querySelectorAll(".banner"));
const total = originals.length;

let visible;
let current;
let isTransitioning = false;

function getSlideWidth() {
  const containerWidth = track.parentElement.offsetWidth;
  const gap = getGap();
  return (containerWidth - gap * (visible - 1)) / visible + gap;
}

function setPosition(index, animate) {
  if (!animate) {
    track.style.transition = "none";
  } else {
    track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
  }
  track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
}

function goNext() {
  if (isTransitioning) return;
  isTransitioning = true;
  current++;
  setPosition(current, true);
}

function goPrev() {
  if (isTransitioning) return;
  isTransitioning = true;
  current--;
  setPosition(current, true);
}

track.addEventListener("transitionend", () => {
  if (current >= total + visible) {
    current = visible;
    setPosition(current, false);
  } else if (current < visible) {
    current = total + visible - 1;
    setPosition(current, false);
  }
  track.getBoundingClientRect();
  isTransitioning = false;
});

function init() {
  const newVisible = getVisible();

  if (newVisible === visible) {
    setPosition(current, false);
    return;
  }

  visible = newVisible;

  Array.from(track.querySelectorAll("[aria-hidden='true']")).forEach((el) =>
    el.remove()
  );

  originals.slice(-visible).forEach((el) => {
    const clone = el.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.insertBefore(clone, track.firstChild);
  });

  originals.slice(0, visible).forEach((el) => {
    const clone = el.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  current = visible;
  setPosition(current, false);
}

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

init();

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(init, 200);
});