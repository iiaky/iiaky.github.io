class OverworldMap {
    constructor(config) { // config takes from the overworldmap{} below
        this.gameObjects = config.gameObjects; //plural because multiple gameObjects will live in one scene
        this.walls = config.walls || {}; // keeps track of where all the "walls" // obstacles are on the map

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; //the "tiles"

        this.upperImage = new Image();
        this.upperImage.Src = config.upperSrc; //what is drawn over the character

        this.isCutscenePlaying = false;
    }

    // ** METHODS TO DRAW UPPER AND LOWER IMAGES AT DIFFERENT TIMES **
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
            utils.withGrid(20.5) - cameraPerson.x,
            utils.withGrid(11.5) - cameraPerson.y);
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
        lowerSrc: "images/maps/test map.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObjects: {
            player: new Player({
                x: utils.withGrid(0),
                y: utils.withGrid(0),
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
                ]
            })
        }, // end of gameObjects array
        walls: {
            [utils.asGridCoord(3, 2)] : true, // use [] to make a dynamic key - 
            [utils.asGridCoord(2, 3)] : true, // if you don't know what exactly the key is going to be
            [utils.asGridCoord(1, 2)] : true, // it'll evaluate to a string ;
            [utils.asGridCoord(2, 1)] : true, // 8,7 is the location on the map
            [utils.asGridCoord(6, 5)] : true,
            [utils.asGridCoord(6, 6)] : true // thinking about making each map pixel 32 (so then it would be *32 maybe instead of *16 when scaling)
        }

    }, // end of blobVillage
    
    path: {
        lowerSrc: "images/maps/StreetLower.png",
        upperSrc: "images/maps/StreetUpper.png",
        gameObjects: {
            player: new GameObject({
                x: 6,
                y: 1,
                useShadow: true,
                isPlayerControlled: true
               }),

            cuteBlob: new Blobs({
                x: 10,
                y: 1,
                src: "images/characters/average cute blob.png",
                useShadow: true
            })
        } // end of gameObjects array
    }
}