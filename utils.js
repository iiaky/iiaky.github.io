// a object with some helper functions
// assisting in grid based movement

const utils = {
    withGrid(n) {
        return n * 16; //to be used in OverworldMaps
    },
    asGridCoord(x, y) {
        return `${x*16}, ${y*16}` // kinda like f strings
    },

    nextPosition(initalX, initalY, direction) { // used in checking if space is occupied - gets the "would be" next position
        let x = initalX; // to prevent changing values
        let y = initalY;
        const size = 16; // probably the scale
        if (direction === "left") {
            x -= size;
        }
        else if (direction === "right") {
            x += size;
        }
        else if (direction === "up") {
            y -= size;
        }
        else if (direction === "down") {
            y += size;
        }
        return {x,y};

    },

    oppositeDirection(direction) {
        if (direction === "left") { return "right" }
        if (direction === "right") { return "left" }
        if (direction === "up") { return "down" }
        return "up"
    },

    wait(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    },

    emitEvent(name, detail) {
        const event = new CustomEvent(name, { // use JS built in CustomEvent to make a .. custom event to listen for whatever we want
            detail // send in any additional details about this event - must use "detail" tag -- will be sent by the parameter
        });
        document.dispatchEvent(event);
    }
}