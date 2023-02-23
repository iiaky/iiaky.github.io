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
    }

    init(container) { // will append the elements (from ^) to the container that is passed in
        this.createElement();
        container.appendChild(this.element) // "container" will be some div ( - div.appendChild(///) is the JS syntax
    }
}