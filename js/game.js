'use strict';

const BOARD_SIZE = 14;

const HERO = '♆';
const ALIEN = '👽';
const LASER = '⤊';
const SUPER_MODE_LASER = '|^|'
const EMPTY = '';
const CHERRY = '🍒';
const SKY = 'sky';
const EARTH = 'earth';

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN} 
var gBoard;


var gGame = {
    isOn: false,
    aliensCount: 0,
    superMode: false,
    freezeIsON: true,
    neboSoot: false,
    superShootRemain: 3,
    lives: 3
}
var gLavel = [{
        speed: 3000,
        aliensRowLength: 4,
        aliensRowCount: 2

    },
    {
        speed: 1000,
        aliensRowLength: 8,
        aliensRowCount: 3
    },
    {
        speed: 500,
        aliensRowLength: 10,
        aliensRowCount: 4
    }

]
var gScore = 0
// Called when game loads 
function init() {
    gBoard = createBoard()
    console.log('gBoard', gBoard)
    renderBoard(gBoard)
    renderTopBar()

}
var gAlienMoveInterval;
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
function updateCell(pos, gameObject = 'Bad') {
    // console.log('updateCell \n pos',pos,' |gameObject',gameObject)
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject
    // || '';
}

var cheryInterval ;
function startGame() {
    gGame.isOn = true
    gGame.freezeIsON = false
    gAlienMoveInterval = setInterval(
        function () {
            if (!gGame.isOn || gGame.freezeIsON) return
            moveAliens()

        }, gAliens.alienSpeed);
cheryInterval =     setInterval(getCandys, 10000);
    // moveAliens()
}

function renderTopBar() {
    document.querySelector(".score").innerHTML = gScore
    document.querySelector(".super-shoot").innerHTML = gGame.superShootRemain
    document.querySelector(".lives").innerHTML = gGame.lives

}


// true = victory /false = lose 
function gameOver() {
    if (gGame.aliensCount === 0) {
        gGame.isOn = false
        messageSelect(2)
        show(".restart")
        return true
    }
}

function gameOver2(bool) {
    if (bool) {
        //lose
        gGame.isOn = false
        messageSelect(1)
        show(".restart")
        return true

    }
}




function restart() {
    gScore = 0
    gGame = {
        isOn: false,
        aliensCount: 0,
        superMode: false,
        freezeIsON: true,
        neboSoot: false,
        superShootRemain: 3,
        lives: 3
    }
    msgIsOn = false
    hide(".msg-bord")
    init()

}

function freeze() {
    if (gGame.freezeIsON) {

        gGame.freezeIsON = false
    } else {
        gGame.freezeIsON = true
        clearInterval()
    }
    console.log('freeze', gGame.freezeIsON)
}

function rules() {
    if (msgIsOn === true) {
        msgIsOn = false
        hide(".msg-bord")
    } else {
        // renderMsg(msgData[1].msgContentEN)
        messageSelect(4)
    }

}

function lavelOnClick(arryPlace) {
    gAliens.alienSpeed = gLavel[arryPlace].speed
    gAliens.aliensRowCount = gLavel[arryPlace].aliensRowCount
    gAliens.aliensRowLength = gLavel[arryPlace].aliensRowLength
        restart()
    }
// aliensRowLength: 4,
// aliensRowCount: 2

function getCandys(pos){
        var randLocation = getRowRandomEmptyCell(gBoard);
        if (!randLocation) return;
        updateCell({ i: randLocation.i, j: randLocation.j }, CHERRY);
        setTimeout(function () {
            updateCell({ i: randLocation.i, j: randLocation.j }, EMPTY);
        }, 5000);
    }