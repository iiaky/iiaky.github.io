class TurnCycle {
    constructor ( {battle, onNewEvent} ) { // the onNewEvent is a callback
        this.battle = battle;
        this.onNewEvent = onNewEvent;

        // tracking who's turn?
        this.currentTeam = "player"
    }

    async turn() {
        // get the caster
        const casterId = this.battle.activeCombatants[this.currentTeam]; // the team in the combatant object
        const caster = this.battle.combatants[casterId];

        const enemyId = this.battle.activeCombatants[this.currentTeam === "player" ? "enemy" : "player"]; // the team in the combatant object
        const enemy = this.battle.combatants[enemyId];

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        }) // asks the caster what they want to do - and it waits here
    }

    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "the battle is starting"
        }) // then we wait for the player to acknowledge this, then start the first turn
        // to get the textMessage on the screen, we need a handler for this
        this.turn();
    }
}