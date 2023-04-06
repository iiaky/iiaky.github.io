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
    intro: [ // each specified cutscene
        {   
            required: ["pp1"],
            src: "images/cutscenes/prologue/testprologue1.png",
            events: [
                { type: "textMessage", text: "Deep within a forest roamed a sacred blob species."},
                { type: "textMessage", text: "They preserved the peace of the land, and were undeniably cute."}, 
            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "They were especially welcoming to the new humans, who before long, settled down comfortably on the land." },
                { type: "textMessage", text: "Tribes rose and fell, conquered and got overturned. Civilization was underway." },
            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "But the human’s greed for power was insatiable." },
                { type: "textMessage", text: "With each rising tribe, their relationship to the blobs became more strained." },
                { type: "textMessage", text: "The humans confined the blobs to a remote area just east of the caves, deforested the land for lumber, and even started to interrogate, contain, and even kill any blobs they picked off the paths." },
            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "In the wake of humans, the defenseless blob found themselves isolated from the nature they were supposed to protect." },
                { type: "textMessage", text: "With their population dwindling, the remaining blobs focused their efforts on survival. " },
            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "Blinded by desperation and  a thirst for revenge, the blobs started to develop and mobilize their resources to prepare for war." },
                { type: "textMessage", text: "Before long, the spirit of their peace was lost in the wind." }            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "That brings us to today, 2 years later. Both sides’ hostility are at an all time high." },
                { type: "textMessage", text: "Can you find a way to preserve the peace?" }
            ]
        },
    ],
    healing_cave: [

    ],
    win: [

    ],
    lose: [
        
    ]
    
}