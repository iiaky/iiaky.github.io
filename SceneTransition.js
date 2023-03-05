class SceneTransition {
    constructor() {
        this.element = null;
    }
    
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("SceneTransition");
        // basic code loop : for items that need ui elements, have them create their own element,
        // add a class to them, css modify that class, appendChild anything that you need
        // appendChild to a container - a parameter that is passed in with our game

        // make it into a this.element variable so that each individual canvas element is divded nicely
    }

    fadeOut() {
        this.element.classList.add("fade-out"); // triggers animation to go backwards (by manipulating classes with js, you can add cool custom transitions  + make the website responsive)
    
        this.element.addEventListener("animationend", () => {
            this.element.remove();
        }, { once: true })
    }

    init(container, callback) { // when this element hits the DOM, it's going to start animating immediately, so we need a callback to see when that animation is done
        this.createElement() // just to divide the code
        container.appendChild(this.element);

        this.element.addEventListener("animationend", () => {
            callback();
        }, { once: true }) // allowed to pass in another element / object with once - will automatically unbind once its done
    }
    
}