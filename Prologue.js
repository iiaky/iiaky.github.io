class Prologue {
    constructor() {

    }

    getNext() {
        // get the next scene in the cutscene
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Prologue");
    }

    init() {
        this.createElement();
        container.appendChild(this.element);
    }

}

window.cutscenes = {
    key1: [ // each specified cutscene
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
        
    ]
    
}