class Prologue {
    constructor( {scene, onNewEvent, onComplete }) { // maybe I specify which cutscene to use through the constructor?   
                    // so that I control what is shown outside of this class, and this class only handles actually showing it
        this.scene = scene; // "event1", "event2", etc
        this.sceneNumber = 0; // will have a src and events[] in it
        this.onNewEvent = onNewEvent;
        this.onComplete = onComplete;
    }

    async getNext(resolve) {
        const event = window.cutscenes[this.scene]; // this will be each "episode", if you will

        if (this.sceneNumber >= event.length) { // if the current scene we're trying to access doesnt exist
            this.done();
            return;
        }

        this.source = event[this.sceneNumber].src;
        this.script = event[this.sceneNumber].events;
        this.draw();
        
        for (let i=0; i<this.script.length; i++) {
            const event = {
                ...this.script[i],
            }
            console.log(event);
            await this.onNewEvent(event); // for each event, the code is gonna stop here and wait
        }

        this.sceneNumber += 1;
        this.getNext();
    }

    draw() {
        const img = document.getElementById("event-img");
        img.src = this.source;
        this.container.appendChild(this.element);
    }

    done() {
        this.element.remove();
        this.onComplete();
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Prologue");
        this.element.innerHTML = (`
            <img id="event-img" src="images/cutscenes/prologue/testprologue1.png" />
        `)
    }

    init(container) {
        this.createElement();
        this.container = container;
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
                { type: "textMessage", text: " pppp "},
                { type: "textMessage", text: " poopoo "} 
            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: " /// "} 
            ] 
        }
        
    ],
    event2: [

    ]
    
}