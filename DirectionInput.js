// controls input from WASD for the player

class DirectionInput {
    constructor() {
        this.heldDirections = []; // will be keeping track of arrow presses in an array - makes it smoother  
    
        this.map = { // a list of the key presses that we care about
            "KeyW": "up",
            "KeyS": "down",
            "KeyA": "left",
            "KeyD": "right"
        }
    }

    get direction() { //getter function for external sources to access what key is being held/pressed
        return this.heldDirections[0]; // will return the first item in the array
                                       // access by using this.directionInput.direction; in another class --> is an attribute but also seconds as a getter function
    }

    init() {

        document.addEventListener("keydown", e => { // e is some callback event\
            const dir = this.map[e.code]; // recording the direction associated with the key press
            if (dir && this.heldDirections.indexOf(dir) === -1) { // if a relevant key press is found AND does not exist in the directions array yet...
                this.heldDirections.unshift(dir); // adds it to the beginning of the array
            }
        });

        document.addEventListener("keyup", e =>{
            const dir = this.map[e.code]; // what direction we go?
            const index = this.heldDirections.indexOf(dir); // finding index of specified direction
            if (index > -1) { // if it exists...
                this.heldDirections.splice(index, 1); // starting at specified index, remove 1 entry
            }
        });

    }
    

}