class SubmissionMenu {
    constructor( {caster, enemy, onComplete} ) {
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;
    }

    getPages() { // diff pages

        // static back option
        const backOption = {
            label: "Go Back",
            description: "Return to previous page",
            handler: () => {
                this.keyboardMenu.setOptions(this.getPages().root)
            }
        };

        return {
            root: [
                {
                    label: "Start battle", // what the button should say
                    description: "Can you non-violently pursuade the king?", // or something idk descriptions lol
                    handler: () => {
                        this.keyboardMenu.setOptions( this.getPages().attacks )
                    }
                }, // each one of these is a button
                {
                    label: "Exit",
                    description: "Running away?",
                    handler: () => {
                        this.keyboardMenu.end();
                    }
                },
            ],

            attacks: [
                ...this.caster.actions.map(key => {
                    const action = Actions[key];
                    return {
                        label: action.name,
                        description: action.description,
                        handler: () => {
                            this.menuSubmit(action)
                        }
                    }
                }),
                backOption
            ]
        }
    }

    menuSubmit(action) {

        this.keyboardMenu?.end() // if we have keyboard event listeners, we want to end them here

        this.onComplete({
            action,
            target: this.enemy
        })
    }

    decide() {
        this.menuSubmit(Actions[ this.caster.actions[0] ])
    }

    showMenu(container) {
        // decide on options to show the player using getPages()
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);

        this.keyboardMenu.setOptions( this.getPages().attacks );
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