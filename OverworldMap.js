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
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(20) - cameraPerson.x,
            utils.withGrid(11) - cameraPerson.y);
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(20) - cameraPerson.x,
            utils.withGrid(11) - cameraPerson.y);
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
            await eventHandler.init();
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
            this.startCutscene(match.talking[0].events); // passes in multiple events, the startCutscene method will iterate through all of them
        }
    }

    checkForFootstepCutscene() { // this is any interaction with a space in the world
        const player = this.gameObjects["player"];
        const match = this.cutsceneSpaces[ `${player.x}, ${player.y}`]
        if (!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events); // passes in multiple events, the startCutscene method will iterate through all of them
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
        backgroundSrc: "images/maps/test map bg.png", 
        lowerSrc: "images/maps/test map.png",
        upperSrc: "images/maps/test map upper.png",
        gameObjects: {
            player: new Player({
                x: utils.withGrid(20),
                y: utils.withGrid(10),
                useShadow: true,
                isPlayerControlled: true
               }),

            breadBlob: new Player({
                x: utils.withGrid(5),
                y: utils.withGrid(5),
                src: "images/characters/bread blob.png",
                useShadow: true,
                behaviorLoop: [ // defining a behaviorLoop - occurs when nothing global is happening in the scene
                    { type: "walk", direction: "left" },
                    { type: "stand", direction: "down", time: 800 },
                    { type: "walk", direction: "right" },
                    { type: "stand", direction: "down", time: 800 },
                ],
                talking: [
                    { // this is the match.talking[0] - the first object in here
                        events: [
                            { type: "textMessage", text: "HEY BESTIE", facePlayer: "breadBlob" }, // the id of the blob that should face the player
                            { type: "textMessage", text: "WANT A BREAD ????" },
                            { who: "player", type: "walk", direction: "left"},
                            { who: "player", type: "walk", direction: "left"},
                            { who: "player", type: "stand", direction: "right"},
                            { type: "textMessage", text: "NO ?!??!?" }
                        ]
                    },
                    // later on in the game, they can say something else
                    {
                        events: [
                            { type: "textMessage", text: "nvm i hate u go away" }
                        ]
                    },
                ]
            })
        }, // end of gameObjects array
        walls: {
            // trunk
            [utils.asGridCoord(24, 8)] : true, // use [] to make a dynamic key - 
            [utils.asGridCoord(23, 8)] : true, // if you don't know what exactly the key is going to be
            [utils.asGridCoord(25, 9)] : true, // it'll evaluate to a string ;
            [utils.asGridCoord(24, 9)] : true, // 12, 4.5 is the location on the map
            [utils.asGridCoord(23, 9)] : true, // x 2 because i fricked up the map coords thing
            

            //river
            [utils.asGridCoord(16, 0)] : true,
            [utils.asGridCoord(15, 1)] : true,
            [utils.asGridCoord(14, 2)] : true,
            [utils.asGridCoord(13, 3)] : true,
            [utils.asGridCoord(12, 4)] : true,
            [utils.asGridCoord(11, 4)] : true,
                [utils.asGridCoord(12, 10)] : true,
                [utils.asGridCoord(10, 10)] : true,
                [utils.asGridCoord(8, 10)] : true,
            [utils.asGridCoord(8, 8)] : true,
            [utils.asGridCoord(6, 8)] : true,
            [utils.asGridCoord(4, 8)] : true,
            [utils.asGridCoord(2, 10)] : true,
            [utils.asGridCoord(0, 12)] : true,

        },
        cutsceneSpaces: {
            [utils.asGridCoord(0, 2)] : [ // array of possible events that can happen when this space is stepped on
                {
                    events: [
                        { type: "changeMap", map: "path"},
                    ]
                }
            ]
        }

    }, // end of blobVillage
    
    path: {
        backgroundSrc: "images/maps/test map bg.png",
        lowerSrc: "images/maps/StreetLower.png",
        upperSrc: "images/maps/StreetUpper.png",
        gameObjects: {
            player: new Player({
                x: utils.withGrid(6),
                y: utils.withGrid(1),
                useShadow: true,
                isPlayerControlled: true
               }),

            cuteBlob: new Player({
                x: utils.withGrid(10),
                y: utils.withGrid(1),
                src: "images/characters/average cute blob.png",
                useShadow: true,
                talking: [
                    {
                        events: [
                            { who: "cuteBlob", type: "walk", direction: "left"},
                            { type: "textMessage", text: "heyao!", facePlayer: "cuteBlob" }
                        ]
                    }
                ]
            })
        } // end of gameObjects array
    }
}