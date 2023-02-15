class GameObject {

    constructor(config) { //config can be anything, i think its just an arbitrary data type 
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/average cute blob.png",
            useShadow: config.useShadow
        });
    }

    update() {


    }

}