class Battle {
    constructor() {
        this.combatants = {
            "player": new Combatant({
                name: "aku" //name from util or some global value of player info
                
            }, this)
        }
        this.element = null;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = (`
            <div class = "Battle_player">
                <img src = "${'images/characters/plant blob.png'}"/>
            </div>

            <div class = "Battle_enemy">
                <img src = "${'images/characters/bread blob.png'}"/>
            </div>
        `)

    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}