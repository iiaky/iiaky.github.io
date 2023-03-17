class SubmissionMenu {
    constructor( {caster, enemy, onComplete} ) {
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;
    }

    getPages() { // diff pages
        return {
            root: [
                {
                    label: "Start battle", // what the button should say
                    description: "Can you non-violently pursuade the king?", // or something idk descriptions lol
                    handler: () => {
                        console.log("go to attacks page")
                        // do something when chosen
                    }
                },
                {
                    label: "Exit",
                    description: "Running away?",
                    handler: () => {

                    }
                },
            ],

            attacks: [

            ]
        }
    }

    decide() {
        this.onComplete({
            action: Actions[ this.caster.actions[0] ],
            target: this.enemy
        })
    }

    showMenu(container) {
        // decide on options to show the player using getPages()
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions( this.getPages().root );
    }

    init(container) {

        if (this.caster.isPlayerControlled) {
            // show some UI
            this.showMenu(container);
        }
        else {
            this.decide(); // computer AI (based off a script)
        }
    }
}