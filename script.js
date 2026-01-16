// ---- Elements ----
const heart = document.getElementById("heart");
const container = document.querySelector(".container");
const message = document.getElementById("message");
const words = document.querySelectorAll("#message .words span");
const subMessage = document.getElementById("sub-message");

const bgA = document.querySelector(".page-bg .bg-a");
const bgB = document.querySelector(".page-bg .bg-b");
const flash = document.querySelector(".page-bg .flash");

const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");

// ---- Slideshow images (put your real filenames here) ----
const images = [
  "FiveM_GTAProcess_oEmscc2RQC.webp",
  "FiveM_GTAProcess_R8JTZR0Nit.webp",
  "image.webp",
  "image (1).webp",
  "FiveM_GTAProcess_8hm8QXAMP6.webp",
  "image44.webp",
  "Screenshot_2025-12-14_090821.webp",
  "image (3).webp",
].map((s) => encodeURI(s)); // handles spaces

let imgIndex = 0;
let showingA = true;

// ---- Helpers ----
function setBg(el, src) {
  if (!el) return;
  el.style.backgroundImage = `url("${src}")`;
}

function flashOnce() {
  if (!flash) return;
  flash.classList.add("on");
  setTimeout(() => flash.classList.remove("on"), 120);
}

function preload(list) {
  list.forEach((src) => {
    const i = new Image();
    i.src = src;
  });
}

// ---- Slideshow loop ----
function nextImage() {
  if (!bgA || !bgB || images.length === 0) return;

  const src = images[imgIndex % images.length];
  imgIndex++;

  flashOnce();

  if (showingA) {
    setBg(bgB, src);
    bgB.style.opacity = "1";
    bgA.style.opacity = "0";
  } else {
    setBg(bgA, src);
    bgA.style.opacity = "1";
    bgB.style.opacity = "0";
  }

  showingA = !showingA;
  setTimeout(nextImage, 3500);
}

// ---- Heartbeat ----
function beat(scale, duration) {
  if (!heart) return;

  heart.style.transition = `transform ${duration}ms ease-in-out`;
  heart.style.transform = `rotate(-45deg) scale(${scale})`;
}

function heartbeat() {
  // human-ish lub-dub with random timing
  const lub = 1.25 + Math.random() * 0.10;
  const dub = 1.12 + Math.random() * 0.07;

  beat(lub, 120);
  setTimeout(() => beat(dub, 90), 150);
  setTimeout(() => beat(1, 180), 320);

  const next = 780 + Math.random() * 520;
  setTimeout(heartbeat, next);
}

// ---- Word reveal ----
function revealWords() {
  if (!words.length) return;
  words.forEach((w, i) => {
    setTimeout(() => w.classList.add("show"), i * 180);
  });
}

// ---- Music ----
function startMusic() {
  if (!music) return;
  music.volume = 0.4;
  music.play().catch(() => {
    // autoplay rules: user must click button/heart
  });
}

// ---- Boot ----
window.addEventListener("load", () => {
  // make sure we start at top
  window.scrollTo(0, 0);

  // entrance
  if (container) {
    container.classList.add("show");
    setTimeout(() => {
      container.classList.add("show-text");
      revealWords();
    }, 400);

    setTimeout(() => {
      container.classList.add("show-sub");
    }, 700);
  }

  // slideshow
  preload(images);
  if (bgA && images.length) {
    setBg(bgA, images[0]);
    bgA.style.opacity = "1";
    imgIndex = 1;
  }
  setTimeout(nextImage, 3500);

  // heartbeat
  setTimeout(heartbeat, 900);
});

// click surge
if (heart) {
  heart.addEventListener("click", () => {
    beat(1.6, 120);
    startMusic();
  });
}

if (playBtn) {
  playBtn.addEventListener("click", startMusic);
}
