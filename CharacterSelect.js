class CharacterSelect {
    constructor( {onComplete}) {
        this.onComplete = onComplete;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("wrapper");
        this.element.innerHTML = (`
            <h3>Select your character!</h3>

            <div class = character-select>
                <div class = "character-wrapper">
                    <div class = "character" id = "average-cute-blob">
                        <img src = "${'images/characters/average cute blob.png'}"/>
                    </div>
                    <p>average cute blob</p>
                    <div class="desc">
                        <p>◦ your average cute blob</p>
                        <p>◦ very squish, +10 squish points</p>
                    </div>
                </div>

                <div class = "character-wrapper">
                    <div class = "character" id = "plant-blob">
                        <img src = "${'images/characters/plant blob.png'}"/>
                    </div>
                    <p>plant blob</p>
                    <div class="desc">
                        <p>◦ eats sun</p>
                        <p>◦ wash before consumption</p>
                    </div>
                </div>

                <div class = "character-wrapper">
                    <div class = "character" id = "bread-blob">
                        <img src = "${'images/characters/bread blob.png'}"/>
                    </div>
                    <p>bread blob</p>
                    <div class="desc">
                        <p>◦ average milk bread enjoyer</p>
                        <p>◦ nom nom :3</p>
                    </div>
                </div>
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