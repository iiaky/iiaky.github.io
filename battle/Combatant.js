class Combatant {
    constructor (config, battle) {
       Object.keys(config).forEach(key => {
            this[key] = config[key]; // pull in all the attributes passed in Battle.js
            // thats a really interesting way of scripting it - JS is so dynamic wtf
        })

        this.actions = config.actions; //read from a script
        this.battle = battle;
    }

    get trustPercent() { // getting the trust percent (of the enemy - king) which will be used as the fill inside the trust container svg
        const percent = this.trust / this.maxTrust * 100;
        return percent > 0 ? percent : 0;
    }

    createElement() {
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("Combatant");

        this.hudElement.setAttribute("data-combatant", this.id); // attributes are attached to html elements - gives info about them
        this.hudElement.setAttribute("data-team", this.team); // data-attributes are the same but they aren't visually displayed.
        // but for each item that is coming in, we're going to create a diff hudElement for them and assigning them diff data attributes - team and id
        // depending on the value of this, we style them differently

        this.hudElement.innerHTML = (`
            <p class="Combatant_name">${this.name}</p>
            <p class="Combatant_trust"></p>
            <svg viewBox="0 0 26 3" class="Combatant_trust-container">
                <rect x=0 y=0 width="0%" height=1 fill=#ffffff" />
                <rect x=0 y=1 width="0%" height=2 fill=#fcba03" />
        `);
        
        this.blobElement = document.createElement("img");
        this.blobElement.classList.add("Blob");
        this.blobElement.setAttribute("src", this.src );
        this.blobElement.setAttribute("data-team", this.team );

        this.trustFills = this.hudElement.querySelectorAll(".Combatant_trust-container > rect") // saving a reference to the trust bar
    }

    update(changes={}) { // will fill out all the state-ful elemeents in the DOM
        
        // want to change the values of THIS class, given some change
        Object.keys(changes).forEach(key => {
            this[key] = changes[key];
        });

        this.trustFills.forEach(rect => rect.style.width = `${this.trustPercent}%`) // for each rect, set the width to the trust %

        // to see the changes in the DOM:
        this.hudElement.querySelector(".Combatant_trust").innerText = this.trust; // left out the part to find the active combatant - watch turn based pt 1 to implement
    }


    init(container) {
        this.createElement();
        container.appendChild(this.hudElement);
        this.update();
    }

}