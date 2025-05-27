/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import style from './style.css';
import { RealPlayer, Computer } from './app.js';

let player = new RealPlayer();
let computer = new Computer();

const grid1 = document.querySelector('.grid-1');
const grid2 = document.querySelector('.grid-2');

function gridCreate(obj){
    player.board.board.forEach(elem => {
    const element = document.createElement('div');
    element.classList.add('item');
    obj.appendChild(element);
});
}

gridCreate(grid1);
gridCreate(grid2);



// Here we will work with Dom 
