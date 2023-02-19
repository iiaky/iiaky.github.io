// extends GameObject, has its own specific set of behaviors for update()


class Player extends GameObject {
    constructor(config) {
        super(config);
        this.movementProgressRemaining = 0;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }
    }

    update(state) {
        if (this.movementProgressRemaining > 0) { // will only call updatePosition() if we have movement to go
            this.updatePosition(); // make sure it moves all the way first - use up all the progress remaining
        }
        else {

            // more cases for starting to walk coming...

            if (this.isPlayerControlled && state.arrow) { // if we are keyboard ready && state.arrow exists ... 
                                                          // isPlayerControlled passed in through OverworldMaps.js into GameObject constructor
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite();
        }
    } // overriding the empty update() in parent GameObject class

    startBehavior(state, behavior) { // a "behavior" object defined as above
        this.direction = behavior.direction; // changing the direction with every arrow press
        if (behavior.type === "walk") { // now able to fire a walk command without needing it to come from the arrow key - you can call startBehavior() on the player itself
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)){
                return; // checking if the "next" space is taken
            } 
            this.movementProgressRemaining = 16; // if not, then the guy moves
            // **!!** mess around with the number - 4 feels good but then you have to change map pixel sizes (8x8 maybe instead of 16*16 and also the wall coords)
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]; //making array that takes the value from the key passed in by this.direction
                                    // where property = x or y and change is the numerical value
        this[property] += change; // then i guess you are updating that x or y value?
        this.movementProgressRemaining -= 1;
    }

    updateSprite() {
        
        if (this.movementProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction) // factors in if the character is moving or not
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction) // this.direction is updated at update(state) method, called every frame in Overworld
    }

}