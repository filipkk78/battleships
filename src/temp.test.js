const board = require("./temp.js");

test("coords check 1", () => {
  expect(board.coords.get("3, 4").mark).toBe(0);
});
test("coords check 2", () => {
  expect(board.coords.get("3, 5").mark).toBe(0);
});
test("coords check 3", () => {
  expect(board.coords.get("3, 6").mark).toBe(0);
});
test("coords check 4", () => {
  expect(board.coords.get("3, 7").mark).toBe(0);
});
test("coords check 5", () => {
  expect(board.coords.get("3, 8").mark).toBe(0);
});
test("are ships sunk", () => {
  expect(board.areSunk()).toBe(false);
});
test("did the attack reach the ship", () => {
  expect(board.ships.at(board.coords.get("3, 4").mark).status).toBe("sunk");
});
