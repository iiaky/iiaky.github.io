// the few blobs in the village, interact with them for some quick npc dialogue
// extends GameObject with its own unique set of behaviors and update() function

class Blobs extends GameObject {
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
    } // overriding the empty update() in parent GameObject class

    updatePosition(){
        if (this.movementProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]; //making array that takes the value from the key passed in by this.direction
                                       // where property = x or y and change is the numerical value
            this[property] += change; // then i guess you are updating that x or y value?
            this.movementProgressRemaining -= 1;
        }
    }

}