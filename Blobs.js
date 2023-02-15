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

    updatePosition(){
        if (this.movementProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]

        }
    }

}