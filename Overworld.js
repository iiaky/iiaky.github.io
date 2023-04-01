class Overworld {
    constructor(config) {
        this.element = config.element;
        
        this.canvas = this.element.querySelector(".game-canvas");
        // upping the resolution bc blob too big
        this.canvas.style.width = 350 + 'px';
        this.canvas.style.height = 196 + 'px';
        this.canvas.width = 350 * 2;
        this.canvas.height = 196 * 2;
        
        this.ctx = this.canvas.getContext("2d");
        
        this.map = null;

        // animation properties
        
        this.startTime = 0;
        this.now = 0;
        this.then = 0;
        this.elapsed = 0;
        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
    }

    

    startGameLoop(){

        const step = () => {
            
            requestAnimationFrame(() => {
                step();
            })

            // ** CALCULATING TIME SINCE LAST LOOP **
            this.now = Date.now()
            this.elapsed = this.now - this.then;

            if (this.elapsed > this.fpsInterval) { // if enough time has elapsed, draw things
                this.then = this.now - (this.elapsed % this.fpsInterval);
                
                // -- DRAWING CODE HERE --

                // ** CLEANING UP THE CANVAS FIRST **
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                // ** CAMERA **
                // establishing camera person - everything else will be located relative to this guy
                const cameraPerson = this.map.gameObjects.player; // can change this to make more dyanamic cutscenes and stuff!

                // ** UPDATING **
                // because drawing is relative to the cameraPerson, update all the sprites FIRST before drawing
                Object.values(this.map.gameObjects).forEach(object => {
                    object.update({
                        arrow: this.directionInput.direction, // passing in the key that is pressed at that current frame
                                                             // this is the "state" parameter in the GameObject child class functions       
                        map: this.map // pass in a reference of the map in order to check some methods - like if there is an obstacle in the way
                    })
                })

                // ** DRAWING THE MAPS **
                this.map.drawBackground(this.ctx);
                
                this.map.drawLowerImage(this.ctx, cameraPerson);

                Object.values(this.map.gameObjects).sort((a, b) => {
                    return a.y - b.y; // sorts by y value: subtracts y value from each other then sorts
                }).forEach(object => {
                    object.sprite.draw(this.ctx, cameraPerson); // draw relative to cameraPerson
                }) // getting values inside the "gameObjects" key-value pair,
                // then iterating through each object to draw them (accessing the sprite within each gameObject)

                this.map.drawUpperImage(this.ctx, cameraPerson);
            }
        }
        step();
    }

    bindActionInput(){
        new KeyPressListener("Space", () => {
            // is there a person here to talk to?
            this.map.checkForActionCutscene();
        })
    }

    bindPlayerPositionCheck() {
        document.addEventListener("BlobWalkingComplete", e => {
            if (e.detail.whoId === "player") {
                // hero's position has changed
                this.map.checkForFootstepCutscene();
            }
        })
    }

    startMap(mapConfig) { // allows us to dyanamically call maps by ourselves when triggering an action cutscene - no longer tethered to the init() function
        this.map = new OverworldMap(mapConfig); // setting a starting map
        this.map.overworld = this;
        this.map.mountObjects();
    }

    init() {
       this.startMap(window.OverworldMaps.blobVillage);

        this.bindActionInput();
        this.bindPlayerPositionCheck();
        
        this.directionInput = new DirectionInput(); // instantiating a listener for user input
        this.directionInput.init() // the method for running it ^

        this.then = Date.now();
        this.startTime = this.then;
        this.startGameLoop();
        // drawing (copying) the map pixel data (from the image) onto the canvas
        this.map.startCutscene([ // starts a cutscene for npc interactions - useful in path
             { type: "prologue", scene: "event1" },
            // { who: "player", type: "walk", direction: "down" },
             { who: "player", type: "selectCharacter" },
            // { type: "inputName"}
             { type: "battle" }
        ])
    }
}
// maps are 16 x 16
// players are 32 x 32