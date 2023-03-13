class Battle {
    constructor() {
        this.combatants = {
            king: new Combatant({
                ...Characters.king,
                team: "enemy",
                trust: 25,
                maxTrust: 100
            }, this),
            player: new Combatant({
                ...Characters.player,
                team: "player",
                trust: 0,
                maxTrust: 1
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

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element);
        })
    }
}