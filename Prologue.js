class Prologue {
    constructor( {scene, onComplete }) { // maybe I specify which cutscene to use through the constructor?   
                    // so that I control what is shown outside of this class, and this class only handles actually showing it
        this.scene = scene; // "event1", "event2", etc
        this.onComplete = onComplete;
    }

    getNext() {
        // get the next scene in the cutscene
        const event = window.cutscenes[this.scene]; // this will be each "episode", if you will
        for (let i = 0; i < event.length; i++) {

        }
        if (text.length === 0) {
            src = key1[next].src
            text = key1[next].events
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Prologue");
    }

    init() {
        this.createElement();
        container.appendChild(this.element);
        this.getNext();
    }

}

window.cutscenes = {
    event1: [ // each specified cutscene
        {   
            required: ["pp1"],
            src: "images/cutscenes/prologue/testprologue1.png",
            events: [
                { type: "textMessage", text: " /// "} 
            ]
        },
        {
            src: "images/cutscenes/prologue/testprologue1.png",
            events: [
                { type: "textMessage", text: " /// "} 
            ]
        }
        
    ],
    event2: [

    ]
    
}