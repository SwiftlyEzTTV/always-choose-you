const heart = document.getElementById("heart");
const container = document.querySelector(".container");
const message = document.getElementById("message");
const subMessage = document.getElementById("sub-message");
const words = document.querySelectorAll(".words span");

const bgA = document.querySelector(".bg-a");
const bgB = document.querySelector(".bg-b");
const flash = document.querySelector(".flash");

const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");

// Put your images here (exact filenames, case-sensitive on GitHub Pages)
const images = [
  "FiveM_GTAProcess_8hm8QXAMP6.webp",
  "image44.webp",
  "Screenshot_2025-12-14_090821.webp",
  "image (3).webp",
];

// --- Background slideshow ---
let imgIndex = 0;
let showingA = true;

function safeUrl(src) {
  // handles spaces + parentheses safely
  return encodeURI(src);
}

function setBg(el, src) {
  if (!el) return;
  el.style.backgroundImage = `url("${safeUrl(src)}")`;
}

function flashOnce() {
  if (!flash) return;
  flash.classList.add("on");
  setTimeout(() => flash.classList.remove("on"), 120);
}

function nextImage() {
  if (!bgA || !bgB || images.length < 1) return;

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

// --- Heartbeat ---
function beat(scale, duration) {
  if (!heart) return;

  heart.style.transition = `transform ${duration}ms ease-in-out`;
  heart.style.transform = `rotate(-45deg) scale(${scale})`;
}

function heartbeatLoop() {
  const lub = 1.25 + Math.random() * 0.08;
  const dub = 1.15 + Math.random() * 0.05;

  beat(lub, 120);
  setTimeout(() => beat(dub, 90), 150);
  setTimeout(() => beat(1, 180), 320);

  const next = 800 + Math.random() * 500;
  setTimeout(heartbeatLoop, next);
}

// --- Word reveal ---
function revealWords() {
  words.forEach((w, i) => {
    setTimeout(() => w.classList.add("show"), i * 220);
  });
}

// --- Music (no analyser / no beat sync) ---
function startMusic() {
  if (!music) return;
  music.volume = 0.4;
  music.play().catch(() => {
    // If browser blocks it, user must click again (normal)
  });
}

window.addEventListener("load", () => {
  // card entrance + text
  setTimeout(() => container?.classList.add("show"), 150);

  setTimeout(() => {
    container?.classList.add("show-text");
    revealWords();
  }, 950);

  setTimeout(() => container?.classList.add("show-sub"), 1350);

  // start heartbeat
  setTimeout(heartbeatLoop, 1100);

  // start background
  if (images.length) {
    setBg(bgA, images[0]);
    bgA.style.opacity = "1";
    imgIndex = 1;
    setTimeout(nextImage, 3500);
  }
});

// click surge
heart?.addEventListener("click", () => {
  beat(1.6, 120);
});

// play music button
playBtn?.addEventListener("click", startMusic);


// ----- Lightbox (click to expand images) -----
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

// Make any image with .clickable open the lightbox
document.addEventListener("click", (e) => {
  const img = e.target.closest("img.clickable");
  if (!img) return;

  const src = img.getAttribute("src");
  const alt = img.getAttribute("alt") || "Expanded image";

  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;
  lightboxImg.alt = alt;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  // clear image after close (prevents weird flashing sometimes)
  if (lightboxImg) {
    lightboxImg.src = "";
    lightboxImg.alt = "";
  }
}

// Close button
if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

// Click outside image closes
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// ESC closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox?.classList.contains("open")) {
    closeLightbox();
  }
});

