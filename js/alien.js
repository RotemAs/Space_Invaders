'use strict';

const ALIEN_SPEED = 500;
var gAliens = {
    alienSpeed: 500,
    aliensRowLength: 8,
    aliensRowCount: 3,
    gAliensTopRowIdx: 0,
    gAliensBottomRowIdx: 2,
};
var gIntervalAliens;
// The following two variables represent the part of the matrix (some rows) 
// that we should shift (left, right, and bottom) 
// We need to update those when: 
// (1) shifting down and (2) last alien was cleared from row 
var gAliensTopRowIdx;
var gAliensBottomRowIdx;

var gIsAlienFreeze = true;

function createAliens(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < gAliens.aliensRowLength; j++) {
            if (i < gAliens.aliensRowCount) {
                board[i][j] = createCell(ALIEN);
                gGame.aliensCount++
            }
        }
    }

}

function handleAlienHit(pos) {}

function shiftBoardRight(board, fromI, toI) {}

function shiftBoardLeft(board, fromI, toI) {}

function shiftBoardDown(board, fromI, toI) {}

// runs the interval for moving aliens side to side and down 
// it re-renders the board every time 
// when the aliens are reaching the hero row - interval stops 

function moveAliens() {}