class OverworldMap {
    constructor(config) { // config takes from the overworldmap{} below
        this.overworld = null;

        this.gameObjects = config.gameObjects; //plural because multiple gameObjects will live in one scene
        this.cutsceneSpaces = config.cutsceneSpaces || [];
        this.walls = config.walls || {}; // keeps track of where all the "walls" // obstacles are on the map

        this.backgroundImage = new Image();
        this.backgroundImage.src = config.backgroundSrc;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; //the "tiles"

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; //what is drawn over the character

        this.isCutscenePlaying = false;
        
        this.cameraPerson = config.cameraPerson;
    }

    // ** METHODS TO DRAW UPPER AND LOWER IMAGES AT DIFFERENT TIMES **
    drawBackground(ctx) {
        ctx.drawImage(
            this.backgroundImage,
            utils.withGrid(0),
            utils.withGrid(0));
    }

    drawLowerImage(ctx, cameraPerson) {
        // drawing @ offset - cameraPerson's position
        const x = this.cameraPerson ? utils.withGrid(20) - cameraPerson.x : 0;
        const y = this.cameraPerson ? utils.withGrid(11) - cameraPerson.y : 0;

        ctx.drawImage(
            this.lowerImage,
            x,
            y);
    }

    drawUpperImage(ctx, cameraPerson) {
        const x = this.cameraPerson ? utils.withGrid(20) - cameraPerson.x : 0;
        const y = this.cameraPerson ? utils.withGrid(11) - cameraPerson.y : 0;

        ctx.drawImage(
            this.upperImage,
            x,
            y);
    }
    

    isSpaceTaken(currentX, currentY, direction) { // checking if we can move to that space
        const {x, y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x}, ${y}`] || false; // looksup coords in "walls" object - if yes, will evaluate to true
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => { // get all of the gameObjects in this "map" (remember, the object of gameObjects defined below), and forEach of them, mount them
                                                     // this has been changes from .values to .keys in order to get their ids for puppeting
            // todo: determine if object is to be mounted or not
                // - ex: object is a key and we already picked it up.

            let object = this.gameObjects[key] // finding the gameObject based on the key - ex: player, breadBlob
            object.id = key; // key is how we defined them basically in the array below
                
            object.mount(this); //pass in a map to mount() in GameObject.js, which in this case is this file / this object
        });
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        // start a loop of async events, then await each one
        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            const result = await eventHandler.init(); // getting back some tag from the finished event (ex. battle lost)
            if (result === "LOST_BATTLE") {
                break; // will NOT move on to the next event (passed through in the dict in OverworldMaps)
            }
        }
        
        this.isCutscenePlaying = false;

        // reset npcs to their default behaviors
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this));
    }

    checkForActionCutscene() { // this is any interaction with a player / object
        const player = this.gameObjects["player"];
        const nextCoords = utils.nextPosition(player.x, player.y, player.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x}, ${object.y}` === `${nextCoords.x}, ${nextCoords.y}`
            // find an object where ^ this condition is true
            // returns an object - gameObject
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            
            // finding the most relevant cutscene based on the stoy flags we have completed so far
            const relevantScenario = match.talking.find(scenario => {
                return (scenario.required || []).every( sf => { // every() is an array function where each item in the array must pass some test
                    return playerState.storyFlags[sf] // finding the required flag in playerstate
                })
            }) 
            relevantScenario && this.startCutscene(relevantScenario.events); // passes in multiple events, the startCutscene method will iterate through all of them
        }
    }

    checkForFootstepCutscene() { // this is any interaction with a space in the world
        const player = this.gameObjects["player"];
        const match = this.cutsceneSpaces[ `${player.x}, ${player.y}`]
        if (!this.isCutscenePlaying && match) {

            // finding the most relevant cutscene based on the stoy flags we have completed so far
            const relevantScenario = match.find(scenario => {
                return (scenario.required || []).every( sf => {
                    return playerState.storyFlags[sf] // finding the required flag in playerstate
                })
            }) 
            relevantScenario && this.startCutscene(relevantScenario.events);
        }
    }
    
    addWall(x, y) {
        this.walls[`${x}, ${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x}, ${y}`];
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x, y} = utils.nextPosition(wasX, wasY, direction) // offset position
        this.addWall(x, y);  // adding a wall at the next (new curernt) position
    }
}

