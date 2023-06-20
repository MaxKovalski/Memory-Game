const point1 = document.getElementById("point1");
const point2 = document.getElementById("point2");
let theTurn = document.getElementById("theTurn");
const board = document.querySelector("#board");
const rows = document.getElementById("rows");
const amountNumber = document.getElementById("blocks");
const startNumberInput = document.getElementById("startNumber");
const popUp = document.getElementById("popUp");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player1Input = document.getElementById("player1Input");
const player2Input = document.getElementById("player2Input");
const resetGame = document.getElementById("resetGame");
let amount = 0;
const numbers = [];
let timer = 0;
let counter = 0;
let turn = true;
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;
function startGame() {
  if (rows.value > 10 || amountNumber.value > 10) {
    alert("Maximum Rows: 10 \nMaximum Blocks: 10");
    return;
  } else if (
    rows.value <= 1 ||
    amountNumber.value <= 1 ||
    startNumberInput.value == ""
  ) {
    alert(
      "Maximum Rows: 10 \nStart Number Cannot Be Empty \nMaximum Blocks: 10"
    );
  } else {
    popUp.style.display = "none";
  }
  player1.innerText = player1Input.value;
  player2.innerText = player2Input.value;
  amount = amountNumber.value;
  theTurn.innerHTML = player1Input.value;

  gameTimer();
  createBoard();
  addNumbers();
}
function createBoard() {
  let row = rows.value;
  board.style.gridTemplateColumns = `repeat(${row},1fr)`;
  numbers.length = 0;
  const startNumber = parseInt(startNumberInput.value) || 1;
  let currentNumber = startNumber;
  for (let i = 0; i < amount; i++) {
    numbers.push(currentNumber, currentNumber);
    currentNumber++;
  }
}
function addNumbers() {
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
      // CHEAT- CODE
      // board
      //   .querySelectorAll(".cheat")
      //   .forEach((elem) => elem.classList.remove("cheat"));
      // const elements = board.querySelectorAll("div:not(.showing)");

      // for (const elem of elements) {
      //   if (elem.textContent === event.target.textContent) {
      //     elem.classList.add("cheat");
      //     break;
      //   }
      // }

      checkCards();
    });
  }
}
function checkCards() {
  let cards = board.querySelectorAll(".showing");
  if (cards.length == 2) {
    counter++;
    document.querySelector(".counter").innerHTML = counter;
    const one = cards[0];
    const two = cards[1];
    if (one.innerText == two.innerText) {
      if (turn) {
        pointsPlayer1++;
      } else {
        pointsPlayer2++;
      }
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
        turn = !turn;
        checkTurn();
      }, 1000);
    }
  }
  checkTurn();
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
    if (pointsPlayer1 > pointsPlayer2) {
      alert(player1Input.value + " Winner");
    } else if (pointsPlayer1 < pointsPlayer2) {
      alert(player2Input.value + " Winner");
    }
    resetGame.style.display = "flex";
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
function checkTurn() {
  let player1Name = player1Input.value;
  let player2Name = player2Input.value;
  if (turn) {
    theTurn.innerHTML = player1Name;
    theTurn.innerHTML.replace(player2Name, "");
    point1.innerHTML = pointsPlayer1;
  } else {
    theTurn.innerHTML = player2Name;
    theTurn.innerHTML.replace(player1Name, "");
    point2.innerHTML = pointsPlayer2;
  }
}
