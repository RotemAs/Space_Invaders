'use strict';


const LASER_SPEED = 30;
var gHero = {
  pos: {
    i: 12,
    j: 5
  },
  isShoot: false,
 
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
  console.log('ev:', ev)
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

    }

  }
}
// Move the hero right (1) or left (-1) 
// function moveHero(dir) {} 
function moveHero(pos) {
  if (pos.j > gBoard.length - 1 || pos.j < 0) return;
  updateCell(gHero.pos, '');
  gHero.pos.i = pos.i;
  gHero.pos.j = pos.j;
  updateCell(pos, HERO);
}
// Sets an interval for shutting (blinking) the laser up towards aliens 
function shoot(pos) {
  console.log('shoot start pos', pos)
  if (gHero.isShoot) return;
  gHero.isShoot = true
  updateCell(pos, LASER);
  gLaserInterval = setInterval(function () {
    _blinkLaser(pos);
  }, LASER_SPEED );

}
// renders a LASER at specific cell for short time and removes it 
function _blinkLaser(pos) {
  var nextCell = getElCell({
    i: pos.i - 1,
    j: pos.j
  });
  if (pos.i === 0) {
    clearInterval(gLaserInterval);
    updateCell(pos, '');
    gHero.isShoot = false;
    return;
  }
  if (nextCell.innerText === ALIEN) {

    gGame.superMode = false;
    clearInterval(gLaserInterval);
    updateCell({
      i: pos.i - 1,
      j: pos.j
    }, '');
    updateCell(pos, '');
    gGame.aliensCount--;
    gScore += 10;
    renderScore(gScore)
    gameOver()
    gHero.isShoot = false;


    return;
  } else if (nextCell.innerText === STAR) {
    console.log('star hit');
    gPoints += 50;
    document.querySelector('.points').innerText = gPoints;
  }

  updateCell(pos, '');
  pos.i--;
  updateCell(pos, gGame.superMode ? SUPER_LASER : LASER);



}