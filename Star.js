class Star extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/star.png",
            useShadow: false,
            animations: {
                "sparkle": [ [0,0], [1,0], [2,0] ]
            },
            currentAnimation: "sparkle",
        });
    }

}