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

function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min) + min);
}

function getRowRandomEmptyCell(board) {
     var currEmptyCells = CheckEmptyCellsFirstRow(board);
     var currIdx = getRandomInt(0, currEmptyCells.length - 1);
     return currEmptyCells[currIdx];
}

function CheckEmptyCellsFirstRow(board) {
     var emptyCells = [];
     for (var i = 0; i === 0 ; i++) {
          for (var j = 0; j < board[i].length; j++) {
               if (board[i][j].gameObject === EMPTY) {
                    emptyCells.push({
                         i,
                         j
                    });
               }
          }
     }

     return emptyCells;
}

// not active yet 