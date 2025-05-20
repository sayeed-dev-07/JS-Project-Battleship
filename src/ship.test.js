/* eslint-disable no-undef */
/* eslint-disable quotes */
import { Ship , GameBoard} from "./app.js";

describe('Ship class', () => {
  test('initial ship is not sunk', () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
  });

  test('ship records hits correctly', () => {
    const ship = new Ship(2);
    ship.hits();
    expect(ship.isSunk()).toBe(false);
    ship.hits();
    expect(ship.isSunk()).toBe(true);
  });

  test('ship cannot be over-hit', () => {
    const ship = new Ship(1);
    ship.hits(); // hitss = 1
    ship.hits(); // should do nothing
    ship.hits(); // still nothing
    expect(ship.isSunk()).toBe(true);
  });

  test('ship with length 0 is instantly sunk (edge case)', () => {
    const ship = new Ship(0);
    expect(ship.isSunk()).toBe(true);
  });
});