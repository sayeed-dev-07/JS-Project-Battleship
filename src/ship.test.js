/* eslint-disable no-unused-vars */
 
/* eslint-disable no-undef */
/* eslint-disable quotes */
import { Ship, GameBoard } from "./app.js";

describe('Ship class', () => {
  test('initial ship is not sunk', () => {
    const ship = new Ship(3, 'rocket');
    expect(ship.isSunk()).toBe(false);
  });

  test('ship records hits correctly', () => {
    const ship = new Ship(2, 'rocket');
    ship.hits();
    expect(ship.isSunk()).toBe(false);
    ship.hits();
    expect(ship.isSunk()).toBe(true);
  });

  test('ship cannot be over-hit', () => {
    const ship = new Ship(1, 'rocket');
    ship.hits(); // hitss = 1
    ship.hits(); // should do nothing
    ship.hits(); // still nothing
    expect(ship.isSunk()).toBe(true);
  });

  test('ship with length 0 is instantly sunk (edge case)', () => {
    const ship = new Ship(0, 'rocket');
    expect(ship.isSunk()).toBe(true);
  });
});

describe('GameBoard Class', () => {

  test('Places a ship incorrectly - 1', () => {
    const board = new GameBoard();
    const ship = board.placeShip('rocket', { x: 12, y: 2 }, 3, 'hrz');

    expect(ship).toBe('Index out of bounds');
  });

  test('Places a ship incorrectly - 2', () => {
    const board = new GameBoard();
    const ship = board.placeShip('rocket', { x: 12, y: 2 }, 3, 'horizontal');
    expect(ship).toBe('invalid direction');
  });

  test('Places a ship on another one', () => {
    const board = new GameBoard();
    const ship = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 3, y: 2 }, 3, 'hrz');
    expect(ship2).toBe('overlap');
  });

  test('board equiped index not be null', () => {
    const board = new GameBoard();
    const ship = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    expect(board.board[27]).toBeNull();
  });
});

describe('Receive Attack Method Check : ', () => {

  test('out of bounds index attack - 1', () => {

    const board = new GameBoard();
    const ship = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    expect(board.receiveAttack({ x: 12, y: 2 })).toBe('Index out of bounds');
    expect(board.receiveAttack({ x: 2, y: 3 })).toBe(false);
  });

  test('miss shot  - 1', () => {

    const board = new GameBoard();
    const ship = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    expect(board.receiveAttack({ x: 2, y: 3 })).toBe(false);
  });

});
