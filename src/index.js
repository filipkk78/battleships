import "./styles.css";
import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";

const playerOne = new Player("human");
playerOne.board.placeShip("carrier", 3, 4, "up");
playerOne.board.placeShip("patrolboat", 1, 2, "down");
playerOne.board.placeShip("submarine", 3, 9, "left");
playerOne.board.placeShip("destroyer", 9, 0, "left");
playerOne.board.placeShip("battleship", 6, 9, "right");

const playerTwo = new Player("human");
playerTwo.board.placeShip("carrier", 3, 4, "up");
playerTwo.board.placeShip("destroyer", 8, 1, "up");
playerTwo.board.placeShip("submarine", 6, 8, "right");
playerTwo.board.placeShip("patrolboat", 6, 6, "left");
playerTwo.board.placeShip("battleship", 1, 2, "right");

const playerDisplay = document.querySelector("#currPlayer");

const boardOne = document.querySelector("#boardOne");
const boardTwo = document.querySelector("#boardTwo");

const game = {
  currPlayer: playerOne,
  winner: false,
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
    player.board.receiveAttack(x, y);
  },
  loadCoveredBoard() {
    let enemy;
    let enemyBoard;
    let currBoard;
    if (this.currPlayer === playerOne) {
      enemy = playerTwo;
      enemyBoard = boardTwo;
      currBoard = boardOne;
    } else {
      enemy = playerOne;
      enemyBoard = boardOne;
      currBoard = boardTwo;
    }
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
            tile.textContent = enemy.board.ships
              .at(enemy.board.coords.get(`${i}, ${j}`).mark)
              .type.charAt(0)
              .toUpperCase();
          }
          if (enemy.board.areSunk()) {
            this.winner = this.currPlayer;
            this.loadBoard(playerOne, boardOne);
            this.loadBoard(playerTwo, boardTwo);
            this.displayWinner();
            return;
          }
          this.currPlayer = enemy;
          this.loadCoveredBoard();
        });
        enemyBoard.appendChild(tile);
      }
    }
  },
  play() {
    if (this.currPlayer === playerOne) {
      this.loadBoard(this.currPlayer, boardOne);
      playerDisplay.textContent = "Current player: P1";
      this.loadCoveredBoard(boardTwo, playerTwo);
    } else {
      this.loadBoard(this.currPlayer, boardTwo);
      playerDisplay.textContent = "Current player: P2";
      this.loadCoveredBoard(boardOne, playerOne);
    }
  },
  displayWinner() {
    if (this.winner === playerOne) {
      playerDisplay.textContent = "P1 wins";
    } else {
      playerDisplay.textContent = "P2 wins";
    }
  },
};
game.loadBoard(playerOne, boardOne);
game.loadBoard(playerTwo, boardTwo);
game.play();
