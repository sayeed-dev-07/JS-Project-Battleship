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
        this.hitShots = [];
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
                return ;
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
            this.hitShots.push(index);
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
    // anyShipSank(){
    //     this.ships.forEach(ship => {
    //         if (ship.isSunk()) {
                
    //         }
    //     });
    // }
}
export class Player {
    constructor() {
        this.names = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
    }
    placeShip() {
        const board = this.board;
        board.board = new Array(100).fill(null);
        board.ships = [];
        let j = 5;
        for (let i = 0; i < 5; i++) {
            const name = this.names[i];
            const length = j;
            let placed = false;
            j--;

            while (!placed) {
                const direction = this.randomDirection();
                const max = 10 - length;
                const start = {
                    x: direction === 'hrz' ? this.randomNum(max) : this.randomNum(9),
                    y: direction === 'vrtx' ? this.randomNum(max) : this.randomNum(9),
                };

                const result = board.placeShip(name, start, length, direction);
                if (result === true) {
                    placed = true;
                }
            }
        }
    };
    randomDirection() {
        return Math.random() < 0.5 ? 'hrz' : 'vrtx';
    };
    randomNum(max = 10) {
        return Math.floor(Math.random() * max);
    };
    randomCordGen(index) {
        let b = Math.floor(index / 10);
        let a = index % 10;
        return { x: a, y: b };
    }
}

export class RealPlayer extends Player {
    constructor() {
        super();
        this.board = new GameBoard();
    }

    attackComputer(computer, indx) {
        let board = computer.board;
        let obj = this.randomCordGen(indx);
        if (!board.allShipSank()) {
            board.receiveAttack(obj);
        }
    }
    
}
export class Computer extends Player {
    constructor() {
        super();
        this.board = new GameBoard();
        this.attackedIndex = [];
    }
    
    attackHuman(person) {
        let board = person.board;
        let exists = true;
        if (!board.allShipSank()) {
            while (exists) {
                let randomIndex = Math.ceil(Math.random() * 100);
                if (!this.attackedIndex.includes(randomIndex)) {
                    this.attackedIndex.push(randomIndex);
                    let obj = this.randomCordGen(randomIndex);
                    board.receiveAttack(obj);
                    exists = false;
                }
            }
        }
    }

    
}
