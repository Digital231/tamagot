const animal = document.querySelector(".animal");
const randomItem = document.querySelector(".random-item");
const feedBtn = document.getElementById("feedBtn");
const playBtn = document.getElementById("playBtn");
const healthBar = document.getElementById("healthBar");
const hungerBar = document.getElementById("hungerBar");
const joyBar = document.getElementById("joyBar");
const levelHTML = document.getElementById("levelHTML");
const gameContainer = document.getElementById("gameContainer");
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");

let spritePosition = 0;
let health = 100;
let hunger = 100;
let joy = 100;
let level = 1;
let isLevelUp = false;
let isMoving = false;

startBtn.onclick = () => {
  startScreen.classList.add("d-none");
  gameContainer.classList.remove("d-none");
};

function toggleAnimalMovement() {
  animal.classList.toggle("moving");
  isMoving = !isMoving;

  if (isMoving) {
    animal.classList.add("moving");
  } else {
    animal.classList.remove("moving");
    animal.style.transform = "translateX(0)";
  }
}

window.addEventListener("load", toggleAnimalMovement);

function hungerBarDown() {
  if (health <= 0) {
    console.log("Your animal is dead");
    return;
  }
  if (hunger <= 0) {
    health--;
    if (healthBar) {
      healthBar.style.width = `${health}%`;
      healthBar.innerText = `Health Points: ${health}%`;
    }
  }
  if (hunger > 0) {
    hunger--;
    if (hungerBar) {
      hungerBar.style.width = `${hunger}%`;
      hungerBar.innerText = `Hungriness: ${hunger}%`;
    }
  }
}
function joyBarDown() {
  if (health <= 0) {
    console.log("Your animal is dead");
    return;
  }
  if (joy <= 0) {
    health--;
    if (healthBar) {
      healthBar.style.width = `${health}%`;
      healthBar.innerText = `Health Points: ${health}%`;
    }
  }
  if (joy > 0) {
    joy--;
    if (joyBar) {
      joyBar.style.width = `${joy}%`;
      joyBar.innerText = `Joy: ${joy}%`;
    }
  }
}

function increaseJoy() {
  if (joy >= 100) {
    joy = 100;
    return;
  }
  if (joy < 100) {
    joy += 10;
    if (joyBar) {
      joyBar.style.width = `${joy}%`;
      joyBar.innerText = `Joy: ${joy}%`;
    }
  }
  if (randomItem) {
    randomItem.style.display = "none";
    randomItem.removeEventListener("click", increaseJoy);
  }
}
function levelUpAnimal(animalElement) {
  if (!animalElement) return;
  level++;
  isLevelUp = true;
  const scale = 1 + level * 0.1;
  animalElement.style.transform = `scale(${scale})`;
  console.log(
    `Level: ${level}, Scale: ${scale}, Animal Element:`,
    animalElement
  );
  if (levelHTML) {
    levelHTML.innerText = `Level: ${level}`;
  }
  isLevelUp = false;
}

feedBtn === null || feedBtn === 0
  ? 0
  : feedBtn.addEventListener("click", () => {
      if (hunger >= 100) {
        hunger = 100;
        return;
      }
      if (hunger > 0 || health <= 0) {
        hunger++;
        if (hungerBar) {
          hungerBar.style.width = `${hunger}%`;
          hungerBar.innerText = `Hungriness: ${hunger}%`;
        }
      } else {
        alert("Your animal is dead");
      }
    });

playBtn.addEventListener("click", startMiniGame);

function startMiniGame() {
  if (!gameContainer || !randomItem) return;
  const containerWidth = gameContainer.clientWidth;
  const containerHeight = gameContainer.clientHeight;
  const itemSize = 50;
  const randomX = Math.floor(Math.random() * (containerWidth - itemSize));
  const randomY = Math.floor(Math.random() * (containerHeight - itemSize));
  randomItem.style.left = `${randomX}px`;
  randomItem.style.top = `${randomY}px`;
  randomItem.style.display = "block";
  console.log(`Random item positioned at: (${randomX}px, ${randomY}px)`);
  randomItem.addEventListener("click", increaseJoy);
  setTimeout(() => {
    if (randomItem.style.display === "block") {
      randomItem.style.display = "none";
      randomItem.removeEventListener("click", increaseJoy);
    }
  }, 2000);
}
setInterval(() => {
  levelUpAnimal(animal);
}, 9000);
setInterval(hungerBarDown, 1000);
setInterval(joyBarDown, 1000);

setInterval(() => {
  spritePosition += 101.01;
  animal.style.backgroundPosition = `-${spritePosition}px -7px`;

  if (spritePosition >= 600) {
    spritePosition = 0;
  }
}, 150);
