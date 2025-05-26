/* eslint-disable no-empty */
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
    constructor() {
        this.names = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
    }
}

export class RealPlayer extends Player {
    constructor() {
        super();
        this.board = new GameBoard();
    }

    placeShip(name, start, length, direction) {
        return this.board.placeShip(name, start, length, direction);
    }
}
export class Computer extends Player {
    constructor() {
        super();
        this.board = new GameBoard();
        this.attackedIndex = [];
    }
    placeShip() {
        const board = this.board;
        let j = 5;
        for (let i = 0; i < 5; i++) {
            const name = this.names[i];
            const length = j;
            let placed = false;
            j--;

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
    attackHuman(board) {

        let exists = true;
        while (exists) {
            let randomIndex = Math.ceil(Math.random() * 100);
            if (!this.attackedIndex.includes(randomIndex)) {
                this.attackedIndex.push(randomIndex);
                let obj = this.#randomCordGen(randomIndex);
                board.receiveAttack(obj);
                exists = false;
            }
        }
    }
    #randomNum(max = 10) {
        return Math.floor(Math.random() * max);
    }

    #randomDirection() {
        return Math.random() < 0.5 ? 'hrz' : 'vrtx';
    }
    #randomCordGen(index) {
        let b = Math.floor(index / 10);
        let a = index % 10;
        return { x: a, y: b };
    }
}

let computer = new Computer();
let person = new RealPlayer();

computer.placeShip();
person.placeShip('rocket2', { x: 5, y: 2 }, 3, 'hrz');
person.placeShip('rocket', { x: 1, y: 2 }, 3, 'hrz');

computer.attackHuman(person.board.board);