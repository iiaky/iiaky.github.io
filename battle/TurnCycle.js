class TurnCycle {
    constructor ( {battle, onNewEvent, onWinner} ) { // the onNewEvent is a callback
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.onWinner = onWinner;

        // tracking who's turn?
        this.currentTeam = "player"
    }

    async turn() {
        // get the caster
        const casterId = this.battle.activeCombatants[this.currentTeam]; // the team in the combatant object
        const caster = this.battle.combatants[casterId];

        const enemyId = this.battle.activeCombatants[this.currentTeam === "player" ? "enemy" : "player"]; // the team in the combatant object
        const enemy = this.battle.combatants[enemyId];

        var winner = null;

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        }) // asks the caster what they want to do - and it waits here

        const resultingEvents = submission.action.success; // retuns an array of .. next steps
        for (let i=0; i<resultingEvents.length; i++) { // using a for loop to stay in the scope of async function
            const event = {
                ...resultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event); // for each event, the code is gonna stop here and wait
        }

        // has max or min trust been reached?
        const maxTrust = submission.target.trust >= submission.target.maxTrust;
        const minTrust = submission.target.trust <= 0;
        if (maxTrust) {
            winner = "player";
            await this.onNewEvent({ type: "textMessage", text: "You're right... my judgement was clouded." })
            await this.onNewEvent({ type: "prologue", scene: "win" })
            await this.onNewEvent({ type: "end" })
        }
        else if (minTrust) {
            winner = "enemy";
            await this.onNewEvent({ type: "textMessage", text: "Enough!", name: "King" })
            await this.onNewEvent({ type: "textMessage", text: "You are not only disrespecting my decision, but the lives of everyone before me!", name: "King" })
            await this.onNewEvent({ type: "textMessage", text: "We only have a limited time to prepare for war.", name: "King" })
            await this.onNewEvent({ type: "textMessage", text: "Either help us, or leave!", name: "King" })
            await this.onNewEvent({ type: "prologue", scene: "lose" })
            await this.onNewEvent({ type: "end" })
        }

        // do we have a winning team?
        if (winner) {
            // await this.onNewEvent({})
            this.onWinner(winner) // a callback and passing in our winner
        }
        
        // update player decisions
        if (this.currentTeam === "player") {
            window.playerState.updateEnemyResponse(submission.action.enemyAction); // the identifier
            window.playerState.updateBattleProgress(submission.action.goTo);
        }
        
        // then change the team and next turn
        this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        this.turn();
        
    }

    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "Can you convince the King to restore peace?"
        }); // then we wait for the player to acknowledge this, then start the first turn
        // to get the textMessage on the screen, we need a handler for this
        await this.onNewEvent({
            type: "textMessage",
            text: "The decisions you make will lead you down different paths..."
        });
        await this.onNewEvent({
            type: "textMessage",
            text: "So what do you propose we do?",
            name: "King"
        });
        this.turn();
    }
}

