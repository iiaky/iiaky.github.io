// that one human in the path, extends GameObject with its own set of unique behaviors and update() function

class Person extends GameObject {
    constructor(config) {
        super(config); // calls parent constructor to do the normal constructor stuff
                       // like setting x y position, creating a sprite for it

        this.movementProgressRemaining = 0; // how many pixels left the character has to go
        
    }

}