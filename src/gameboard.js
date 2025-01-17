import Ship from "./ship";

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
  placeShip(type, coordsX, coordsY, direction) {
    let length;
    switch (type) {
      case "carrier":
        length = 5;
        break;
      case "battleship":
        length = 4;
        break;
      case "destroyer":
        length = 3;
        break;
      case "submarine":
        length = 3;
        break;
      case "patrolboat":
        length = 2;
        break;
    }
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
    if (directionCheck > 9 || directionCheck < -1) {
      return false;
    }
    switch (direction) {
      case "up":
        for (let i = 0; i < length; i++) {
          if (this.coords.get(`${coordsX}, ${coordsY + i}`).mark !== "X") {
            return false;
          }
        }
        this.ships.push(new Ship(type, length));
        for (let i = 0; i < length; i++) {
          this.coords.get(`${coordsX}, ${coordsY + i}`).mark =
            this.ships.length - 1;
          this.ships
            .at(this.ships.length - 1)
            .coords.push(`${coordsX}, ${coordsY + i}`);
        }
        break;
      case "down":
        for (let i = 0; i < length; i++) {
          if (this.coords.get(`${coordsX}, ${coordsY - i}`).mark !== "X") {
            return false;
          }
        }
        this.ships.push(new Ship(type, length));
        for (let i = 0; i < length; i++) {
          this.coords.get(`${coordsX}, ${coordsY - i}`).mark =
            this.ships.length - 1;
          this.ships
            .at(this.ships.length - 1)
            .coords.push(`${coordsX}, ${coordsY - i}`);
        }
        break;
      case "left":
        for (let i = 0; i < length; i++) {
          if (this.coords.get(`${coordsX - i}, ${coordsY}`).mark !== "X") {
            return false;
          }
        }
        this.ships.push(new Ship(type, length));
        for (let i = 0; i < length; i++) {
          this.coords.get(`${coordsX - i}, ${coordsY}`).mark =
            this.ships.length - 1;
          this.ships
            .at(this.ships.length - 1)
            .coords.push(`${coordsX - 1}, ${coordsY}`);
        }
        break;
      case "right":
        for (let i = 0; i < length; i++) {
          if (this.coords.get(`${coordsX + i}, ${coordsY}`).mark !== "X") {
            return false;
          }
        }
        this.ships.push(new Ship(type, length));
        for (let i = 0; i < length; i++) {
          this.coords.get(`${coordsX + i}, ${coordsY}`).mark =
            this.ships.length - 1;
          this.ships
            .at(this.ships.length - 1)
            .coords.push(`${coordsX + 1}, ${coordsY}`);
        }
        break;
    }
    return true;
  }
  receiveAttack(coordsX, coordsY) {
    if (this.coords.get(`${coordsX}, ${coordsY}`).hit === true) {
      return false;
    }
    if (this.coords.get(`${coordsX}, ${coordsY}`).mark !== "X") {
      this.ships.at(this.coords.get(`${coordsX}, ${coordsY}`).mark).hit();
    }
    this.coords.get(`${coordsX}, ${coordsY}`).hit = true;
    if (
      this.ships.at(this.coords.get(`${coordsX}, ${coordsY}`)).status === "sunk"
    ) {
      const shipCoords = this.ships.at(
        this.coords.get(`${coordsX}, ${coordsY}`)
      ).coords;
      shipCoords.forEach((coord) => {
        this.coords.get(coord).mark = "S";
      });
    }
    return true;
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

export default Gameboard;
