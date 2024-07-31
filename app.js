const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset-btn");
const newBtn = document.querySelector(".new-btn");

const message = document.querySelector(".message");
const container = document.querySelector(".container");
const gameBoard = document.querySelector(".game-board ");

const players = document.querySelector(".players");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const startBtn = document.querySelector(".start-btn");
const img = document.querySelector(".winning-img");
const playingPerson = document.querySelector(".playing-person");

startBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (player1.value && player2.value) {
    gameBoard.style.display = "grid";
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    playingPerson.innerText = `${player1.value}'s turn`;
    players.style.display = "none";
  }
});

let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = "O";

function switchTurn() {
  turn = turn === "O" ? "X" : "O";
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerHTML = `${turn}`;
    switchTurn();
    box.disabled = true;
    checkWinner();

    if (turn === "O") {
      playingPerson.innerText = `${player1.value}'s turn`;
    } else {
      playingPerson.innerText = `${player2.value}'s turn`;
    }
  });
});

//// CHECK WINNER

function checkWinner() {
  for (let pattern of winningPattern) {
    let position1 = boxes[pattern[0]].innerText;
    let position2 = boxes[pattern[1]].innerText;
    let position3 = boxes[pattern[2]].innerText;

    if (position1 != "" && position2 != "" && position3 != "") {
      if (position1 === position2 && position2 === position3) {
        boxes.forEach((box) => {
          box.disabled = true;
        });
        declareWinner();
        container.style.display = "none";
        newBtn.style.display = "block";
      }
    }
  }
}

//// DECLARE WINNER

function declareWinner() {
  let winner;

  if (turn === "O") {
    winner = player2.value;
  } else {
    winner = player1.value;
  }

  message.style.display = "block";
  message.innerHTML = ` Congratulations ${winner}!`;
  img.style.display = "block";
}

//// RESET GAME

function resetGame() {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
    turn = "O";
  });
  playingPerson.innerText = "";
  playingPerson.innerText = `${player1.value}'s turn`;
}

resetBtn.addEventListener("click", () => {
  resetGame();
});

// NEW GAME

newBtn.addEventListener("click", () => {
  container.style.display = "flex";
  resetGame();
  message.style.display = "none";
  newBtn.style.display = "none";

  startNewGame();
});

function startNewGame() {
  gameBoard.style.display = "none";
  startBtn.style.display = "block";
  resetBtn.style.display = "none";
  img.style.display = "none";

  players.style.display = "block";
  player1.value = "";
  player2.value = "";
  playingPerson.innerText = "";
}
