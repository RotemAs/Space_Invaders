'use strict';

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '♆';
const ALIEN = '👽';
const LASER = '⤊';
const EMPTY = '';
const STAR = '⭐';
const SKY = 'sky';
const EARTH = 'earth';

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN} 
var gBoard;
//  var gSuperMode = false
var gGame = {
    isOn: false,
    aliensCount: 0,
    superMode: false,
    freezeIsON: true
}
var gScore = 0
// Called when game loads 
function init() {
    gBoard = createBoard()
    console.log('gBoard', gBoard)
    renderBoard(gBoard)
    renderScore(gScore)
    
}
// Create and returns the board with aliens on top, ground at bottom 
// use the functions: createCell, createHero, createAliens 
function createBoard() {
    var board = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < BOARD_SIZE; j++) {
            var currCell = createCell(EMPTY);
            if (i === BOARD_SIZE - 1) currCell.type = EARTH;
            board[i][j] = currCell;
        }
    }
    createAliens(board);
    createHero(board);
    return board;
}

// Render the board as a <table> to the page
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var className = board[i][j].type === SKY ? 'sky' : 'earth';
            strHtml += `<td data-i="${i}" data-j="${j}"
            class="${className}">
                            ${board[i][j].gameObject}
                        </td>`;
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.game-container');
    elBoard.innerHTML = strHtml;
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

// position such as: {i: 2, j: 7} 
function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || '';
}

function startGame() {
    gGame.isOn = true
    gGame.freezeIsON =false
}

function renderScore(score) {
    document.querySelector(".score").innerHTML = score
}


// true = victory /false = lose 
function gameOver() {
    if (gGame.aliensCount === 0) {
        gGame.isOn = false
        renderMsg(msgData[0].msgContentEN)
        show(".restart")
        return true
    }
}

function restart(){
    gScore = 0
    gGame.superMode = false
    msgIsOn = false
    hide(".msg-bord")
    init()

}
function freeze(){
if(gGame.freezeIsON){
    gGame.freezeIsON =false
}else{
    gGame.freezeIsON = true
}
console.log('freeze',gGame.freezeIsON)
}

function rules() {
    if (msgIsOn === true) {
        msgIsOn = false
        hide(".msg-bord")
    } else {
        renderMsg(msgData[1].msgContentEN)
    }

}
