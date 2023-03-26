window.script = {
    // scene 1 - case of []
    scene1: {
        ch1: {
            name: "some descriotion here", // the actual name displayed
            description: "yessir", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "u eat bread", name: `${utils.user.name}`},
                { type: "textMessage", text: "they happy!", name: `${utils.user.name}`},
                { type: "stateChange", trust: 10 }
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "s2yes",
            goTo: "scene2" // <-- can be what is logged in battlestate
        },
    
        ch2: {
            name: "choice 2",
            description: "im so good at this. send help :D",
            success: [
                { type: "textMessage", text: "u leave w deep regret"},
                { type: "stateChange", trust: -10 }
            ],
            enemyAction: "s2no",
            goTo: "scene3" // need a way of differentiating paths
        }
    },

    //scene 2 - case of []

    scene2: {
        ch1: {
            name: "choice 3", // the actual name displayed
            description: "im gonna lose it", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "friendship ++", name: utils.user.name},
                { type: "textMessage", text: "yaya", name: utils.user.name},
                { type: "stateChange", trust: 10 }
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "s2yes",
            goTo: "scene2" // <-- can be what is logged in battlestate
        },
    
        ch2: {
            name: "choice 4",
            description: "",
            success: [
                { type: "textMessage", text: "slap em in the face"},
                { type: "stateChange", trust: -10 }
            ],
            enemyAction: "s2no",
            goTo: "scene3" // need a way of differentiating paths
        }
    },

    scene3: {
        ch1: {
            name: "choice 6", // the actual name displayed
            description: "fuck", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "fshit ur "},
                { type: "textMessage", text: "ffasdf"},
                { type: "stateChange", trust: 10 }
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "s2yes",
            goTo: "scene2" // <-- can be what is logged in battlestate
        },
    
        ch2: {
            name: "choice 7",
            description: "",
            success: [
                { type: "textMessage", text: "fdasfsdfsd"},
                { type: "stateChange", trust: -10 }
            ],
            enemyAction: "s2no",
            goTo: "scene3" // need a way of differentiating paths
        }
    },

}

window.enemyScript = {
    s2yes: { // the response after the player has submitted their submission - this is one dialogue ahead
        success: [
            { type: "textMessage", text: "hihi!", name: "king" },
        ]
    },

    s2no: { // the response after the player has submitted their submission - this is one dialogue ahead
        success: [
            { type: "textMessage", text: "nono!" },
        ]
    }
}