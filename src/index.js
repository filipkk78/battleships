import "./styles.css";
import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";

const playerOne = new Player("human");
playerOne.board.placeShip("carrier", 3, 4, "up");
playerOne.board.placeShip("patrolboat", 1, 2, "down");
playerOne.board.placeShip("submarine", 3, 9, "left");
playerOne.board.placeShip("destroyer", 9, 0, "left");
playerOne.board.receiveAttack(3, 4);
playerOne.board.receiveAttack(3, 5);
playerOne.board.receiveAttack(3, 6);
playerOne.board.receiveAttack(3, 7);
playerOne.board.receiveAttack(3, 8);

const playerTwo = new Player("human");
playerTwo.board.placeShip("carrier", 3, 4, "up");
playerTwo.board.placeShip("destroyer", 1, 2, "down");
playerTwo.board.placeShip("submarine", 3, 9, "left");
playerTwo.board.placeShip("patrolboat", 0, 9, "left");

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    console.log(`${i}, ${j}, ${playerOne.board.coords.get(`${i}, ${j}`).mark}`);
  }
}
playerOne.board.areSunk();

const boardOne = document.querySelector("#boardOne");
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    if (playerOne.board.coords.get(`${i}, ${j}`).mark !== "X") {
      const type = playerOne.board.ships.at(
        playerOne.board.coords.get(`${i}, ${j}`).mark
      ).type;
      tile.textContent = type.charAt(0).toUpperCase();
      tile.classList.add(`${type}`);
    } else {
      tile.textContent = playerOne.board.coords.get(`${i}, ${j}`).mark;
    }
    boardOne.appendChild(tile);
  }
}

const boardTwo = document.querySelector("#boardTwo");
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    if (playerTwo.board.coords.get(`${i}, ${j}`).mark !== "X") {
      const type = playerTwo.board.ships.at(
        playerTwo.board.coords.get(`${i}, ${j}`).mark
      ).type;
      tile.textContent = type.charAt(0).toUpperCase();
      tile.classList.add(`${type}`);
    } else {
      tile.textContent = playerTwo.board.coords.get(`${i}, ${j}`).mark;
    }
    boardTwo.appendChild(tile);
  }
}
