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

    textMessage(resolve){

        if (this.event.facePlayer) {
            const obj = this.map.gameObjects[this.event.facePlayer]; // gets the gameObject sprite thing   
            obj.direction = utils.oppositeDirection(this.map.gameObjects["player"].direction);
        }

        const message = new TextMessage({ // making a new TextMessage from the params passed in, then just showing it on screen, simple!
            text: this.event.text, // events arent limited to just walking, but can be array of texts too
            onComplete: () => resolve() // called when textMessage is done being acknowledged by player
            // just takes a text and a thing that should happen when we see the text - decouples it from the overworld, can be used in other ways (ex. battle scenes)
        })
        message.init(document.querySelector(".game-container")); // limits to just the window of the game-container
    }

    changeMap(resolve){
        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () => {
            this.map.overworld.startMap( window.OverworldMaps[this.event.map] ); // evaluates to a map config object
            resolve(); // want the animation to happen in the middle

            sceneTransition.fadeOut();
        });
        
    }

    prologue(resolve) {
        const prologue = new Prologue({
            scene: this.event.scene,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const prologueEvent = new PrologueEvent(event, prologue);
                    prologueEvent.init(resolve);
                })
            },
            onComplete: () => {
                resolve();
            }
        })
        prologue.init(document.querySelector(".game-container"))
    }

    selectCharacter(resolve) {
        const who = this.map.gameObjects[this.event.who];
        const selectCharacter = new CharacterSelect({
            onComplete: () => {
                who.sprite.image.src = utils.user.src;
                resolve();
            }
        })
        selectCharacter.init(document.querySelector(".game-container"))
    }

    battle(resolve) {
        const battle = new Battle({
            onComplete: (didWin) => {
                resolve(didWin ? "WON_BATTLE" : "LOST_BATTLE");
            }
        })
        battle.init(document.querySelector(".game-container"))
    }

    addStoryFlag(resolve) {
        window.playerState.storyFlags[this.event.flag] = true; // the event is the {} passed in the events[] in OverworldMap, and the .flag acceess the "flag" part
        resolve();
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve) // event.type is the string "walk" or "stand", calls the cooresponding event type function on itself, passing in resolve
        })
    }
}