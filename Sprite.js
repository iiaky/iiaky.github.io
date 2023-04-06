class Sprite {

    constructor(config) {

        // ** SETTING UP SPRITE IMAGE **
        this.image = new Image();
        this.image.src = config.src; //need to pass in src when creating game object
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.frameX = config.frameX || 32;
        this.frameY = config.frameY || 32;
        this.Yoffset = config.Yoffset || 0;

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
            "idle-up": [ [0,2], [2,2] ],
            "idle-down": [ [0,0], [2,0] ], //takes the x,y value in the spritesheet
            "idle-left": [ [0,3], [2,3] ],
            "idle-right": [ [0,1], [2,1] ],

            "walk-up" : [ [0,2], [1,2], [2,2] ],
            "walk-down" : [ [0,0], [1,0], [2,0] ],
            "walk-left" : [ [0,3], [1,3], [2,3] ],
            "walk-right" : [ [0,1], [1,1], [2,1] ]
        } // defines all animations

        this.currentAnimation = config.currentAnimation || "idle-down"; //defaults to a key in animation set
        this.currentAnimationFrame = 1; //which animation frame should be showing, which array within "animations" array

        // ** DETERMINING WHEN TO SWITCH ANIMATION FRAMES **
        this.animationFrameLimit = config.animationFrameLimit || 16; // how many game frames we want to stay at the current animation, "cadence"
        this.animationFrameProgress = this.animationFrameLimit; // how much time left in the remaining frame



        //Reference the game object
        this.gameObject = config.gameObject; //required to pass in a gameObject to create a sprite
    }

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        // checking if the animation changed to prevent same-animation interruptions
        if (this.currentAnimation !== key) {
            this.currentAnimation = key; // current animation will change to new animation
            this.currentAnimationFrame = 0; // reset frame to 1st animation frame
            this.animationFrameProgress = this.animationFrameLimit; // reset cadence
        }
    }

    updateAnimationProgress() {
        // run this method everytime we draw, which is every frame

        // Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        // Or reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;
        
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) { //want to be able to draw relative to a cameraPerson
        const x = cameraPerson ? this.gameObject.x + utils.withGrid(20) - cameraPerson.x : this.gameObject.x;
        const y = cameraPerson ? this.gameObject.y + utils.withGrid(11) - cameraPerson.y : this.gameObject.y;
            // takes in the x and y position from the gameObject class that is being passed into the constructor
            // offsetting: postition + offset (10.5 for x, 6 for y to position at center of the screen) - cameraPerson's coords

        const [frameX, frameY] = this.frame;

        this.isShadowLoaded && ctx.drawImage(this.shadow,
            0, 0,
            32, 32,
            x, y + 2,
            32, 32); //needs an offset
        this.isLoaded && ctx.drawImage(this.image, //makes sure image is loaded first - takes a bit of time so sprite blitting is silently failing
            frameX * this.frameX, frameY * this.frameY, //left and top start cut, need * 32 to offset to go to the next frame
            this.frameX, this.frameY, // right and bottom stop cut (width and height) (spritesheet)
            x, y - this.Yoffset, // player position
            this.frameX, this.frameY // size of bliting
        )
        
        this.updateAnimationProgress();
    }
}