'use strict'


    var  msgIsOn = false 

function messageSelect(messageNum) {
    var arrPlace;
    for (var i = 0; i < gMessages.length; i++) {
        if (gMessages[i].messageID === messageNum) {
            arrPlace = i
        }
    }
    show(".msg-bord")
        msgIsOn = true
    var el = document.querySelector(".msg-bord")
    el.innerHTML = gMessages[arrPlace].messageBudyEN
    el.style.backgroundColor = gMessages[arrPlace].backgroundColor
}


var gMessages = [{
    messageID: 1,
    messageBudyEN: 'Game Over!!!',
    backgroundColor: 'red',


},
{
    messageID: 2,
    messageBudyEN: 'you win the game  !! ',
    backgroundColor: 'green',
},
{
    messageID: 3,
    messageBudyEN: 'no more safe clicks ',
    backgroundColor: 'red',
},
{
    messageID: 4,
    messageBudyEN:`Welcome To The Spaceship Soldier ! 'SPACE': Shoot One Laser Every Time
        
    'RIGHT & LEFT KEYS': Move To The Sides
    
    'N' KEY: Activate Neighbors Mode
    
    'X' KEY: Super Hit - Alien And His Neighbors
    
    'F11': For Full Experience
    “Planet Earth Is Actually A Giant Spaceship Floating Through Space."`,
    backgroundColor: 'red',
},
{
    messageID: 5,
    messageBudyEN: 'Blow UP Neighbors Mode Is ON  ',
    backgroundColor: 'lightcoral',
},
{
messageID: 6,
messageBudyEN: 'Super Laser Mode Mode Is ON  ',
backgroundColor: 'lightcoral',
},



]
