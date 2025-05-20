/* eslint-disable indent */

export class Ship {
    constructor(length) {
        this.length = length;
        this.hitsNum = 0;
        this.isSunkBol = false;
    }
    hits(){
        this.isSunk();
        if (!this.isSunkBol) {
            this.hitsNum ++;
        }else{
            return ;
        }
        
    }

    isSunk(){
        if (this.length === this.hitsNum) {
            this.isSunkBol = true;
        }
    }
}

export class GameBoard{
    
    placeShip(){

    }
}
