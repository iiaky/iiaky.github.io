// the actions that the blobbers can make

window.Actions = {    
    ch1: {
        ...window.playerState.ch1
    },

    ch2: {
        ...window.playerState.ch2
    },

    enRes: {
        ...window.playerState.enRes
    }
}

// maybe have a function like getNext() to get the next elements
// since battle is reading from here anyway