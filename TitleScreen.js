// will have a different structure - we only want the user's option, so the init method will be async
// and will return a promise - this allows the code to wait for the user's response
// before running the rest of the code.
// (instead of having the onComplete structure inside of the constructor)

class TitleScreen {
    constructor() {

    }

    getOptions(resolve) {
        return [
            {
                label: "Play",
                description: "Start game!",
                handler: () => {
                    this.close();
                    resolve();
                }
            },
            {
                label: "Instructions",
                description: "Use WASD to move, space to interact.",
                handler: () => {    
                }
            },
            {
                label: "Credits",
                description: "Developed by Serena Yung ^-^",
                handler: () => {    
                }
            },
        ]
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TitleScreen");

        this.element.innerHTML = (`
            <img class="TitleScreen_logo" src="images/cutscenes/prologue/warr.png" />
            <div class="container">
                <h1>A Lost Promise</h1>
            </div>

        `);
    }

    close() {
        this.keyboardMenu.end();
        this.element.remove();
    }

    init(container) {
        return new Promise(resolve => {
            this.createElement();
            container.appendChild(this.element);
            this.keyboardMenu = new KeyboardMenu();
            this.keyboardMenu.init(this.element);
            this.keyboardMenu.setOptions(this.getOptions(resolve)) // pass the resolver through the getOptions()
                                                                   // so that the handler in getOptions() can fire that resolver
        })
    }

}