class CharacterSelect {
    constructor( {onComplete}) {
        this.onComplete = onComplete;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("character-select");
        this.element.innerHTML = (`
            <div class = "character-wrapper">
                <div class = "character" id = "average-cute-blob">
                    <img src = "${'images/characters/average cute blob.png'}"/>
                </div>
                <p>average cute blob</p>
                <p>desc desc desc desc desc desc desc desc </p>
            </div>

            <div class = "character-wrapper">
                <div class = "character" id = "plant-blob">
                    <img src = "${'images/characters/plant blob.png'}"/>
                </div>
                <p>plant blob</p>
                <p>desc desc desc desc desc desc desc desc </p>
            </div>

            <div class = "character-wrapper">
                <div class = "character" id = "bread-blob">
                    <img src = "${'images/characters/bread blob.png'}"/>
                </div>
                <p>bread cute blob</p>
                <p>desc desc desc desc desc desc desc desc </p>
            </div>
        `)
    }

    done() {
        this.element.remove();
        this.onComplete();
    }

    checkSelect() {
        const characters = document.querySelectorAll(".character");
        characters.forEach( element => element.addEventListener("click", event => {
            utils.user.src = event.target.getAttribute('src');
            this.done();
        }, { once: true }))
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
        this.checkSelect();
    }

}