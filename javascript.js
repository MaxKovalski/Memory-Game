const amount = 5;
const numbers = [];
let timer = 0;
let checkInterval;
gameTimer();
const board = document.querySelector("#board");
board.style.gridTemplateColumns = `repeat(6,1fr)`;
let counter = +0;
for (let i = 1; i <= amount; i++) {
  numbers.push(i, i);
}
for (let i = 1; i <= amount * 2; i++) {
  const random = Math.floor(Math.random() * numbers.length);
  let divDiv = document.createElement("div");
  divDiv.innerHTML = `<span> ${numbers[random]}</span>`;
  board.appendChild(divDiv);
  numbers.splice(random, 1);
  divDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("hidden")) {
      return;
    }
    if (board.querySelectorAll(".showing").length == 2) {
      return;
    }
    event.target.classList.add("showing");

    // document.addEventListener("keydown", (event) => {
    //   if (event.key === "ArrowUp") {
    board
      .querySelectorAll(".cheat")
      .forEach((elem) => elem.classList.remove("cheat"));
    const elements = board.querySelectorAll("div:not(.showing)");

    for (const elem of elements) {
      if (elem.textContent === event.target.textContent) {
        elem.classList.add("cheat");
        break;
      }
    }

    checkCards();
  });
}
function checkCards() {
  let cards = board.querySelectorAll(".showing");
  if (cards.length == 2) {
    counter++;
    document.querySelector(".counter").innerHTML = counter;
    const one = cards[0];
    const two = cards[1];
    if (one.innerText == two.innerText) {
      setTimeout(() => {
        one.classList.add("hidden");
        two.classList.add("hidden");
        one.classList.remove("showing");
        two.classList.remove("showing");
        winWin();
      }, 500);
    } else {
      setTimeout(() => {
        one.classList.remove("showing");
        two.classList.remove("showing");
      }, 1000);
    }
  }
}
function winWin() {
  const cards = board.querySelectorAll("div:not(.hidden)");
  if (!cards.length) {
    confetti({
      particleCount: 100,
      spread: 70,
      decay: 0.9,
      origin: { y: 0.6 },
    });
  }
}
function gameTimer() {
  setInterval(() => {
    timer++;
    const date = new Date(timer * 1000);
    const m = date.getMinutes();
    const s = date.getSeconds();
    document.querySelector(".timer").innerHTML = `${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
  }, 1000);
}
