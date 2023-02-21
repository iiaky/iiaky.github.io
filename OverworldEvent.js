class OverworldEvent {
    constructor({ map, event }) {
        this.map = map;
        this.event = event; // this essentially is A behavior IN behaviorLoop in OverworldMap, the eventConfigs in GameObject (that an id attribute has been added onto) 
    }

    stand(resolve) {
        const who = this.map.gameObjects[this.event.who]; // "who" is now the gameObject retrived from passing in the object's / sprite's id
        who.startBehavior({  // every object will have a method startBehavior() like the on defined in Player, allows us to dynamically call and seperate these functions
            map: this.map // first argument is the "state" variable
        }, { // and this is the behavior that they do
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        }) // so the object hsa started the behavior now, and once they finish, they emitted an event signal. we need to listen to that event signal

        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) { // making sure the object/sprite is correct
                document.removeEventListener("BlobStandComplete", completeHandler); // remove the listener
                resolve(); // then resolve the promise
            }
        }

        document.addEventListener("BlobStandComplete", completeHandler) 

    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who]; // "who" is now the gameObject retrived from passing in the object's / sprite's id
        who.startBehavior({  // every object will have a method startBehavior() like the on defined in Player, allows us to dynamically call and seperate these functions
            map: this.map // first argument is the "state" variable
        }, { // and this is the behavior that they do
            type: "walk",
            direction: this.event.direction,
            retry: true // if this event fails, retry after a short delay
        }) // so the object hsa started the behavior now, and once they finish, they emitted an event signal. we need to listen to that event signal

        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) { // making sure the object/sprite is correct
                document.removeEventListener("BlobWalkingComplete", completeHandler); // remove the listener
                resolve(); // then resolve the promise
            }
        }

        document.addEventListener("BlobWalkingComplete", completeHandler) // once the event fires, we want to fire a "completeHandler"
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve) // event.type is the string "walk" or "stand", calls the cooresponding event type function on itself, passing in resolve
        })
    }
}