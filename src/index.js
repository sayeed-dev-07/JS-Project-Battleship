/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import style from './style.css';

import { Ship, RealPlayer, Computer } from './app.js';

let player = new RealPlayer();
let computer = new Computer();

const grid1 = document.querySelector('.grid-1');
const grid2 = document.querySelector('.grid-2');

function gridCreate(obj, num) {
    player.board.board.forEach(elem => {
        const element = document.createElement('div');
        element.classList.add(`item-${num}`);
        obj.appendChild(element);
    });
}

gridCreate(grid1, 1);
gridCreate(grid2, 2);



// Here we will work with Dom 

let randomBtn = document.querySelector('#random');

let cell1 = document.querySelectorAll('.item-1');
let cell2 = document.querySelectorAll('.item-2');
function clearAllCell(cells) {
    cells.forEach(cell => {
        if (cell.classList.contains('hit')) {
            cell.classList.remove('hit');
        }
        if (cell.classList.contains('miss')) {
            cell.classList.remove('miss');
        }
        if (cell.classList.contains('selected-cell')) {
            cell.classList.remove('selected-cell');
        }
    });
}

function placeShipDom() {

    player.placeShip();
    computer.placeShip();
    let cell1 = document.querySelectorAll('.item-1');
    let ships = player.board.ships;
    ships.forEach(ship => {
        let indexes = ship.position;
        indexes.forEach(indx => {
            cell1[indx].classList.add('selected-cell');
        });
    });
};
placeShipDom();

randomBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearAllCell(cell1);
    clearAllCell(cell2);
    placeShipDom();
});


function attack(indx) {

    let plrVal = player.attackComputer(computer, indx);
    let cmpVal;
    if (plrVal !== null) {
        cmpVal = computer.attackHuman(player);
    }

    return [plrVal, cmpVal];
    // checkSink(player, 'Computer');
    // checkSink(computer, 'Player');
    // checkWin(player, 'Computer');
    // checkWin(computer, 'Player');

}
function checkSink(arg, me) {
    for (let i = 0; i < 5; i++) {
        let ship = arg.board.ships[i].ship;
        if (ship.isSunk()) {
            alert(`${me} sank the ${arg}'s ${ship.name}`);
        } else {
            return false;
        }

    }
}
function checkWin(arg, name) {
    if (arg.board.allShipSank()) {
        alert(`${name} is winner`);
    } else {
        return false;
    }
}

function changeDom(indx, obj, bool) {
    if (obj === 'computer') {
        let ceil = cell1[indx];
        changeColorCell(indx, player, cell1, bool);
        
    }else if(obj === 'player'){
        let ceil = cell2[indx];
        changeColorCell(indx, computer, cell2, bool);
    }

};
function changeColorCell(index, boardObj, cells, bool) {
    const cell = cells[index];
    if (!cell) {return;} // ✅ prevent undefined error

    if (bool) {
        cell.classList.add('hit');
    } else {
        cell.classList.add('miss');
    }
}






// function changeDom(){

// }

grid2.addEventListener('click', (e) => {
    const child = e.target;

    if (!child.classList.contains('item-2')) {return;} // Only target grid items
    

    const cell2 = document.querySelectorAll('.item-2'); // or however you select them
    const arr = Array.from(cell2);
    const index = arr.indexOf(child);
    let [x, y] = attack(index);
    let cmpIndex = computer.attackedIndex[computer.attackedIndex.length - 1];
    // console.log(index + 1);
    changeDom(index, 'player', x);
    changeDom(cmpIndex, 'computer', y);
    
    console.log(player.board.ships); // If this is an empty array, no ships exist to hit

});