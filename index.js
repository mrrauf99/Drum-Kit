const sounds = {
  w: new Audio("sounds/tom-1.mp3"),
  a: new Audio("sounds/tom-2.mp3"),
  s: new Audio("sounds/tom-3.mp3"),
  d: new Audio("sounds/tom-4.mp3"),
  j: new Audio("sounds/snare.mp3"),
  k: new Audio("sounds/crash.mp3"),
  l: new Audio("sounds/kick-bass.mp3"),
};

// touch and click event handler
let isTouch = false;

$("button").on("click touchstart", function (event) {
  if (event.type == "touchstart") {
    isTouch = true;
  }

  if (event.type == "click" && isTouch) {
    return;
  }

  PlaySound($(this).text());
  ButtonAnimation($(this).text());

  setTimeout(function () {
    isTouch = false;
  }, 500);
});

// keydown event handler

$(document).on("keydown", function (event) {
  PlaySound(event.key.toLowerCase());
  ButtonAnimation(event.key.toLowerCase());
});

function PlaySound(key) {
  sounds[key].currentTime = 0; // Rewinds the sound to the beginning
  sounds[key].play();
}

function ButtonAnimation(key) {
  $("." + key).addClass("pressed");
  setTimeout(function () {
    $("." + key).removeClass("pressed");
  }, 100);
}

// To prevent double tap zoom in
let lastTouchEnd = 0;

$(document).on("touchend", function (event) {
  const now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault(); // block zoom if it's a double tap
  }
  lastTouchEnd = now;
});

