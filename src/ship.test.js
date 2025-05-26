/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
/* eslint-disable quotes */
import { Ship, GameBoard, Computer, RealPlayer } from "./app.js";

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
    expect(board.board[27]).not.toBeNull();
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
  test('place ship test - length', () => {

    const board = new GameBoard();
    const ship = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    expect(board.ships.length).toBe(2);
  });

  test('should store missShot ', () => {

    const board = new GameBoard();
    const ship = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    board.receiveAttack({ x: 2, y: 3 });
    expect(board.missShot.length).toBe(1);
    expect(board.missShot[0]).toBe(32);
  });

  test('should increase hits count when hits ', () => {

    const board = new GameBoard();
    const ship1 = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    board.receiveAttack({ x: 1, y: 2 });
    board.receiveAttack({ x: 2, y: 2 });

    expect(board.ships[0].ship.hit).toBe(2);
  });
  test('should increase hits count when hits and also sunk the ship when hits count equals the length', () => {

    const board = new GameBoard();
    const ship1 = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    board.receiveAttack({ x: 1, y: 2 });
    board.receiveAttack({ x: 2, y: 2 });
    board.receiveAttack({ x: 3, y: 2 });

    expect(board.ships[0].ship.hit).toBe(3);
    expect(board.ships[0].ship.isSunk()).toBe(true);
  });

});

describe('allShipSank Method Check : ', () => {

  test('should return true when all ships are sunk', () => {

    const board = new GameBoard();
    const ship1 = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    board.receiveAttack({ x: 1, y: 2 });
    board.receiveAttack({ x: 2, y: 2 });
    board.receiveAttack({ x: 3, y: 2 });
    board.receiveAttack({ x: 5, y: 2 });
    board.receiveAttack({ x: 6, y: 2 });
    board.receiveAttack({ x: 7, y: 2 });

    expect(board.allShipSank()).toBe(true);

  });

  test('should return false when all ships are not sunk', () => {

    const board = new GameBoard();
    const ship1 = board.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    const ship2 = board.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    board.receiveAttack({ x: 1, y: 2 });
    board.receiveAttack({ x: 2, y: 2 });
    board.receiveAttack({ x: 3, y: 2 });
    board.receiveAttack({ x: 5, y: 2 });
    board.receiveAttack({ x: 6, y: 2 });
    board.receiveAttack({ x: 7, y: 7 });

    expect(board.allShipSank()).toBe(false);

  });

});

describe('placeship check ', () => {

  test('should return 5 ships', () => {
    let computer = new Computer();
    computer.placeShip();
    let ships = computer.board.ships;
    expect(ships.length).toBe(5);

  });

});

describe('placeship check ', () => {

  test('missshot should return 2', () => {
    let computer = new Computer();
    let person = new RealPlayer();
    person.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
    person.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');
    computer.placeShip();
    person.board.receiveAttack({ x: 1, y: 2 });
    person.board.receiveAttack({ x: 2, y: 2 });
    computer.board.receiveAttack({ x: 5, y: 5 });
    expect(person.board.missShot.length).toBe(0);

  });

});