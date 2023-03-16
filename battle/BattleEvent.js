class BattleEvent {
    constructor(event, battle) {
        this.event = event;
        this.battle = battle;
    }
    // we're gonna look up the method name and then dynamically call that

    textMessage(resolve) {
        const message = new TextMessage({
            text: this.event.text, // maybe dynamically replace this? idk
            onComplete: () => {
                resolve(); // when the textMessage is "done" - we read it - we're gonna resolve the battle event
            }
        })
        message.init(this.battle.element); // the battle container to draw to the DOM
    }

    async stateChange(resolve) {
        const {caster, target, trust} = this.event; // copies the object attributes
        if (trust) {
            target.update({
                trust: target.trust + trust
            })
        }

        if (trust > 0) {
            target.blobElement.classList.add("battle-trust-up")
            await utils.wait(600);
            target.blobElement.classList.remove("battle-trust-up")
        }
        else {
            target.blobElement.classList.add("battle-trust-down")
            await utils.wait(600);
            target.blobElement.classList.remove("battle-trust-down")
        }
        resolve();
    }

    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            onComplete: submission => {
                // what move to do, who to use it on
                resolve(submission)
            }
        })
        menu.init(this.battle.element);
    }

    init(resolve) {
        this[this.event.type](resolve); // calls the method directly on it
    }
}