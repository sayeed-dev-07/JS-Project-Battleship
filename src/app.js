/* eslint-disable indent */

class Ship {
    constructor(length, name) {
        this.name = name;
        this.length = length;
        this.hit = 0;
    }
    hits() {
        if (!this.isSunk()) {
            this.hit++;
        }
    }
    getHits(){
        return this.hit;
    }
    isSunk() {
        return this.hit >= this.length;
    }
}

class GameBoard {
    constructor() {
        this.board = new Array(100).fill(null);
        this.ships = [];
        this.missShot = [];
    }
    placeShip(name, start, length, direction = 'hrz') {
        const position = [];
        const ship = new Ship(length, name);
        for (let i = 0; i < length; i++) {
            let x = start.x;
            let y = start.y;

            if (direction === 'hrz') {
                x = start.x + i;
            } else if (direction === 'vrtx') {
                y = start.y + i;
            } else {
                return 'invalid direction';
            }

            if (x >= 10 || y >= 10) {
                return 'Index out of bounds';
            }
            const index = y * 10 + x;

            if (this.board[index] !== null) {
                return 'overlap';
            }

            position.push(index);
        }
        position.forEach((index) => {
            this.board[index] = ship;
        });
        this.ships.push({ ship, position });
        return true;
    }
    receiveAttack(obj) {
        let x = obj.x;
        let y = obj.y;
        if (x >= 10 || y >= 10) {
            return 'Index out of bounds';
        }
        const index = y * 10 + x;
        if (this.board[index] === null) {
            this.missShot.push(index);
            this.board[index] = 'miss';
            return false;
        } else {
            let ship = this.board[index];
            ship.hits();
        }
    }
}

let test = new GameBoard();

test.placeShip('rocket', { x: 2, y: 1 }, 3, 'hrz');
test.receiveAttack({ x: 3, y: 1 });
test.receiveAttack({ x: 2, y: 1 });
test.receiveAttack({ x: 4, y: 1 });
test.receiveAttack({ x: 5, y: 1 });

let ship = test.ships[0];
console.log(ship.ship.hit);
console.log(ship.ship.isSunk());
console.log(test.missShot);
console.log(test.board);