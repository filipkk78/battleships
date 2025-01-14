class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.status = "alive";
  }
  isSunk() {
    if (this.timesHit === this.length) {
      this.status = "sunk";
    }
  }
  hit() {
    this.timesHit++;
    this.isSunk();
  }
}

class Gameboard {
  constructor() {
    this.coords = new Map();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.coords.set(`${i}, ${j}`, { mark: "X", hit: false });
      }
    }
    this.ships = [];
  }
  placeShip(length, coordsX, coordsY, direction) {
    let directionCheck;
    switch (direction) {
      case "up":
        directionCheck = coordsY + length - 1;
        break;
      case "down":
        directionCheck = coordsY - length - 1;
        break;
      case "left":
        directionCheck = coordsX - length - 1;
        break;
      case "right":
        directionCheck = coordsX + length - 1;
        break;
    }
    if (directionCheck > 9) {
      return "Invalid coords";
    }
    switch (direction) {
      case "up":
        for (let i = 0; i < length; i++) {
          if (this.coords.get(`${coordsX}, ${coordsY + i}`).mark !== "X") {
            return "Coords already occupied";
          }
        }
        for (let i = 0; i < length; i++) {
          this.coords.get(`${coordsX}, ${coordsY + i}`).mark =
            this.ships.length;
        }
        break;
      case "down":
        for (let i = 0; i < length; i++) {
          if (this.coords.get(`${coordsX}, ${coordsY - i}`).mark !== "X") {
            return "Coords already occupied";
          }
        }
        for (let i = 0; i < length; i++) {
          this.coords.get(`${coordsX}, ${coordsY - i}`).mark =
            this.ships.length;
        }
        break;
      case "left":
        for (let i = 0; i < length; i++) {
          if (this.coords.get(`${coordsX - 1}, ${coordsY}`).mark !== "X") {
            return "Coords already occupied";
          }
        }
        for (let i = 0; i < length; i++) {
          this.coords.get(`${coordsX - i}, ${coordsY}`).mark =
            this.ships.length;
        }
        break;
      case "right":
        for (let i = 0; i < length; i++) {
          if (this.coords.get(`${coordsX - 1}, ${coordsY}`).mark !== "X") {
            return "Coords already occupied";
          }
        }
        for (let i = 0; i < length; i++) {
          this.coords.get(`${coordsX + i}, ${coordsY}`).mark =
            this.ships.length;
        }
        break;
    }
    this.ships.push(new Ship(length));
  }
  receiveAttack(coordsX, coordsY) {
    if (this.coords.get(`${coordsX}, ${coordsY}`).hit === true) {
      return "This tile has already been hit";
    }
    this.coords.get(`${coordsX}, ${coordsY}`).hit = true;
    if (this.coords.get(`${coordsX}, ${coordsY}`).mark === "X") {
      return "You missed";
    }
    this.ships.at(this.coords.get(`${coordsX}, ${coordsY}`)).hit();
  }
  areSunk() {
    let temp = true;
    this.ships.forEach((ship) => {
      if (ship.status === "alive") {
        temp = false;
      }
    });
    if (temp === true) {
      return true;
    } else {
      return false;
    }
  }
}

class Player {
  constructor(type) {
    this.type = type;
    this.board = new Gameboard();
  }
}

const playerOne = new Player("human");
playerOne.board.placeShip(5, 3, 4, "up");
playerOne.board.placeShip(3, 1, 2, "down");
playerOne.board.placeShip(3, 3, 9, "left");
playerOne.board.receiveAttack(3, 4);
playerOne.board.receiveAttack(3, 5);
playerOne.board.receiveAttack(3, 6);
playerOne.board.receiveAttack(3, 7);
playerOne.board.receiveAttack(3, 8);
playerOne.board.areSunk();
module.exports = playerOne.board;
