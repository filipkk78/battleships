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

const game = {
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
  attack(player, playerBoard, x, y) {
    player.board.receiveAttack(x, y);
    loadBoard(player, playerBoard);
  },
  loadCoveredBoard(board) {
    while (board.firstChild) {
      board.removeChild(board.lastChild);
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = "";
        board.appendChild(tile);
      }
    }
  },
  playRound(player) {
    if (player === playerOne) {
      this.loadBoard(player, boardOne);
      playerDisplay.textContent = "Current player: P1";
      this.loadCoveredBoard(boardTwo);
    } else {
      this.loadBoard(player, boardTwo);
      playerDisplay.textContent = "Current player: P2";
      this.loadCoveredBoard(boardOne);
    }
  },
  playGame() {},
};

const boardOne = document.querySelector("#boardOne");
const boardTwo = document.querySelector("#boardTwo");
game.loadBoard(playerOne, boardOne);
game.loadBoard(playerTwo, boardTwo);

document.querySelector("footer").addEventListener("click", () => {
  game.playRound(playerOne);
});
document.querySelector("header").addEventListener("click", () => {
  game.playRound(playerTwo);
});
