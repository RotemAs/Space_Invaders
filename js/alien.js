'use strict';


var gAliens = {
    alienSpeed: 950,
    aliensRowLength: 8,
    aliensRowCount: 3,
    gAliensTop: 0,
    gAliensBottom: 2,
    alienJStart: 0,
    alienJEnds: 7

};
var gIntervalAliensRight = null
var gIntervalAliensLeft = null

// moveAliens globals
var gAliensWay = 'right'
var lastgAliensWay = 'right'
// not have to be a global 
var oldCellContenet;

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
                // console.log('createAliens gAliens.aliensRowCount:',gAliens.aliensRowCount,' | Aliens.aliensRowLength',gAliens.aliensRowLength)
                board[i][j] = createCell(ALIEN);
                gGame.aliensCount++
            }
        }
    }

}

function handleAlienHit(pos) {}


// runs the interval for moving aliens side to side and down 
// it re-renders the board every time 
// when the aliens are reaching the hero row - interval stops 



function moveAliens() {


    // console.log('move alians start')
    // console.log('START moveAliens gAliensWay:', gAliensWay, 'lastgAliensWay', lastgAliensWay,'\n ',gAliens)
    switch (gAliensWay) {
        case 'right':
            shiftBoardRight(gBoard)
            console.log('moveAliens gAliensWay:', gAliensWay, 'lastgAliensWay', lastgAliensWay,'\n ',gAliens)
            break
        case 'down':
            shiftBoardDown(gBoard)
            console.log('moveAliens gAliensWay:', gAliensWay, 'lastgAliensWay', lastgAliensWay,'\n ',gAliens)
            break
        case 'Left':
            shiftBoardLeft(gBoard)
            console.log('moveAliens gAliensWay:', gAliensWay, 'lastgAliensWay', lastgAliensWay,'\n ',gAliens)
            break

    }
}




function shiftBoardRight(board) {
    lastgAliensWay = gAliensWay
    for (var i = gAliens.gAliensTop; i <= gAliens.gAliensBottom; i++) {
        for (var j = gAliens.alienJEnds; j >= gAliens.alienJStart; j--) {
            // console.log('test 500 i:', i, '|j:', j)
            oldCellContenet = gBoard[i][j].gameObject
            // console.log('oldCellContenet',oldCellContenet)
            // console.log('gBoard[i][j].gameObject',gBoard[i][j].gameObject)
            if (j === board.length - 1) {
                gAliensWay = 'down'
                
                return
            
            
            } else {
                updateCell({
                    i: i,
                    j: j
                }, EMPTY);

                updateCell({
                    i: i,
                    j: j + 1
                }, oldCellContenet);

            }
        }
        
    }
    gAliens.alienJStart++
    gAliens.alienJEnds++
    // console.log('shiftBoardRight ENDS ', 'gAliens.alienJEnds', gAliens.alienJEnds, 'gAliens.alienJStart', gAliens.alienJStart)
}


function shiftBoardDown() {
       for (var i = gAliens.gAliensBottom; i >= gAliens.gAliensTop; i--) {
        for (var j = gAliens.alienJEnds; j >= gAliens.alienJStart; j--) {
            oldCellContenet = gBoard[i][j].gameObject
            // console.log('shiftBoardDown  i:', i, '||j:', j)
            // console.log('shiftBoardDown  i:', i, '||j:', j, '\n OLDgAliensTopRow', OLDgAliensTopRow, 'OLDgAliensBottomRow', OLDgAliensBottomRow)
            if (i === gHero.pos.i - 1) {
                gameOver2(true);
                console.log('game over !!!')
                return;
                
            
            } else {
                updateCell({
                    i: i,
                    j: j
                }, EMPTY);

                updateCell({
                    i: i + 1,
                    j: j
                }, oldCellContenet);
            }


        }
    }
    gAliens.gAliensTop++
    gAliens.gAliensBottom++
    console.log(gAliens)

    lastgAliensWay === 'right' ? gAliensWay = 'Left' : gAliensWay = 'right'

   
}

function shiftBoardLeft(board) {
    lastgAliensWay = gAliensWay
    // console.log('shiftBoardLeft Start')
    // if (!gGame.isOn || gGame.freezeIsON) return;
    for (var i = gAliens.gAliensTop; i <= gAliens.gAliensBottom; i++) {
        //     for (var j = 0; j <= board.length - 1; j++) {
        for (var j = gAliens.alienJStart; j <= gAliens.alienJEnds; j++) {
            oldCellContenet = gBoard[i][j].gameObject
            
            if (j === 0) {
                gAliensWay = 'down'
                clearInterval(gIntervalAliensLeft);
                // moveAliens()
                return;
            
            } else {
                updateCell({
                    i: i,
                    j: j
                }, EMPTY);

                updateCell({
                    i: i,
                    j: j - 1
                }, oldCellContenet);
            }



        }
    }
    gAliens.alienJEnds--
    gAliens.alienJStart--
    // moveAliens()

    // console.log('shiftBoardLeft END')
    // renderBoard(gBoard)
}
