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
    getHits() {
        return this.hit;
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
    allShipSank() {
        let isSunkAll = true;
        this.ships.forEach((elem) => {
            if (!elem.ship.isSunk()) {
                isSunkAll = false;
                return isSunkAll;
            }
        });
        return isSunkAll;
    }
}
export class Player {
    constructor(name) {
        this.name = name;
        this.board = new GameBoard();
        this.attacksMade = new Set(); // to prevent duplicate attacks
    }

    receiveAttack(coord) {
        return this.board.receiveAttack(coord);
    }

    allShipsSunk() {
        return this.board.allShipSank();
    }

    getBoard() {
        return this.board;
    }
}

export class RealPlayer extends Player {
    constructor(name) {
        super(name);
    }

    placeShip(name, start, length, direction) {
        return this.board.placeShip(name, start, length, direction);
    }

    attackEnemy(enemyPlayer, coord) {
        return enemyPlayer.receiveAttack(coord);
    }
}
export class Computer {
    constructor() {
        this.board = new GameBoard();
        this.names = ['a', 'b', 'c', 'd', 'e'];
        this.shipLengths = [5, 4, 3, 2, 1];
    }

    placeShip() {
        const board = this.board;

        for (let i = 0; i < this.shipLengths.length; i++) {
            const name = this.names[i];
            const length = this.shipLengths[i];
            let placed = false;

            while (!placed) {
                const direction = this.#randomDirection();
                const max = 10 - length;
                const start = {
                    x: direction === 'hrz' ? this.#randomNum(max) : this.#randomNum(9),
                    y: direction === 'vrtx' ? this.#randomNum(max) : this.#randomNum(9),
                };

                const result = board.placeShip(name, start, length, direction);
                if (result === true) {
                    placed = true;
                }
            }
        }
    }

    #randomNum(max = 10) {
        return Math.floor(Math.random() * max);
    }

    #randomDirection() {
        return Math.random() < 0.5 ? 'hrz' : 'vrtx';
    }
}
