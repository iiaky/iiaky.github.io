window.script = {
    // scene 1 - case of []
    scene1: {
        ch1: {
            name: "The humans aren't in their best state right now...", // the actual name displayed
            description: "Tell him about the plague?", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "The humans are currently suffering through a plague-", name: "You" },
                { type: "stateChange", trust: -10 }
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "scene1_response",
            goTo: "scene2" // <-- can be what is logged in battlestate
        },
    
        ch2: {
            name: "Well...",
            description: "Tell him about the plague?",
            success: [
                { type: "textMessage", text: "The humans are currently suffering through a plague-", name: "You" },
                { type: "stateChange", trust: -10 }
            ],
            enemyAction: "scene1_response",
            goTo: "scene2" // need a way of differentiating paths
        }
    },

    //scene 2 - case of []

    scene2: {
        ch1: {
            name: "Doesn't that go against our purpose?", // the actual name displayed
            description: "To uphold the peace of the land?", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "It feels like we forgot our past.", name: "You"},
                { type: "textMessage", text: "I was talking to [name] earlier.", name: "You"},
                { type: "textMessage", text: "Do you remember the Crystal?", name: "You"},
                { type: "stateChange", trust: 5 },
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "scene2_response",
            goTo: "scene3" // <-- can be what is logged in battlestate
        },
    
        ch2: {
            name: "But what about our purpose?",
            description: "To uphold the peace of the land?",
            success: [
                { type: "textMessage", text: "It feels like we forgot our past.", name: "You"},
                { type: "textMessage", text: "I was talking to [name] earlier.", name: "You"},
                { type: "textMessage", text: "Do you remember the Crystal?", name: "You"},
                { type: "stateChange", trust: 5 },
            ],
            enemyAction: "scene2_response",
            goTo: "scene3" // need a way of differentiating paths
        }
    },

    scene3: {
        
        ch1: {
            name: "I was thinking maybe we could use the Crystal-",
            description: "Suggest the idea?",
            success: [
                { type: "textMessage", text: "We could use the Crystal-"},
                { type: "stateChange", trust: -10 },
            ],
            enemyAction: "scene3_response_usecrystal",
            goTo: "scene4" // need a way of differentiating paths
        },

        ch2: {
            name: "Could you tell me more?", // the actual name displayed
            description: "Learn more?", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "I feel so disconnected from our culture because of such high tensions between us and the humans."},
                { type: "textMessage", text: "How did you remember it?"},
                { type: "stateChange", trust: 5 }
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "scene3_response_learnculture",
            goTo: "scene5" // <-- can be what is logged in battlestate
        },
    },

    scene4: {
        
        ch1: {
            name: "Could you tell me more about the Crystal?",
            description: "Learn more?",
            success: [
                { type: "textMessage", text: "I feel so disconnected from our culture because of such high tensions between us and the humans."},
                { type: "textMessage", text: "How did you remember it?"},
                { type: "stateChange", trust: 5 }
            ],
            enemyAction: "scene3_response_learnculture",
            goTo: "scene5" // need a way of differentiating paths
        },

        ch2: {
            name: "Not exactly...", // the actual name displayed
            description: "Ask to cure the plague?", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "I was thinking we could use it to help the Humans."},
                { type: "textMessage", text: "Since they're suffering through a plague, it could cure them!"},
                { type: "stateChange", trust: -5 }
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "scene4_response_wtf",
            goTo: "scene6" // <-- can be what is logged in battlestate
        },
    },

    scene5: {
        
        ch1: {
            name: "Would you consider helping the Humans?",
            description: "Learn more?",
            success: [
                { type: "textMessage", text: "I was thinking we could use the Crystal to help the Humans."},
                { type: "textMessage", text: "Since they're suffering through a plague, it could cure them!"},
                { type: "stateChange", trust: -5 }
            ],
            enemyAction: "scene4_response_wtf",
            goTo: "scene6" // need a way of differentiating paths
        },

        ch2: {
            name: "Maybe the whole rivalry is a huge misunderstanding.", // the actual name displayed
            description: "It feels like we're drifting away from our ancestors the more this goes on...", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "I wish there was a peaceful way for us to resolve our conflicts."},
                { type: "textMessage", text: "Is war the only solution?"}
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "scene5_response_war",
            goTo: "scene6" // <-- can be what is logged in battlestate
        },
    },
    
    scene6: {
        
        ch1: {
            name: "Sometimes we have to make sacrifices!",
            description: "Ever heard of \"being the bigger blob?\"",
            success: [
                { type: "textMessage", text: "I was thinking we could use the Crystal to help the Humans."},
                { type: "textMessage", text: "Since they're suffering through a plague, it could cure them!"},
                { type: "stateChange", trust: -15 }
            ],
            enemyAction: "scene6_response_rage",
            goTo: "scene8" // need a way of differentiating paths
        },

        ch2: {
            name: "I understand", // the actual name displayed
            description: "But our ancestors believed in us", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "I understand how you feel, I'm angry at and terrified of them too."},
                { type: "textMessage", text: "But rage is blinding."},
                { type: "textMessage", text: "Our ancestors trusted us - they trusted that we could uphold the peace of the land."},
                { type: "textMessage", text: "Using the Crystal for our own, bloodthirsty benefit... wouldn't that be a betrayal to them?"},
                { type: "textMessage", text: "It's not what they would've wanted!"},
                { type: "stateChange", trust: 5 },
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "scene6_response_consideration",
            goTo: "scene7" // <-- can be what is logged in battlestate
        },
    },
    
    scene7: {
        
        ch1: {
            name: "Won't you give peace a chance?",
            description: "I'm sure that's what our ancestors would've wanted.",
            success: [
                { type: "textMessage", text: "Won't you give peace a chance?"},
                { type: "textMessage", text: "I'm sure that's what our ancestors would've wanted."},
                { type: "stateChange", trust: 100 }
            ],
            enemyAction: "",
            goTo: ""
        },

        ch2: {
            name: "I understand", // the actual name displayed
            description: "But our ancestors believed in us", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "I understand how you feel, I'm angry at and terrified of them too."},
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "",
            goTo: "" // <-- can be what is logged in battlestate
        },
    },
    
    scene8: {
        
        ch1: {
            name: "An eye for an eye...",
            description: "...makes the whole world blind.",
            success: [
                { type: "textMessage", text: "Going to war will only make things worse!"},
                { type: "textMessage", text: "I promise that we can end this in a peaceful way!"},
                { type: "stateChange", trust: -50 }
            ],
            enemyAction: "",
            goTo: ""
        },

        ch2: {
            name: "Can't you see that doing this will just cause problems?", // the actual name displayed
            description: "You're bordering on dangerous territory...", // some additional info displayed in text bar
            success: [ // what happens after
                { type: "textMessage", text: "Going to war will only make things worse!"},
                { type: "textMessage", text: "I promise that we can end this in a peaceful way!"},
                { type: "stateChange", trust: -50 }
            ], // the dialogue events (?) -- "success" in actions.js
            enemyAction: "",
            goTo: "" // <-- can be what is logged in battlestate
        },
    },

}

