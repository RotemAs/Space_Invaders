'use strict'


const msgData = [{   msgContentEN  :"you win the game"
    },
    {   msgContentEN  :`Welcome To The Spaceship Soldier ! 'SPACE': Shoot One Laser Every Time
        
        'RIGHT & LEFT KEYS': Move To The Sides
        
        'N' KEY: Activate Neighbors Mode
        
        'X' KEY: Super Hit - Alien And His Neighbors
        
        'F11': For Full Experience
        “Planet Earth Is Actually A Giant Spaceship Floating Through Space."`
    }
]

var  msgIsOn = false 



function renderMsg(content){
    show(".msg-bord")
    msgIsOn = true
    document.querySelector(".msg-bord").innerHTML = `<p>${content}</p>`
}