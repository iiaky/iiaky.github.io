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
            src: "images/cutscenes/prologue/nature.png",
            events: [
                { type: "textMessage", text: "Deep within a forest roamed a sacred blob species."},
                { type: "textMessage", text: "They preserved the peace of the land, and were undeniably cute."}, 
            ]
        },
        {
            src: "images/cutscenes/prologue/squeesh.png",
            events: [
                { type: "textMessage", text: "They were especially welcoming to the new humans, who before long, settled down comfortably on the land." },
                { type: "textMessage", text: "Tribes rose and fell, conquered and got overturned. Civilization was underway." },
            ]
        },
        {
            src: "images/cutscenes/prologue/human\ bad.png",
            events: [
                { type: "textMessage", text: "But the human’s greed for power was insatiable." },
                { type: "textMessage", text: "With each rising tribe, their relationship to the blobs became more strained." },
                { type: "textMessage", text: "The humans confined the blobs to a remote area just east of the caves, deforested the land for lumber, and even started to interrogate, contain, and even kill any blobs they picked off the paths." },
            ]
        },
        {
            src: "images/cutscenes/prologue/blob\ chop.png",
            events: [
                { type: "textMessage", text: "In the wake of humans, the defenseless blob found themselves isolated from the nature they were supposed to protect." },
                { type: "textMessage", text: "With their population dwindling, the remaining blobs focused their efforts on survival. " },
            ]
        },
        {
            src: "images/cutscenes/prologue/blob\ chop.png",
            events: [
                { type: "textMessage", text: "Blinded by desperation and  a thirst for revenge, the blobs started to develop and mobilize their resources to prepare for war." },
                { type: "textMessage", text: "Before long, the spirit of their peace was lost in the wind." }            ]
        },
        {
            src: "images/cutscenes/prologue/warr.png",
            events: [
                { type: "textMessage", text: "That brings us to today, 2 years later. Both sides’ hostility are at an all time high." },
                { type: "textMessage", text: "Can you find a way to preserve the peace?" }
            ]
        },
    ],
    healing_cave: [
        {   
            src: "images/cutscenes/cave/travelling.png",
            events: [
                { type: "textMessage", text: "It was a tradition that existed since the dawn of our time.", name: "Esther"},
                { type: "textMessage", text: "One every year, under the full moon, we travel to the Cave as a reminder of our purpose - we're a gift from Nature, and we have to give back.", name: "Esther"}, 
                { type: "textMessage", text: "But ever since our rising tensions with the Tribes, this tradition has mostly been abandoned.", name: "Esther"}, 
            ]
        },
        {   
            src: "images/cutscenes/cave/cave.png",
            events: [
                { type: "textMessage", text: "See that structure? We give up a bit of our spirit to the Crystal, our essence; some say it’s able to cure even the deadliest of diseases.", name: "Esther"},
                { type: "textMessage", text: "But only the King can authorize use of it. But even he’s been neglecting our traditions…", name: "Esther"}, 
                { type: "textMessage", text: "I’m afraid it’ll fall into the wrong hands.", name: "Esther (muttering)"}, 
            ]
        },
        {   
            src: "images/cutscenes/cave/travelling.png",
            events: [
                { type: "textMessage", text: "Let’s go back now; they'll wonder where we went", name: "Esther"}
            ]
        },
    ],
    win: [
        {   
            src: "images/cutscenes/win/flower.png",
            events: [ 
                { type: "textMessage", text: "It turns out that the flower you saw was the cause of the plague."},
                { type: "textMessage", text: "A poison by Nature."},
            ]
        },
        {   
            src: "images/cutscenes/win/heal.png",
            events: [ 
                { type: "textMessage", text: "You and the King sought out the Human you encountered before."},
                { type: "textMessage", text: "After negotiations with the Tribe leaders, the misunderstanding was cleared up."},
                { type: "textMessage", text: "The King authorized use of the Crystal to heal the Tribes."},
            ]
        },
        {   
            src: "images/cutscenes/win/rebuild.png",
            events: [ 
                { type: "textMessage", text: "Before long, the population was lively again."},
                { type: "textMessage", text: "The Tribes helped the Blobs rebuild, and welcomed them into the community."},
            ]
        },
        {   
            src: "images/cutscenes/win/hug.png",
            events: [ 
                { type: "textMessage", text: "It was difficult at first, but with time, peace was restored."},
                { type: "textMessage", text: "Sometimes, the bravest ones are those who offer a hand first."},
            ]
        },
    ],
    lose: [
        {   
            src: "images/cutscenes/prologue/warr.png",
            events: [
                { type: "textMessage", text: "As promised, the Tribes invaded a month later."},
                { type: "textMessage", text: "But thanks to your warning, the Blobs were prepared to fight back."},
            ]
        },
        {   
            src: "images/cutscenes/lose/corrupted.png",
            events: [
                { type: "textMessage", text: "And they used the Crystal to prolong the war efforts."},
                { type: "textMessage", text: "The Crystal, once built with love, now bent to the will of vengeance."},
            ]
        },
        {   
            src: "images/cutscenes/lose/blood\ river.png",
            events: [
                { type: "textMessage", text: "And so begins the War of Eternity, over a decade of bloodshed."},
            ]
        },
        {   
            src: "images/cutscenes/lose/blood\ river.png",
            events: [
                { type: "textMessage", text: "How would things be different if both sides trusted each other?"},
            ]
        },
    ]
    
}