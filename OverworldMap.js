class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects; //plural because multiple gameObjects will live in one scene

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; //the "tiles"

        this.upperImage = new Image();
        this.upperImage.Src = config.upperSrc; //what is drawn over the character
    }

    // ** METHODS TO DRAW UPPER AND LOWER IMAGES AT DIFFERENT TIMES **
    drawLowerImage(ctx, x, y) {
        ctx.drawImage(this.lowerImage, x, y);
    }

    drawUpperImage(ctx, x, y) {
        ctx.drawImage(this.upperImage, x, y);
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
                useShadow: true
               }),

            breadBlob: new Blobs({
                x: utils.withGrid(10),
                y: utils.withGrid(1),
                src: "images/characters/bread blob.png",
                useShadow: true
            })
        } // end of gameObjects array
    }, // end of blobVillage
    
    path: {
        lowerSrc: "images/maps/StreetLower.png",
        upperSrc: "images/maps/StreetUpper.png",
        gameObjects: {
            player: new GameObject({
                x: 6,
                y: 1,
                useShadow: true
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