import Gameboard from "./gameboard";

class Player {
  constructor(type) {
    this.type = type;
    this.board = new Gameboard();
  }
}

export default Player;
