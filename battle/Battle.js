class Battle {
    constructor( {onComplete} ) {
        this.onComplete = onComplete;

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
                isPlayerControlled: true
            }, this)
        }
        
        this.activeCombatants = {
            player: "player", // change name and id of these
            enemy: "king"
        }
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

        this.turnCycle = new TurnCycle({ // turnCycle just keeps track of whos going
            battle: this,
            onNewEvent: event => { // turnCycle will be spittin out events based on whos cycle it is -- this is the callback
                return new Promise(resolve => { // onNewEvent is a function that emits some event and returns a promise
                    const battleEvent = new BattleEvent(event, this);
                    battleEvent.init(resolve);
                })
            },
            onWinner: winner => {
                // update some storyline

                this.element.remove(); // removing the battle dom
                this.onComplete(winner === "player"); // this "calls back" to the battle function in OverworldEvent
                                                      // in that we can access whatever value is put through BACK IN the original function
            }
        })
        this.turnCycle.init();
    }
}