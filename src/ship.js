class Ship {
  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.timesHit = 0;
    this.status = "alive";
    this.coords = [];
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

export default Ship;
