class Sprite {

    constructor(config){

        // ** SETTING UP SPRITE IMAGE **
        this.image = new Image();
        this.image.src = config.src; //need to pass in src when creating game object
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // ** SHADOWS **
        this.shadow = new Image();
        this.useShadow = config.useShadow;
        if (this.useShadow) {
            this.shadow.src = "images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        // ** CONFIGURING ANIMATION AND INITAL STATE **
        this.animations = config.animations || { //keyframe animation
            idleDown: [
                [0,0] //takes the x,y value in the spritesheet
            ]
        } // defines all animations

        this.currentAnimation = config.currentAnimation || "idleDown"; //defaults to a key in animation set
        this.currentAnimationFrame = 0; //which animation frame should be showing, which array within "animations" array

        //Reference the game object
        this.gameObject = config.gameObject; //required to pass in a gameObject to create a sprite
    }

    draw(ctx) {
        const x = this.gameObject.x * 16; // takes in the x and y position from the gameObject class that is being passed into the constructor
        const y = this.gameObject.y * 16;

        this.isShadowLoaded && ctx.drawImage(this.shadow,
            x, y + 2); //needs an offset
        this.isLoaded && ctx.drawImage(this.image, //makes sure image is loaded first - takes a bit of time so sprite blitting is silently failing
            0, 0,//left and top start cut
            32, 32, // right and bottom stop cut (width and height) (spritesheet)
            x, y, // player position
            32, 32 // size of bliting
        )

    }
}