'use strict';


const LASER_SPEED = 80;
const SUPER_MODE_LASER_SPEED = 60;
var gHero = {
  pos: {
    i: 12,
    j: 5
  },
  isShoot: false,
  isSuperShoot: false,

};
var gLaserInterval;

// creates the hero and place it on board 
function createHero(board) {
  var i = gHero.pos.i;
  var j = gHero.pos.j;
  board[i][j].gameObject = HERO;
}
// Handle game keys 
function onKeyDown(ev) {
  // console.log('ev:', ev)
  if (gGame.isOn) {
    var i = gHero.pos.i
    var j = gHero.pos.j
    switch (ev.key) {
      case 'ArrowLeft':
        moveHero({
          i,
          j: j - 1
        });
        break;
      case 'ArrowRight':
        moveHero({
          i,
          j: j + 1
        });
        break;
      case ' ':
        shoot({
          i: i - 1,
          j
        })
        break
      case 'n':
        gGame.neboSoot = true;
        messageSelect(5)
        break;
      case 'x':
        // if (gHero.isShoot) return;
        // gHero.isShoot = true;
        messageSelect(6)
        gGame.superMode = true;
        


        // shoot({
        //   i: i - 1,
        //   j
        // });
        break;

    }

  }
}
// Move the hero right (1) or left (-1) 
// function moveHero(dir) {} 
function moveHero(pos) {
  if (pos.j > gBoard.length - 1 || pos.j < 0) return;
  updateCell({
    i: gHero.pos.i,
    j: gHero.pos.j
  }, EMPTY);
  gHero.pos.i = pos.i;
  gHero.pos.j = pos.j;
  updateCell(pos, HERO)

}
// Sets an interval for shutting (blinking) the laser up towards aliens 
function shoot(pos) {
  console.log('shoot start pos', pos)
  
  if (gGame.superMode) {
    if (gGame.superShootRemain === 0) {
      gGame.superMode = false;
      return
    }
    gLaserInterval = setInterval(function () {
      _blinkLaser(pos);
    }, SUPER_MODE_LASER_SPEED);
    // hide(".msg-bord")
    gHero.isShoot = true
    // freeze()
    gGame.superShootRemain--;
    renderTopBar()
  } else {
    if (gHero.isShoot) return;
    gHero.isShoot = true
    // freeze()
    gLaserInterval = setInterval(function () {
      _blinkLaser(pos);
    }, LASER_SPEED);
  }
  updateCell(pos, LASER)
console.log('Shoot alienSpeed',gAliens.alienSpeed)

}
// renders a LASER at specific cell for short time and removes it 
function _blinkLaser(pos) {
  if (pos.i === 0) {
    // console.log('pos.i === 0')
    updateCell(pos, EMPTY)
    clearInterval(gLaserInterval);
    gHero.isShoot = false;
    // freeze()
    return;
  
  } else {
    var nextCell = gBoard[pos.i - 1][pos.j].gameObject

  }
  if (nextCell === ALIEN) {
    if (gGame.neboSoot) {
      neboSoot(pos);
      gGame.neboSoot = false
      hide(".msg-bord")
    }
    if (gGame.superMode) {
      hide(".msg-bord")
      gGame.superMode = false
    }

    clearInterval(gLaserInterval);
    updateCell({
      i: pos.i - 1,
      j: pos.j
    }, EMPTY);
    updateCell({
      i: pos.i,
      j: pos.j
    }, EMPTY);

    gGame.aliensCount--;
    gScore += 10;
    renderTopBar()
    gameOver()
    gHero.isShoot = false;
    // freeze()



    return;
  }else if (nextCell === CHERRY){
    gScore+=50
    renderTopBar()
  }


  updateCell(pos, EMPTY);
  pos.i--;
  updateCell(pos, gGame.superMode ? SUPER_MODE_LASER : LASER);
  // if(gGame.superMode){
  //   // hide(".msg-bord")
  //   gGame.superMode = false
  // }



}

function neboSoot(pos) {
  var idx = pos.i;
  var jdx = pos.j;
  for (var i = idx - 1; i <= idx + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = jdx - 1; j <= jdx + 1; j++) {
      if (j < 0 || j >= gBoard[0].length) continue;
      if (i === idx && j === jdx) continue;
      if (gBoard[i][j].gameObject === ALIEN) {
        updateCell({
          i,
          j
        }, '');
        gGame.aliensCount--;
        gScore += 10;
      }
    }
  }
}