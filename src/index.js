import "./styles.css";
import Ship from "./ship";
import Gameboard from "./gameboard";

const board = new Gameboard();
console.log(board.placeShip(5, 3, 4, "up"));
console.log(board.placeShip(3, 1, 2, "down"));
console.log(board.placeShip(3, 3, 9, "left"));
console.log(board.ships);
console.log(board.coords);
console.log(board.receiveAttack(3, 4));
console.log(board.areSunk());
