// =======================
// GATE BUTTONS
// =======================

const gate = document.getElementById("gate");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const correctMessage = document.getElementById("correctMessage");
const gift = document.getElementById("gift");

// "ME" button runs away 😂
noBtn.addEventListener("mouseover", () => {
  noBtn.style.position = "absolute";
  noBtn.style.top = Math.random() * 80 + "%";
  noBtn.style.left = Math.random() * 80 + "%";
});

// Click "YOU"
yesBtn.addEventListener("click", () => {
  correctMessage.style.display = "block";
});

// Click gift → open website
gift.addEventListener("click", () => {
  gate.style.display = "none";
});

// =======================
// TYPEWRITER TEXT
// =======================

const text = "Every star shines for you ❤️";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}
typeWriter();

// =======================
// LOVE LETTER
// =======================

const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("letter");
const closeLetter = document.getElementById("closeLetter");

letterBtn.onclick = () => {
  letter.style.display = "flex";
};

closeLetter.onclick = () => {
  letter.style.display = "none";
};

// =======================
// MUSIC BUTTON
// =======================

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.onclick = () => {
  if (music.paused) {
    music.play();
    musicBtn.innerText = "⏸ Pause Music";
  } else {
    music.pause();
    musicBtn.innerText = "🎵 Play Music";
  }
};
