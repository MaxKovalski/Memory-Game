let theTurn = document.getElementById("theTurn");
const point1 = document.getElementById("point1");
const point2 = document.getElementById("point2");
const board = document.querySelector("#board");
const columns = document.getElementById("columns");
const amountNumber = document.getElementById("blocks");
const startNumberInput = document.getElementById("startNumber");
const popUp = document.getElementById("popUp");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player1Input = document.getElementById("player1Input");
const player2Input = document.getElementById("player2Input");
const startNumber = document.getElementById("startNumber");
const resetGame = document.getElementById("resetGame");
const winName = document.getElementById("winName");
const winScore = document.getElementById("winScore");
winTime = document.getElementById("winTime");
let amount = 0;
const numbers = [];
let timer = 0;
let counter = 0;
let turn = true;
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;
let time;
let mw = window.matchMedia("(max-width: 800px");
let test = "";
let alerts =
  "PlayerName1&2 required\nMaximum columns: 10 \nStart Number Cannot Be Empty \nMaximum Number: 900 \nMaximum Pairs: 10 ";
function startGame() {
  responsiveAlert();
  if (columns.value > 10 || amountNumber.value > 10) {
    alert(alerts);

    return;
  } else if (
    columns.value <= 1 ||
    amountNumber.value <= 1 ||
    startNumberInput.value == ""
  ) {
    alert(alerts);
    return;
  } else if (startNumber.value > 900) {
    alert(alerts);
    return;
  } else if (!player1Input.value || !player2Input.value) {
    alert(alerts);
    return;
  }
  if (mw.matches && columns.value > 5) {
    alert("for best Experience in 'Columns' use max: 5");
    return;
  } else {
    popUp.style.display = "none";
    gameTimer();
  }
  player1.innerText = player1Input.value;
  player2.innerText = player2Input.value;
  amount = amountNumber.value;
  theTurn.innerHTML = player1Input.value;
  createBoard();
  addNumbers();
}
function createBoard() {
  let row = columns.value;
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
function gameTimer() {
  setInterval(() => {
    timer++;
    date = new Date(timer * 1000);
    const m = date.getMinutes();
    const s = date.getSeconds();
    time = `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
    document.querySelector(".timer").innerHTML = time;
  }, 1000);
}
function checkTurn() {
  let player1Name = player1Input.value;
  let player2Name = player2Input.value;
  let player1Color = document.createElement("span");
  player1Color.style.color = "#711171";
  player1Color.textContent = player1Name;
  let player2Color = document.createElement("span");
  player2Color.style.color = "greenyellow";
  player2Color.textContent = player2Name;
  if (turn) {
    theTurn.innerHTML = "";
    theTurn.appendChild(player1Color);
    theTurn.innerHTML.replace(player2Name, "");
    point1.innerHTML = pointsPlayer1;
  } else {
    theTurn.innerHTML = "";
    theTurn.appendChild(player2Color);
    theTurn.innerHTML.replace(player1Name, "");
    point2.innerHTML = pointsPlayer2;
  }
}
function winWin() {
  const cards = board.querySelectorAll("div:not(.hidden)");
  const win = document.getElementById("win");
  if (!cards.length) {
    confetti({
      particleCount: 100,
      spread: 70,
      decay: 0.9,
      origin: { y: 0.6 },
    });
    if (pointsPlayer1 > pointsPlayer2) {
      winName.innerHTML = player1Input.value;
      winScore.innerHTML = pointsPlayer1;
      winTime.innerHTML = time;
      win.classList.add("player1-win");
      win.style.display = "flex";
      win.style.borderColor = "#711171";
      document.getElementById("memoryGame").style.display = "none";
    } else if (pointsPlayer1 < pointsPlayer2) {
      winName.innerHTML = player2Input.value;
      winScore.innerHTML = pointsPlayer2;
      winTime.innerHTML = time;
      win.style.display = "flex";
      win.classList.add("player2-win");
      win.style.borderColor = "greenyellow";
      document.getElementById("memoryGame").style.display = "none";
    }
  }
}
function responsiveAlert() {
  if (mw.matches) {
    alerts =
      "PlayerName1&2 required\nMaximum columns: 10 \nStart Number Cannot Be Empty \nMaximum Number: 900 \nMaximum Pairs: 10 ";
  }
}
let;
