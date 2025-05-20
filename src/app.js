/* eslint-disable indent */

export class Ship {
    constructor(length) {
        this.length = length;
        this.hit = 0;
    }
    hits(){
        if (!this.isSunk()) {
            this.hit ++;
        }
    }

    isSunk(){
        return this.hit >= this.length;
    }
}

export class GameBoard{
    constructor(){
        this.board = new Array(100).fill(null) ;
        this.ships = [];
    }
    placeShip(){
        
    }
}
