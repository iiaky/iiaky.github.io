class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
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

                // ** DRAWING THE MAPS **
                this.map.drawLowerImage(this.ctx, 0, 0);

                Object.values(this.map.gameObjects).forEach(object => {
                    object.x += 1;
                    object.sprite.draw(this.ctx);
                }) // getting values inside the "gameObjects" key-value pair,
                // then iterating through each object to draw them (accessing the sprite within each gameObject)

                this.map.drawUpperImage(this.ctx, 0, 0);
            }
        }
        step();
    }

    init() {

        this.map = new OverworldMap(window.OverworldMaps.blobVillage); // setting a starting map
        
        this.then = Date.now();
        this.startTime = this.then;
        this.startGameLoop();
        // drawing (copying) the map pixel data (from the image) onto the canvas

    }
}
// maps are 16 x 16
// players are 32 x 32