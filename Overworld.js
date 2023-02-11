class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        // drawing (copying) the map pixel data (from the image) onto the canvas
        
        // ** MAP LOADING **
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        }
        image.src = "images/maps/DemoLower.png";
    
        // ** player and shadow location coords **
        const x = 1; // in terms of actual map pixels
        const y = 4


        // ** PLAYER SHADOW LOADING**
        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                // parameters are a copy of player, look at player's parameter notes
                shadow, 
                0,
                0, 
                32,
                32,
                x * 16 - 8, y * 16 - 18,
                32, 32
                );
        }
        shadow.src = "images/characters/shadow.png";

        // ** PLAYER LOADING **
   

        const player = new Image();
        player.onload = () => {
            //drawing image and splitting spritesheet
            this.ctx.drawImage(
                player, 
                0, //left start cut
                0, // top start cut
                32, // right stop cut (width)
                32, // bottom stop cut (height)
                x * 16 - 8, y * 16 - 18, // player position, * 16 compensates for the grid, -8 & -18 because the spirite is a tad off center, probably could remove if blob occupies all 32 x 32
                32, 32 // size of bliting
                );
        }
        player.src = "images/characters/hero.png";
    }

}

// maps are 16 x 16
// players are 32 x 32