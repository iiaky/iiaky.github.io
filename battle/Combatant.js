class Combatant {
    constructor (config, battle) {
        this.name = config.name
        this.actions = config.actions; //read from a script
        this.battle = battle;
    }

    createElement() {
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("Combatant");
    }

    init() {

    }

}