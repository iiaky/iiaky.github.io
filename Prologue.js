class Prologue {
    constructor( {scene, onComplete }) { // maybe I specify which cutscene to use through the constructor?   
                    // so that I control what is shown outside of this class, and this class only handles actually showing it
        this.scene = scene; // "event1", "event2", etc
        this.onComplete = onComplete;
    }

    getNext(resolve) {
        // get the next scene in the cutscene
        const event = window.cutscenes[this.scene]; // this will be each "episode", if you will
        
        for (let i = 0; i < event.length; i++) {
            this.source = event[i].src;
            this.script = event[i].events;
            // this.draw();

            for (let k = 0; k < this.script.length; k++) {
                const message = new TextMessage({
                    text: this.script[k].text,
                    onComplete: () => {
                        return new Promise(resolve => {
                            resolve();
                        })
                    }
                })
                console.log(message)

                message.init(this.element);
            }
        }
    }

    draw() {
        // get element by id (img) . src = ...
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
                { type: "textMessage", text: " pppp "} 
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