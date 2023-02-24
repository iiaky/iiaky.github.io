class TextMessage {
    constructor ({ text, onComplete }) { // an onComplete callback
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement() { // each UI element will create a div and populate it with text and presentational details
        // create a new element
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage") // add a class to the div (like in html) (by convention, will always be the name of the JS class)
    
        this.element.innerHTML = (`
        <p class = "TextMessage_p">${this.text}</p>
        <button class = "TextMessage_button">Next</button>
        `) // to directly modify HTML
           // but will cause the browser to reload and recreate all DOM nodes inside of that div element -- a lot less efficient, preformance concern
    
        this.element.querySelector("button").addEventListener("click", () => {
            // close text message
            this.done();
        });

        this.actionListener = new KeyPressListener("Space", () => { // hooks up the space bar to continue / exit dialogue
            this.actionListener.unbind(); // when the ^ is fulfilled, called the unbind method in the class, and then execute the done function in this class
            this.done();
        })
    }

    done() { // called to close text message
        this.element.remove();
        this.onComplete(); // calling a function on the onComplete variable which is kinda cool
    }

    init(container) { // will append the elements (from ^) to the container that is passed in
        this.createElement();
        container.appendChild(this.element) // "container" will be some div ( - div.appendChild(///) is the JS syntax
    }
}