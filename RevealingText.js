class RevealingText {
    constructor(config) {
        this.element = config.element; // this is the div - the container we want to write/type INTO - we fill with <span> text
        this.text = config.text;
        this.speed = config.speed || 70;

        this.timeout = null;
        this.isDone = false;
    }

    revealOneCharacter(list) {
        const next = list.splice(0,1)[0] // bc list is an array of {}s, the first element is the span content
                                         // by js syntax, its splice(start, deletecount, item (to add?)) - so you delete the first item, but you save it into "next"
        next.span.classList.add("revealed");

        if (list.length > 0) {
            this.timeout = setTimeout(() => {
                this.revealOneCharacter(list)
            }, next.delayAfter)
        }
        else {
            this.isDone = true;
        }
    }

    warpToDone() { // if space is pressed in the middle of the text message, then we want to finish showing the message
        clearTimeout(this.timeout);
        this.isDone = true;
        this.element.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed");
        })

    }

    init() {
        let characters = [];
        this.text.split("").forEach(character => { // will split the text into individual characters
            let span = document.createElement("span");
            span.textContent = character;
            this.element.appendChild(span); // adds the newly made span character (individual characters) to the text box

            characters.push({
                span,
                delayAfter: character === " " ? 0 : this.speed, // will be no delay if there is a " " character
            })
        })

        this.revealOneCharacter(characters);
    }
}