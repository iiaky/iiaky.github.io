class OverworldMap {
    constructor(config) { // config takes from the overworldmap{} below
        this.gameObjects = config.gameObjects; //plural because multiple gameObjects will live in one scene
        this.walls = config.walls || {}; // keeps track of where all the "walls" // obstacles are on the map

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; //the "tiles"

        this.upperImage = new Image();
        this.upperImage.Src = config.upperSrc; //what is drawn over the character
    }

    // ** METHODS TO DRAW UPPER AND LOWER IMAGES AT DIFFERENT TIMES **
    drawLowerImage(ctx, cameraPerson) {
        // drawing @ offset - cameraPerson's position
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y);
    }

    isSpaceTaken(currentX, currentY, direction) { // checking if we can move to that space
        const {x, y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x}, ${y}`] || false; // looksup coords in "walls" object - if yes, will evaluate to true
    }
}

// an object of all of the maps in the game
window.OverworldMaps = {
    blobVillage : {
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObjects: {
            player: new Player({
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                useShadow: true,
                isPlayerControlled: true
               }),

            breadBlob: new Blobs({
                x: utils.withGrid(10),
                y: utils.withGrid(1),
                src: "images/characters/bread blob.png",
                useShadow: true
            })
        }, // end of gameObjects array
        walls: {
            [utils.asGridCoord(7,5)] : true, // use [] to make a dynamic key - 
            [utils.asGridCoord(8, 5)] : true, // if you don't know what exactly the key is going to be
            [utils.asGridCoord(7,6)] : true, // it'll evaluate to a string ;
            [utils.asGridCoord(8, 6)] : true, // 8,7 is the location on the map
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