window.enemyScript = {
    scene1_response: { // the response after the player has submitted their submission - this is one dialogue ahead
        success: [
            { type: "textMessage", text: "A plague?! If that's true, then it's the prime opportunity to attack!", name: "King" },
            { type: "textMessage", text: "While they're still vulnerable!", name: "King" },
        ]
    },

    scene2_response: { // the response after the player has submitted their submission - this is one dialogue ahead
        success: [
            { type: "textMessage", text: "The Crystal..?", name: "King" },
            { type: "textMessage", text: "You're right, it's been so long, I almost forgot about that!", name: "King" },
            { type: "textMessage", text: "I remember when I was a little blob, walking into the cave for the first time.", name: "King" },
            { type: "textMessage", text: "I felt so connected to the spirits...", name: "King" },
        ]
    },

    scene3_response_usecrystal: {
        success: [
            { type: "textMessage", text: "Oh brililant!", name: "King" },
            { type: "textMessage", text: "For our war efforts, right?", name: "King" },
            { type: "textMessage", text: "With the Crystal, we'd be unkillable!", name: "King" },
        ]
    },

    scene3_response_learnculture: {
        success: [
            { type: "textMessage", text: "I was born into the midst of this rivalry.", name: "King" },
            { type: "textMessage", text: "In the early days, we still had hope that this could end peacefully.", name: "King" },
            { type: "textMessage", text: "Our anccestors believed in us, and the future.", name: "King" },
        ]
    },

    scene4_response_wtf: {
        success: [
            { type: "textMessage", text: "To help the Humans??", name: "King" },
            { type: "textMessage", text: "Why should we show them kindness?", name: "King" },
            { type: "textMessage", text: "Have they ever shown us sympathy?!", name: "King" },
            { type: "textMessage", text: "Did we deserve what they've done to us??", name: "King" },
        ]
    },

    scene5_response_war: {
        success: [
            { type: "textMessage", text: "A peaceful solution?", name: "King" },
            { type: "textMessage", text: "That option is long gone!", name: "King" },
            { type: "textMessage", text: "No, they ravenged our lands, murdered our blobs.", name: "King" },
            { type: "textMessage", text: "You weren't here to witness their atrocities, but it's still fresh in my mind!", name: "King" },
            { type: "textMessage", text: "They deserve none of our sympathy!", name: "King" },
        ]
    },

    scene6_response_consideration: {
        success: [
            { type: "textMessage", text: "But how can we just look past the heinous crimes they've committed against us?", name: "King" },
            { type: "textMessage", text: "That's disrespectful to all those that died before us!", name: "King" },
          
        ]
    },

    scene6_response_rage: {
        success: [
            { type: "textMessage", text: "That's absurd!", name: "King" },
            { type: "textMessage", text: "Do you have no regard to those that died before us?", name: "King" },
            { type: "textMessage", text: "Fighting against the Humans that have wronged us?", name: "King" },
            { type: "textMessage", text: "You're suggesting to help the people who stole, interrogated, tortured, and massacred our population.", name: "King" },
            { type: "textMessage", text: "In the name of \"peace?\"", name: "King" },
            { type: "textMessage", text: "Peace is long gone!", name: "King" },
        ]
    }
}