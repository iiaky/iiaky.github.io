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

    }
}