import "./styles.css";
import Player from "./player";
import Gameboard from "./gameboard";

const playerOne = new Player();
const playerTwo = new Player();

const playerDisplay = document.querySelector("#currPlayer");

const boardOne = document.querySelector("#boardOne");
const boardTwo = document.querySelector("#boardTwo");

const game = {
  currPlayer: playerOne,
  winner: false,
  rngCoord() {
    return Math.floor(Math.random() * 10) + 1 - 1;
  },
  rngDir() {
    const temp = Math.floor(Math.random() * (4 - 1) + 1);
    let dir;
    switch (temp) {
      case 1:
        dir = "up";
        break;
      case 2:
        dir = "down";
        break;
      case 3:
        dir = "left";
        break;
      case 4:
        dir = "right";
        break;
    }
    return dir;
  },
  loadBoard(player, board) {
    while (board.firstChild) {
      board.removeChild(board.lastChild);
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        if (player.board.coords.get(`${i}, ${j}`).mark !== "X") {
          const type = player.board.ships.at(
            player.board.coords.get(`${i}, ${j}`).mark
          ).type;
          tile.textContent = type.charAt(0).toUpperCase();
          tile.classList.add(`${type}`);
        } else {
          tile.textContent = player.board.coords.get(`${i}, ${j}`).mark;
        }
        if (player.board.coords.get(`${i}, ${j}`).hit) {
          tile.classList.add("hit");
        }
        board.appendChild(tile);
      }
    }
  },
  attack(player, x, y) {
    return player.board.receiveAttack(x, y);
  },
  loadCoveredBoard() {
    const enemy = playerTwo;
    const enemyBoard = boardTwo;
    const currBoard = boardOne;

    while (enemyBoard.firstChild) {
      enemyBoard.removeChild(enemyBoard.lastChild);
    }
    this.loadBoard(this.currPlayer, currBoard);

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = "";
        tile.addEventListener("click", () => {
          this.attack(enemy, i, j);
          tile.classList.add("hit");
          if (enemy.board.coords.get(`${i}, ${j}`).mark === "X") {
            tile.textContent = "X";
          } else {
            tile.classList.add(
              enemy.board.ships.at(enemy.board.coords.get(`${i}, ${j}`).mark)
                .type
            );
            tile.textContent = enemy.board.ships
              .at(enemy.board.coords.get(`${i}, ${j}`).mark)
              .type.charAt(0)
              .toUpperCase();
          }
          while (
            !this.attack(this.currPlayer, this.rngCoord(), this.rngCoord())
          );
          if (this.currPlayer.board.areSunk()) {
            this.winner = this.enemy;
            this.loadBoard(playerOne, boardOne);
            this.loadBoard(playerTwo, boardTwo);
            this.displayWinner();
            return;
          }
          if (enemy.board.areSunk()) {
            this.winner = this.currPlayer;
            this.loadBoard(playerOne, boardOne);
            this.loadBoard(playerTwo, boardTwo);
            this.displayWinner();
            return;
          }
          this.loadBoard(this.currPlayer, currBoard);
        });
        enemyBoard.appendChild(tile);
      }
    }
  },
  play() {
    playBtn.style.visibility = "hidden";
    this.randomizeShips(playerOne);
    this.randomizeShips(playerTwo);
    this.loadCoveredBoard(boardTwo, playerTwo);
    playerDisplay.textContent = "";
  },
  displayWinner() {
    playBtn.textContent = "Play again";
    playBtn.style.visibility = "visible";
    if (this.winner === playerOne) {
      playerDisplay.textContent = "You win";
    } else {
      playerDisplay.textContent = "AI wins";
    }
    playerOne.board = new Gameboard();
    playerTwo.board = new Gameboard();
  },
  randomizeShips(player) {
    while (
      !player.board.placeShip(
        "carrier",
        this.rngCoord(),
        this.rngCoord(),
        this.rngDir()
      )
    );
    while (
      !player.board.placeShip(
        "battleship",
        this.rngCoord(),
        this.rngCoord(),
        this.rngDir()
      )
    );
    while (
      !player.board.placeShip(
        "destroyer",
        this.rngCoord(),
        this.rngCoord(),
        this.rngDir()
      )
    );
    while (
      !player.board.placeShip(
        "submarine",
        this.rngCoord(),
        this.rngCoord(),
        this.rngDir()
      )
    );
    while (
      !player.board.placeShip(
        "patrolboat",
        this.rngCoord(),
        this.rngCoord(),
        this.rngDir()
      )
    );
  },
};

const main = document.querySelector("main");
main.style.visibility = "hidden";

const playBtn = document.querySelector("#play");
playBtn.addEventListener("click", () => {
  main.style.visibility = "visible";
  game.play();
});