// an object of all of the maps in the game
window.OverworldMaps = {
    blobVillage : {
        cameraPerson: true,
        backgroundSrc: "images/maps/test map bg.png", 
        lowerSrc: "images/maps/test map.png",
        upperSrc: "images/maps/test map upper.png",
        gameObjects: {
            player: new Player({
                x: utils.withGrid(23), 
                y: utils.withGrid(10), 
                useShadow: true,
                isPlayerControlled: true
               }),

            breadBlob: new Player({
                x: utils.withGrid(10),
                y: utils.withGrid(5),
                src: "images/characters/bread blob.png",
                useShadow: true,
                behaviorLoop: [ // defining a behaviorLoop - occurs when nothing global is happening in the scene
                    { type: "stand", direction: "left", time: 800 },
                    { type: "stand", direction: "down", time: 800 },
                ],
                talking: [
                    // later on in the game, they can say something else
                    {
                        required: ["met_human", "visited_cave"],
                        events: [
                            { type: "textMessage", text: "The crystal can cure even the deadliest of diseases and the deepest wounds.", name: "Esther", facePlayer: "breadBlob"},
                            { type: "textMessage", text: "I fear what it might be used for...", name: "Esther", facePlayer: "breadBlob"},
                        ]
                    },
                    {
                        required: ["met_human"], // gives visited_cave
                        events: [
                            { type: "textMessage", text: "A healing slime condensate? You must mean the Crystal", name: "Esther", facePlayer: "breadBlob"},
                            { type: "textMessage", text: "You know about it? I thought it was just a myth.", name: "You" },
                            { type: "removeWall", x: 9, y: 5 },
                            { type: "textMessage", text: "Oh not at all. Come with me, let me show you something that's been long forgotten.", name: "Esther", facePlayer: "breadBlob"},
                            { type: "prologue", scene: "healing_cave" },
                            { type: "textMessage", text: "I forgot to ask, but what brought this up?", name: "Esther", facePlayer: "breadBlob"},
                            { type: "textMessage", text: "I probably shouldn’t cause worry before I speak to the King...", name: "You (thinking)"},
                            { type: "textMessage", text: "Oh nothing, I just overheard it from somewhere and thought I'd ask around.", name: "You"},
                            { type: "textMessage", text: "Hmm... okay", name: "Esther", facePlayer: "breadBlob"},
                            { type: "textMessage", text: "Well, take care then. I'll be happy to answer any more questions.", name: "Esther", facePlayer: "breadBlob"},
                            { type: "textMessage", text: "Keeping our culture alive is important.", name: "Esther", facePlayer: "breadBlob"},
                            { type: "addWall", x: 9, y: 5 },
                            { type: "addStoryFlag", flag: "visited_cave" }
                        ]
                    },
                    { // this is the match.talking[0] - the first object in here
                        events: [
                            { type: "textMessage", text: "I miss the olden days...", name: "Esther", facePlayer: "breadBlob" }, // the id of the blob that should face the player
                            { type: "textMessage", text: "where humans and blobs lived in peace.", name: "Esther" },
                            { type: "textMessage", text: "I remember playing dodgeball with the children...", name: "Esther" },
                            { type: "textMessage", text: "Oh, what I would give to bring those days back.", name: "Esther" },
                        ]
                    }
                ]
            }),

            king: new Player({
                x: utils.withGrid(28),
                y: utils.withGrid(15),
                src: "images/characters/king.png",
                useShadow: true,
                behaviorLoop: [ // defining a behaviorLoop - occurs when nothing global is happening in the scene
                    { type: "stand", direction: "up", time: 800 },
                    { type: "stand", direction: "right", time: 500 },
                    { type: "stand", direction: "down", time: 600 },
                    { type: "stand", direction: "left", time: 1000 },
                    { type: "stand", direction: "down", time: 600 },

                ],
                talking: [
                    // later on in the game, they can say something else
                    {
                        required: ["met_human", "visited_cave", "saw_flower"],
                        events: [
                            { type: "textMessage", text: "Oh hi! Could I ask you to retrieve the iron from the Mines?", name: "King" },
                            { type: "textMessage", text: "We’re a little short-blobbed right now, but all the Miners should be finished soon.", name: "King" },
                            { type: "textMessage", text: "Oh, I actually wanted to warn you that the Tribes are planning to invade in about a month.", name: "You" },
                            { type: "textMessage", text: "A month?!? How did you hear about this?", name: "King" },
                            { type: "textMessage", text: "I ran into a human on the path-", name: "You" },
                            { type: "textMessage", text: "On the path?! You know you’re not supposed to go alone! You could’ve been blob-napped!", name: "King" },
                            { type: "textMessage", text: "I know, but this human was nice! They want to stop this rivalry as much as we do!", name: "You" },
                            { type: "textMessage", text: "You should know to never trust them!", name: "King" },
                            { type: "textMessage", text: "They were on our land - who knows what they’ve been plotting!", name: "King" },
                            { type: "textMessage", text: "Regardless, it’d be good to speed up our war preparations, then.", name: "King" },
                            { type: "textMessage", text: "Uh oh…", name: "You (thinking)" },
                            { type: "textMessage", text: "I’ll notify everyone to prepare for war in a month.", name: "King" },
                            { type: "textMessage", text: "How can I convince him??", name: "You (internally screaming)" },
                            { type: "battle" },
                            { type: "end" }
                        ]
                    },
                    {
                        required: ["met_human", "visited_cave"],
                        events: [
                            { type: "textMessage", text: "The Crystal?", name: "King", facePlayer: "king" },
                            { type: "textMessage", text: "It's been so long... I should pay my visits to the Cave.", name: "King", facePlayer: "king" },
                            { type: "textMessage", text: "Actually, now that you mention it, maybe it could help us...", name: "King", facePlayer: "king" }
                        ]
                    },
                    {
                        required: ["met_human", "saw_flower"],
                        events: [
                            { type: "textMessage", text: "A plagued flower?", name: "King", facePlayer: "king" },
                            { type: "textMessage", text: "I wonder what that could mean...", name: "King", facePlayer: "king" },
                        ]
                    },
                    { // this is the match.talking[0] - the first object in here
                        events: [
                            { type: "textMessage", text: "We've been at war with the Tribes for 10 years now.", name: "King", facePlayer: "king" }, // the id of the blob that should face the player
                            { type: "textMessage", text: "If this continues... I fear what's to come.", name: "King", facePlayer: "king" }, // the id of the blob that should face the player
                            { type: "textMessage", text: "But we must avenge ourselves, our ancestors, our legacy, and our past.", name: "King", facePlayer: "king" }, // the id of the blob that should face the player
                            { type: "textMessage", text: "Let this war end with me!", name: "King", facePlayer: "king" }, // the id of the blob that should face the player
                        ]
                    }
                    
                ]
            }),
        }, // end of gameObjects array
        walls: {
            // trunk
            [utils.asGridCoord(24, 8)] : true, // use [] to make a dynamic key - 
            [utils.asGridCoord(23, 8)] : true, // if you don't know what exactly the key is going to be
            [utils.asGridCoord(25, 9)] : true, // it'll evaluate to a string ;
            [utils.asGridCoord(24, 9)] : true, // 12, 4.5 is the location on the map
            [utils.asGridCoord(23, 9)] : true, // x 2 because i fricked up the map coords thing

            // fences near trunk
            [utils.asGridCoord(22, 10)] : true,
            [utils.asGridCoord(24, 10)] : true,

            //river
            [utils.asGridCoord(15, 1)] : true,
            [utils.asGridCoord(14, 1)] : true,
            [utils.asGridCoord(13, 2)] : true,
            [utils.asGridCoord(12, 3)] : true,
            [utils.asGridCoord(11, 4)] : true,
                
            [utils.asGridCoord(10, 4)] : true,
            [utils.asGridCoord(9, 5)] : true,
            [utils.asGridCoord(8, 5)] : true,
            [utils.asGridCoord(7, 6)] : true,
            [utils.asGridCoord(6, 6)] : true,
            [utils.asGridCoord(5, 7)] : true,
            [utils.asGridCoord(4, 8)] : true,
            [utils.asGridCoord(3, 8)] : true,
            [utils.asGridCoord(2, 9)] : true,
            [utils.asGridCoord(1, 9)] : true,
            
            [utils.asGridCoord(1, 10)] : true,
            [utils.asGridCoord(1, 11)] : true,
            [utils.asGridCoord(1, 12)] : true,
            [utils.asGridCoord(1, 13)] : true,
            [utils.asGridCoord(1, 14)] : true,
            [utils.asGridCoord(2, 15)] : true,
            [utils.asGridCoord(3, 16)] : true,
            [utils.asGridCoord(4, 17)] : true,
            [utils.asGridCoord(5, 18)] : true,
            [utils.asGridCoord(6, 19)] : true,

            // fences
            [utils.asGridCoord(24, 18)] : true,
            [utils.asGridCoord(25, 19)] : true,
            [utils.asGridCoord(26, 20)] : true,
            [utils.asGridCoord(27, 20)] : true,
            [utils.asGridCoord(28, 20)] : true,
            [utils.asGridCoord(29, 20)] : true,
            [utils.asGridCoord(30, 20)] : true,
            [utils.asGridCoord(31, 20)] : true,
            [utils.asGridCoord(32, 20)] : true,
            [utils.asGridCoord(33, 20)] : true,
            [utils.asGridCoord(34, 20)] : true,
            [utils.asGridCoord(34, 20)] : true,
            [utils.asGridCoord(35, 19)] : true,
            [utils.asGridCoord(36, 18)] : true,
            [utils.asGridCoord(37, 17)] : true,
            [utils.asGridCoord(38, 16)] : true,
            [utils.asGridCoord(39, 15)] : true,
            [utils.asGridCoord(40, 14)] : true,
            [utils.asGridCoord(40, 13)] : true,
            [utils.asGridCoord(41, 12)] : true,
            [utils.asGridCoord(42, 11)] : true,
            [utils.asGridCoord(42, 10)] : true,
            [utils.asGridCoord(42, 9)] : true,
            [utils.asGridCoord(42, 8)] : true,
            [utils.asGridCoord(42, 7)] : true,
            [utils.asGridCoord(42, 6)] : true,
            [utils.asGridCoord(42, 5)] : true,
            [utils.asGridCoord(41, 4)] : true,
            [utils.asGridCoord(40, 3)] : true,
            [utils.asGridCoord(39, 2)] : true,
            [utils.asGridCoord(38, 1)] : true,
            [utils.asGridCoord(37, 1)] : true,
            [utils.asGridCoord(36, 1)] : true,
            [utils.asGridCoord(35, 1)] : true,
            [utils.asGridCoord(34, 1)] : true,
            [utils.asGridCoord(33, 1)] : true,
            [utils.asGridCoord(32, 0)] : true,
            [utils.asGridCoord(31, 0)] : true,
            [utils.asGridCoord(30, 0)] : true,
            [utils.asGridCoord(29, 0)] : true,
            [utils.asGridCoord(28, 0)] : true,
            [utils.asGridCoord(27, 0)] : true,
            [utils.asGridCoord(26, 0)] : true,
            [utils.asGridCoord(25, 0)] : true,
            [utils.asGridCoord(24, 0)] : true,
            [utils.asGridCoord(23, 0)] : true,
            [utils.asGridCoord(22, 1)] : true,
            [utils.asGridCoord(21, 1)] : true,
            [utils.asGridCoord(20, 1)] : true,
            [utils.asGridCoord(19, 1)] : true,
            [utils.asGridCoord(18, 1)] : true,
            [utils.asGridCoord(17, 1)] : true,
            [utils.asGridCoord(16, 1)] : true,
            [utils.asGridCoord(15, 1)] : true,

            [utils.asGridCoord(7, 19)] : true,
            [utils.asGridCoord(8, 19)] : true,
            [utils.asGridCoord(9, 19)] : true,
            [utils.asGridCoord(10, 19)] : true,
            [utils.asGridCoord(11, 20)] : true,
            [utils.asGridCoord(12, 20)] : true,
            [utils.asGridCoord(13, 20)] : true,
            [utils.asGridCoord(14, 20)] : true,
            [utils.asGridCoord(15, 20)] : true,
            [utils.asGridCoord(16, 20)] : true,
            [utils.asGridCoord(17, 21)] : true,
            [utils.asGridCoord(18, 22)] : true,
            [utils.asGridCoord(19, 22)] : true,
            [utils.asGridCoord(20, 22)] : true,
            [utils.asGridCoord(21, 22)] : true,
            [utils.asGridCoord(22, 22)] : true,
            [utils.asGridCoord(23, 21)] : true,
            [utils.asGridCoord(23, 19)] : true,
            [utils.asGridCoord(23, 18)] : true,
            

        },
        cutsceneSpaces: {
            [utils.asGridCoord(23, 20)] : [ // array of possible events that can happen when this space is stepped on
                {
                    events: [
                        { type: "changeMap", map: "path"},
                    ]
                }
            ],
            [utils.asGridCoord(23, 11)] : [
                {
                    required: ["village_start"],
                    events: [
                        { type: "textMessage", text: "A path? Careful, don't venture out too far..." },
                        { type: "textMessage", text: "Let's see what the King or Esther has to say." },
                        { type: "removeWall", x: 22, y: 10 },
                        { type: "removeWall", x: 24, y: 10 },
                        { type: "removeStoryFlag", flag: "village_start" },
                    ]
                }
            ]
        },
    }, // end of blobVillage
    
    path: {
        cameraPerson: false,
        backgroundSrc: "images/maps/test map bg.png",
        lowerSrc: "images/maps/path.png",
        upperSrc: "images/maps/path upper.png",
        gameObjects: {
            player: new Player({
                x: utils.withGrid(2), //2
                y: utils.withGrid(17), //17
                useShadow: true,
                isPlayerControlled: true
            }),

            star: new Star({
                x: utils.withGrid(30),
                y: utils.withGrid(16),
                src: "images/characters/star.png",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "A wilting flower." },
                            { type: "textMessage", text: "Around it, the plants look decayed..." },
                            { type: "textMessage", text: "...almost...plagued?" },
                            { type: "textMessage", text: "It reminds you of lavender." },
                            { type: "textMessage", text: "Perhaps you should take note of it." },
                            { type: "addStoryFlag", flag: "saw_flower" }
                        ]
                    }
                ]


            }),

            person: new Player({
                x: utils.withGrid(24),
                y: utils.withGrid(14),
                src: "images/characters/person.png",
                frameX: 32,
                frameY: 64,
                Yoffset: 32,
                useShadow: true,
                talking: [
                    {
                        required: ["met_human"],
                        events: [
                            { type: "textMessage", text: "Could you ask around about the healing condensate? Maybe it could help us.", name: "???", facePlayer: "person"}
                        ]
                    },
                    {
                        events: [
                            { type: "textMessage", text: "An unknown human..." }
                        ]
                    }
                ]
            })
        }, // end of gameObjects array
        walls: {
            [utils.asGridCoord(1, 17)] : true,
            [utils.asGridCoord(2, 16)] : true,
            [utils.asGridCoord(2, 18)] : true,
            [utils.asGridCoord(3, 15)] : true,
            [utils.asGridCoord(3, 19)] : true,
            [utils.asGridCoord(4, 15)] : true,
            
            [utils.asGridCoord(4, 19)] : true,
            [utils.asGridCoord(5, 19)] : true,
            [utils.asGridCoord(6, 19)] : true,
            [utils.asGridCoord(7, 19)] : true,
            [utils.asGridCoord(8, 19)] : true,
            [utils.asGridCoord(9, 19)] : true,
            [utils.asGridCoord(10, 19)] : true,
            [utils.asGridCoord(11, 19)] : true,
            [utils.asGridCoord(12, 20)] : true,
            [utils.asGridCoord(13, 20)] : true,
            [utils.asGridCoord(14, 20)] : true,
            [utils.asGridCoord(15, 20)] : true,
            [utils.asGridCoord(16, 21)] : true,
            [utils.asGridCoord(17, 21)] : true,
            [utils.asGridCoord(18, 21)] : true,
            [utils.asGridCoord(19, 21)] : true,
            [utils.asGridCoord(20, 21)] : true,
            [utils.asGridCoord(21, 21)] : true,
            [utils.asGridCoord(22, 21)] : true,
            [utils.asGridCoord(23, 21)] : true,
            [utils.asGridCoord(24, 21)] : true,
            [utils.asGridCoord(25, 21)] : true,
            [utils.asGridCoord(26, 21)] : true,
            [utils.asGridCoord(27, 21)] : true,
            [utils.asGridCoord(28, 21)] : true,
            [utils.asGridCoord(29, 21)] : true,
            [utils.asGridCoord(30, 21)] : true,
            [utils.asGridCoord(31, 21)] : true,
            [utils.asGridCoord(32, 20)] : true,
            [utils.asGridCoord(33, 20)] : true,
            [utils.asGridCoord(34, 20)] : true,
            [utils.asGridCoord(35, 19)] : true,
            [utils.asGridCoord(36, 18)] : true,
            [utils.asGridCoord(37, 18)] : true,
            [utils.asGridCoord(38, 18)] : true,
            [utils.asGridCoord(39, 18)] : true,
            [utils.asGridCoord(40, 17)] : true,
            [utils.asGridCoord(40, 16)] : true,

            [utils.asGridCoord(39, 15)] : true,
            [utils.asGridCoord(38, 15)] : true,
            [utils.asGridCoord(37, 15)] : true,
            [utils.asGridCoord(36, 15)] : true,
            [utils.asGridCoord(36, 15)] : true,
            [utils.asGridCoord(35, 15)] : true,
            [utils.asGridCoord(34, 16)] : true,
            [utils.asGridCoord(33, 16)] : true,
            [utils.asGridCoord(32, 16)] : true,
            [utils.asGridCoord(31, 16)] : true,
            [utils.asGridCoord(30, 16)] : true,
            [utils.asGridCoord(29, 17)] : true,
            [utils.asGridCoord(28, 17)] : true,
            [utils.asGridCoord(27, 17)] : true,
            [utils.asGridCoord(26, 17)] : true,
            [utils.asGridCoord(25, 18)] : true,
            [utils.asGridCoord(24, 18)] : true,
            [utils.asGridCoord(23, 18)] : true,
            [utils.asGridCoord(22, 18)] : true,
            [utils.asGridCoord(21, 18)] : true,
            [utils.asGridCoord(20, 18)] : true,
            [utils.asGridCoord(19, 18)] : true,
            [utils.asGridCoord(18, 18)] : true,
            [utils.asGridCoord(17, 18)] : true,
            [utils.asGridCoord(16, 18)] : true,
            [utils.asGridCoord(15, 18)] : true,
            [utils.asGridCoord(14, 18)] : true,
            [utils.asGridCoord(13, 17)] : true,
            [utils.asGridCoord(12, 17)] : true,
            [utils.asGridCoord(11, 16)] : true,
            [utils.asGridCoord(10, 16)] : true,
            [utils.asGridCoord(9, 16)] : true,
            [utils.asGridCoord(8, 16)] : true,
            [utils.asGridCoord(7, 16)] : true,
            [utils.asGridCoord(6, 16)] : true,
            [utils.asGridCoord(5, 15)] : true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(2, 17)] : [ // array of possible events that can happen when this space is stepped on
                {
                    events: [
                        { type: "changeMap", map: "blobVillage"},
                        { type: "addStoryFlag", flag: "met_human" }


                    ]
                }
            ],
            [utils.asGridCoord(3, 17)] : [
                {   
                    required: ["first_path"],
                    events: [
                        { type: "textMessage", text: "The overgrown path, stained with blood, remained untravelled for years." },
                        { type: "textMessage", text: "How daring of you to step foot; who knows what can lie in wait..." },
                        { who: "person", type: "walk", direction: "left"},
                        { who: "person", type: "stand", direction: "down"},
                        { type: "textMessage", text: "..." },
                        { type: "textMessage", text: "What's that shining object?" },
                        { type: "removeStoryFlag", flag: "first_path" }
                    ]
                }
            ],
            [utils.asGridCoord(15, 19)] : [
                {
                    required: ["second_path"],
                    events: [
                        { who: "person", type: "walk", direction: "left"},
                        { who: "person", type: "walk", direction: "left"},
                        { who: "person", type: "walk", direction: "left"},
                        { who: "person", type: "walk", direction: "left"},
                        { who: "person", type: "walk", direction: "left"},
                        { who: "person", type: "walk", direction: "down"},
                        { who: "person", type: "walk", direction: "down"},
                        { who: "person", type: "walk", direction: "down"},
                        { type: "removeWall", x: 18, y: 18 },
                        { who: "person", type: "walk", direction: "down"},
                        { who: "person", type: "walk", direction: "down"},
                        { type: "addWall", x: 18, y: 18 },
                        { type: "textMessage", text: "Hey! Stop in your tracks!!", name: "???", facePlayer: "person" },
                        { who: "player", type: "walk", direction: "left"},
                        { who: "player", type: "stand", direction: "right"},
                        { type: "textMessage", text: "Please listen to what I have to say, I promise it's urgent. I'm not here to hurt you!", name: "???", facePlayer: "person" },
                        { type: "textMessage", text: "Why would I trust you?", name: "You" },
                        { type: "textMessage", text: "Would this help convince you?", name: "???" },
                        { type: "textMessage", text: "The mysterious human hands you an official notice signed by their leader." },
                        { type: "textMessage", text: "The leader, all the tribes, actually, is planning to completely wipe your your kind in a month.", name: "???" },
                        { type: "textMessage", text: "Why are you doing this? What did we do to you?", name: "You" },
                        { type: "textMessage", text: "Truth be told, we've been affected by a terrible plague for the past few years.", name: "???" },
                        { type: "textMessage", text: "The tribe that settled closest to you caught it first - that's why the king was so convinced that the disease originated from your species.", name: "???" },
                        { type: "textMessage", text: "Then the leader caught word that you were hiding some secret healing condensate, and concldued that you guys must have purposefully gave them this disease.", name: "???" },
                        { type: "textMessage", text: "A healing condensate?? I've never heard of that before.", name: "You" },
                        { type: "textMessage", text: "It came from an urban legend, but it might be worth looking into.", name: "???" },
                        { type: "textMessage", text: "I have to go back now; I’ve been gone for too long.", name: "???" },
                        { type: "textMessage", text: "Could you ask around, maybe someone would know about it? Maybe it could help us.", name: "???" },
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "up"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "up"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "walk", direction: "right"},
                        { who: "person", type: "stand", direction: "left"},
                        { type: "textMessage", text: "...?", name: "You" },
                        { type: "removeStoryFlag", flag: "second_path" },
                        { type: "addStoryFlag", flag: "met_human" }
                    ]
                }
            ]
        }
    }
}