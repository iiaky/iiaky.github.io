class End {
    constructor() {

    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("end_screen")
        this.element.innerHTML = (`
            <h1>Thanks for playing!</h1>
            <div class = "container">
                <div>
                    <p>Credits</p>
                    <p>----------</p>
                    <p>Art, blobs and animations: Serena Yung</p>
                    <p>Code and Development: Serena Yung</p>
                    <p>Plot: Serena Yung</p>
                    <p>Moral Support: Narwhal plushie</p>
                </div>
                
                <div>
                    <p>External Resources</p>
                    <p>---------------------</p>
                    <p>Tribal People by AntumDeluge (opengameart)</p>
                    <p>Path pixel background by annawizard</p>
                </div>
            </div>
        `)
    }
     
    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}