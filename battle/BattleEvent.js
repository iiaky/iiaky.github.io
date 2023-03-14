class BattleEvent {
    constructor(event, battle) {
        this.event = event;
        this.battle = battle;
    }
    // we're gonna look up the method name and then dynamically call that

    textMessage(resolve) {
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => {
                resolve(); // when the textMessage is "done" - we read it - we're gonna resolve the battle event
            }
        })
        message.init(this.battle.element); // the battle container to draw to the DOM
    }

    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            onComplete: submision => {
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