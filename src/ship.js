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

export default Ship;
