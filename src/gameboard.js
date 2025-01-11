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
        this.ships.push(new Ship(length));
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
            return "Coords already occupied";
          }
        }
        this.ships.push(new Ship(length));
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
          if (this.coords.get(`${coordsX - 1}, ${coordsY}`).mark !== "X") {
            return "Coords already occupied";
          }
        }
        this.ships.push(new Ship(length));
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
          if (this.coords.get(`${coordsX - 1}, ${coordsY}`).mark !== "X") {
            return "Coords already occupied";
          }
        }
        this.ships.push(new Ship(length));
        for (let i = 0; i < length; i++) {
          this.coords.get(`${coordsX + i}, ${coordsY}`).mark =
            this.ships.length - 1;
          this.ships
            .at(this.ships.length - 1)
            .coords.push(`${coordsX + 1}, ${coordsY}`);
        }
        break;
    }
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
