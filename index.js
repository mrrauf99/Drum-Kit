const sounds = {
  w: new Audio("sounds/tom-1.mp3"),
  a: new Audio("sounds/tom-2.mp3"),
  s: new Audio("sounds/tom-3.mp3"),
  d: new Audio("sounds/tom-4.mp3"),
  j: new Audio("sounds/snare.mp3"),
  k: new Audio("sounds/crash.mp3"),
  l: new Audio("sounds/kick-bass.mp3"),
};

let unlockedAudio = false;

// Handle both mouse and touch
$("button").on("pointerdown", function () {
  const key = $(this).text().toLowerCase();
  PlaySound(key);
  ButtonAnimation(key);
});

// Keyboard input
$(document).on("keydown", function (event) {
  const key = event.key.toLowerCase();
  PlaySound(key);
  ButtonAnimation(key);
});

// Play sound safely
function PlaySound(key) {
  if (sounds[key]) {
    if (!unlockedAudio) {
      setTimeout(() => {
        sounds[key].play();
        unlockedAudio = true;
      }, 100);
    } else {
      sounds[key].currentTime = 0;
      sounds[key].play();
    }
  }
}

// Button animation
function ButtonAnimation(key) {
  const button = $("." + key);
  button.addClass("pressed");
  setTimeout(() => button.removeClass("pressed"), 100);
}

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
$(document).on("touchend", function (event) {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
});
