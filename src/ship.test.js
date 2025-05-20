/* eslint-disable no-undef */
/* eslint-disable quotes */
import { Ship , GameBoard} from "./app.js";

let battleShip = new Ship(5);

describe('Ship Test', () => {
  
  test('should include 2', () => {
    expect(battleShip.length).toBe(5);
  });

  test('should return hits 1', () => {
    battleShip.hits();
    expect(battleShip.hitsNum).toBe(1);
  });
  test('should return hits 2', () => {
    battleShip.hits();
    expect(battleShip.hitsNum).toBe(2);
  });
  test('should return hits 3', () => {
    battleShip.hits();
    expect(battleShip.hitsNum).toBe(3);
  });
  test('should return true', () => {
    expect(battleShip.isSunkBol).toBe(false);
  });
});

