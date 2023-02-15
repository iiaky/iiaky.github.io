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
        this.updatePosition();
        this.updateSprite(state);

        if (this.movementProgressRemaining === 0 && state.arrow) { // if state.arrow exists ... 
            this.direction = state.arrow; // changing the direction with every arrow press
            this.movementProgressRemaining = 4; // then the guy moves
        }
    } // overriding the empty update() in parent GameObject class


    updatePosition() {
        if (this.movementProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]; //making array that takes the value from the key passed in by this.direction
                                       // where property = x or y and change is the numerical value
            this[property] += change; // then i guess you are updating that x or y value?
            this.movementProgressRemaining -= 1;
        }
    }

    updateSprite(state) {
        
        if (this.movementProgressRemaining === 0 && !state.arrow) { // makes sure that we are not moving and no arrow key is pressed
            this.sprite.setAnimation("idle-" + this.direction) // this.direction is updated at update(state) method, called every frame in Overworld
        }
        

        if (this.movementProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction) // factors in if the character is moving or not
            return;
        }
    }

}