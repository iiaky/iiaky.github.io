class PrologueEvent {
    constructor(event, prologue) {
        this.event = event;
        this.prologue = prologue;
    }

    textMessage(resolve) {
        const message = new TextMessage({
            text: this.event.text,
            name: this.event.name,
            onComplete: () => {
                resolve(); // when the textMessage is "done" - we read it - we're gonna resolve the battle event
            }
        })
        message.init(this.prologue.element); // the prologue container to draw to the DOM
    }

    init(resolve) {
        this[this.event.type](resolve); // calls the method directly on it
    }
}