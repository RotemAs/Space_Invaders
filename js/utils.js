'use strict';

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
function createCell(gameObject = null) {
     return {
          type: SKY,
          gameObject: gameObject
     }
}


function getElCell(pos) {
     return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
}

function hide(selector) {
     document.querySelector(selector).classList.add('hide')
}

function show(selector) {
     document.querySelector(selector).classList.remove('hide')
}