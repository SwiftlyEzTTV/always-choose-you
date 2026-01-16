const heart = document.getElementById("heart");
const container = document.querySelector(".container");
const message = document.getElementById("message");
const words = document.querySelectorAll(".words span");
const subMessage = document.getElementById("sub-message");

const bgA = document.querySelector(".bg-a");
const bgB = document.querySelector(".bg-b");
const flash = document.querySelector(".flash");

const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");

let musicStarted = false;

const images = [
  "./FiveM_GTAProcess_oEmscc2RQC.webp",
  "./FiveM_GTAProcess_R8JTZR0Nit.webp",
  "./image.webp",
  "./image (1).webp",
].map(encodeURI);

let imgIndex = 0;
let showingA = true;
let slideshowTimer = null;

function setBg(el, src) {
  if (!el) return;
  el.style.backgroundImage = `url("${src}")`;
}

function preloadImages(list) {
  list.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function flashOnce() {
  if (!flash) return;
  flash.classList.add("on");
  setTimeout(() => flash.classList.remove("on"), 120);
}

function nextImage() {
  if (!bgA || !bgB || images.length === 0) return;

  const nextSrc = images[imgIndex % images.length];
  imgIndex++;

  flashOnce();

  if (showingA) {
    setBg(bgB, nextSrc);
    bgB.style.opacity = "1";
    bgA.style.opacity = "0";
  } else {
    setBg(bgA, nextSrc);
    bgA.style.opacity = "1";
    bgB.style.opacity = "0";
  }

  showingA = !showingA;
  slideshowTimer = setTimeout(nextImage, 3500);
}

function beat(scale, duration) {
  if (!heart || !message) return;

  heart.style.transition = `transform ${duration}ms ease-in-out`;
  heart.style.transform = `rotate(-45deg) scale(${scale})`;

  message.style.transition = `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;
  message.style.transform = `scale(${1 + (scale - 1) * 0.2})`;
  message.style.opacity = 0.85 + (scale - 1) * 0.35;
}

function heartbeat() {
  const lub = 1.22 + Math.random() * 0.08;
  const dub = 1.10 + Math.random() * 0.06;

  beat(lub, 120);
  setTimeout(() => beat(dub, 90), 150);
  setTimeout(() => beat(1, 200), 330);

  const pause = 900 + Math.random() * 500;
  setTimeout(heartbeat, pause);
}

function revealWords() {
  if (!words.length) return;
  words.forEach((word, index) => {
    setTimeout(() => word.classList.add("show"), index * 220);
  });
}

function startMusic() {
  if (musicStarted || !music) return;
  music.volume = 0.4;
  music.play().catch((err) => console.log("Music play failed:", err));
  musicStarted = true;
}

window.addEventListener("load", () => {
  // ✅ always show the card even if slideshow fails
  if (container) {
    container.classList.add("show");
    setTimeout(() => container.classList.add("show-text"), 650);
    setTimeout(() => container.classList.add("show-sub"), 950);
  }

  // slideshow init
  preloadImages(images);

  if (bgA && images.length) {
    setBg(bgA, images[0]);
    bgA.style.opacity = "1";
    imgIndex = 1;
  }

  if (slideshowTimer) clearTimeout(slideshowTimer);
  slideshowTimer = setTimeout(nextImage, 3500);

  // text/words + heartbeat
  setTimeout(() => revealWords(), 700);
  setTimeout(() => heartbeat(), 900);
});

// controls
if (heart) {
  heart.addEventListener("click", () => {
    beat(1.6, 120);
    startMusic();
  });
}

if (playBtn) {
  playBtn.addEventListener("click", startMusic);
}
