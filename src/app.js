/* eslint-disable indent */

export class Ship {
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

    isSunk() {
        return this.hit >= this.length;
    }
}

export class GameBoard {
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
        position.forEach(index => {
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
        }else{
            let ship = this.board[index];
            ship.hit();
        }

    }
}
