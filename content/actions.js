// the actions that the blobbers can make

windows.Actions = {

    damage1: { // name of the quote / line? -- thinking of giving each line some id
        name: "whomp", // not sure what this is
        success: [ // what happens after
            { type: "textMessage", text: "Something happened!!"},
            { type: "stateChange", trust: 10 }
        ]
    }    
}
