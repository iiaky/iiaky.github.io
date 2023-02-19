class GameObject {

    constructor(config) { //config can be anything, i think its just an arbitrary data type 
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.isPlayerControlled = config.isPlayerControlled || false;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/average cute blob.png",
            useShadow: config.useShadow
        });
    }

    mount(map) { // when the object mounts (is blitted), we want it to add a wall at its location
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }

    update() {


    }

}