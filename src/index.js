/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import style from './style.css';
import { RealPlayer, Computer } from './app.js';

let player = new RealPlayer();
let computer = new Computer();

const grid1 = document.querySelector('.grid-1');
const grid2 = document.querySelector('.grid-2');

function gridCreate(obj, num){
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
function clearAllCell(cells){
    cells.forEach(cell => {
        if (cell.classList.contains('selected-cell')) {
            cell.classList.remove('selected-cell');
        }
    });
}

function placeShipDom(){
    
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

randomBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    clearAllCell(cell1);
    placeShipDom();
});


function attack(indx){

    player.attackComputer(computer, indx);
    computer.attackHuman(player);
    checkSink(player, 'Computer');
    checkSink(computer, 'Player');
    checkWin(player, 'Computer');
    checkWin(computer, 'Player');
    changeDom(indx);
}
function checkSink(arg, me){
    for (let i = 0; i < 5; i++) {
        let ship = arg.board.ships[i].ship;
        if (ship.isSunk()) {
            alert(`${me} sank the ${arg}'s ${ship.name}`);
        }
        
    }
}
function checkWin(arg, name){
    if (arg.board.allShipSank()) {
        alert(`${name} is winner`);
    }
}

function changeDom(){
    let computerHitShots = computer.board.hitShots;
    let computerMissShots = computer.board.missShot;
    let playerHitShots = player.board.hitShots;
    let playerMissShots = player.board.missShot;

    missShotsDom(computerMissShots, cell1);
    missShotsDom(playerMissShots, cell2);
    hitShostDom(computerHitShots, cell1);
    hitShostDom(playerHitShots, cell2);
}

function missShotsDom(arr, cell){
    arr.forEach(elem => {
        cell[elem].style.backgroundColor = 'crimson';
    });
}
function hitShostDom(arr, cell){
    arr.forEach(elem => {
        cell[elem].style.backgroundColor = 'rgba(24, 193, 24, 0.834)';
    });
}

grid2.addEventListener('click', (e)=>{
    let child = e.target;
    let arr = Array.from(cell2);
    let index = arr.indexOf(child);
    attack(index + 1);
    console.log('hello');
});