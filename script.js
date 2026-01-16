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
  "./image (1).webp"
].map(encodeURI);

let imgIndex = 0;
let showingA = true;
let slideshowTimer = null;

function setBg(el, src) {
  if (!el) return;
  el.style.backgroundImage = 'url("' + src + '")';
}

function preloadImages(list) {
  for (let k = 0; k < list.length; k++) {
    const img = new Image();
    img.src = list[k];
  }
}

function flashOnce() {
  if (!flash) return;
  flash.classList.add("on");
  setTimeout(function () {
    flash.classList.remove("on");
  }, 120);
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

  heart.style.transition = "transform " + duration + "ms ease-in-out";
  heart.style.transform = "rotate(-45deg) scale(" + scale + ")";

  message.style.transition = "transform " + duration + "ms ease-in-out, opacity " + duration + "ms ease-in-out";
  message.style.transform = "scale(" + (1 + (scale - 1) * 0.2) + ")";
  message.style.opacity = String(0.85 + (scale - 1) * 0.35);
}

function heartbeat() {
  const lub = 1.22 + Math.random() * 0.08;
  const dub = 1.10 + Math.random() * 0.06;

  beat(lub, 120);
  setTimeout(function () { beat(dub, 90); }, 150);
  setTimeout(function () { beat(1, 200); }, 330);

  const pause = 900 + Math.random() * 500;
  setTimeout(heartbeat, pause);
}

function revealWords() {
  if (!words || words.length === 0) return;
  for (let i = 0; i < words.length; i++) {
    (function (idx) {
      setTimeout(function () {
        words[idx].classList.add("show");
      }, idx * 220);
    })(i);
  }
}

function startMusic() {
  if (musicStarted || !music) return;
  music.volume = 0.4;
  music.play().catch(function (err) {
    console.log("Music play failed:", err);
  });
  musicStarted = true;
}

window.addEventListener("load", function () {
  // Always show the card even if slideshow fails
  if (container) {
    container.classList.add("show");
    setTimeout(function () { container.classList.add("show-text"); }, 650);
    setTimeout(function () { container.classList.add("show-sub"); }, 950);
  }

  preloadImages(images);

  if (bgA && images.length) {
    setBg(bgA, images[0]);
    bgA.
