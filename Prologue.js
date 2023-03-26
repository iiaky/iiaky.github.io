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
    event1: [ // each specified cutscene
        {   
            required: ["pp1"],
            src: "images/cutscenes/prologue/testprologue1.png",
            events: [
                { type: "textMessage", text: "Deep within a forest roamed a sacred blob species."},
                { type: "textMessage", text: "They hopped about, made sure the wildlife was playing nice, and were undeniably cute."}, 
                { type: "textMessage", text: "Thriving under nature’s protection, they preserved the peace of the land."}
            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "Every year, under the full moon, you could hear the forest awaken with soft squishes." },
                { type: "textMessage", text: "And beneath, the treaded grass sprung back, blanketing any lingering signs of their presence." },
                { type: "textMessage", text: "Where were they going?" },
            ] 
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "Regardless, they embraced all the species, and were especially welcoming to the new humans." },
                { type: "textMessage", text: "Tribes hunted and gathered, domesticated animals, irrigated the land, and traded with neighboring tribes." },
                { type: "textMessage", text: "Settlements rose and fell, conquered and got overturned. Civilization was underway." },
                { type: "textMessage", text: "It was a delicate dance, but for a while, the forest existed in harmony." },
            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "As governments manifested and monarchs conquered, the human population bloomed, but so did their greed for power." },
                { type: "textMessage", text: "With each new generation, their relationship to the blobs became more strained." },
                { type: "textMessage", text: "The blobs, once free to roam the world, now had rules and regulations thrust upon them." },
                { type: "textMessage", text: "They found themselves isolated from the nature they were supposed to protect." },
            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "The 7th generation monarchs, for unknown reasons, started to interrogate and kill any blob they found wandering around." },
                { type: "textMessage", text: "The 8th generation monarchs confined the blobs to a remote area just east of the caves." },
                { type: "textMessage", text: "The 9th generation monarchs deforested most of the surrounding land for lumber." },
                { type: "textMessage", text: "In the wake of humans, the defenseless blob species suffered immense loss. With their population dwindling, the remaining blobs focused their efforts on survival." },
            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "They tore down the same trees they grew up with, they mined the same earth they had played around in, and they, too, instilled a parliament." },
                { type: "textMessage", text: "The king declared mobilization of resources to prepare for war, and the spirit of their peace was lost in the wind." }            ]
        },
        {
            src: "images/maps/test\ battle.png",
            events: [
                { type: "textMessage", text: "That brings us to today. 10 years have passed, and we’re at the dawn of the 10th generation. Both sides’ hostility are at an all time high." },
                { type: "textMessage", text: "Can you find a way to preserve the peace?" }
            ]
        },
    ],
    event2: [

    ]
    
}