class KeyboardMenu {
    constructor() {
        this.options = []; // set by updater method showMenu() in submissionMenu
        this.up = null;
        this.down = null;
        this.prevFocus = null;
    }

    setOptions(options) {
        this.options = options;
        this.element.innerHTML = this.options.map((option, index) => { // kind of like enumerate?
            const disabledAttr = option.disabled ? "disabled" : "";
            //const autoFocusAttr = index === 0 ? "autofocus" : "";
            return (`
                <div class="option">
                    <button ${disabledAttr} data-button="${index}" data-description="${option.description}">
                        ${option.label}
                    </button>
                    <span class="right">${option.right ? option.right() : ""}</span>
                </div>
            `)
        }).join("");

        this.element.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                // goal: get a reference to the callback (handler()) that we are trying to fire
                const chosenOption = this.options[ Number(button.dataset.button) ]; // getting the # button in the array using the data-button attribute lookup
                chosenOption.handler();
            })
            button.addEventListener("mouseover", () => {
                button.focus();
            })
            button.addEventListener("focus", () => {
                this.prevFocus = button;
                this.descriptionElementText.innerText = button.dataset.description; // descriptionElementText is a <p>
            })
        })
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("KeyboardMenu");

        // description box element
        this.descriptionElement = document.createElement("div");
        this.descriptionElement.classList.add("DescriptionBox");
        this.descriptionElement.innerHTML = (`<p>rahh</p>`);
        this.descriptionElementText = this.descriptionElement.querySelector("p"); // saving a reference to the paragraph / description because it will be updated a lot (on focus)
    }

    end() {
        this.element.remove();
        this.descriptionElement.remove()

        // cleaning up bindings
        this.up.unbind();
        this.down.unbind();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.descriptionElement);
        container.appendChild(this.element);

        this.up = new KeyPressListener("KeyW", () => {
            const current = Number(this.prevFocus.getAttribute("data-button"));
            const prevButton = Array.from(this.element.querySelectorAll("button[data-button]")).reverse().find( el => {
                // find a button whose data-button attr is greater than the current
                return el.dataset.button < current && !el.disabled;
            })
            prevButton?.focus();
        })
        this.down = new KeyPressListener("KeyS", () => {
            const current = Number(this.prevFocus.getAttribute("data-button"));
            const nextButton = Array.from(this.element.querySelectorAll("button[data-button]")).find( el => {
                // find a button whose data-button attr is greater than the current
                return el.dataset.button > current && !el.disabled;
            })
            nextButton?.focus(); // then the focus listener takes over - highlighting it in the DOM and updating the focus text

        })
    }
}