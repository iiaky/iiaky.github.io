class GameObject {

    constructor(config) { //config can be anything, i think its just an arbitrary data type 
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.isPlayerControlled = config.isPlayerControlled || false;
        this.src = String(utils.user.src) // the src of the player, but this is being set before ...
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || this.src || "images/characters/average cute blob.png",
            useShadow: config.useShadow,
            frameX: config.frameX || 32,
            frameY: config.frameY || 32,
            Yoffset: config.Yoffset
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0; // an index to track which part of the behavior we are at
    
        this.talking = config.talking || [];
    }

    mount(map) { // when the object mounts (is blitted), we want it to add a wall at its location
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // if assigned a behavior, kick off after a short delay
        setTimeout(() => {
            this.doBehaviorEvent(map)
        }, 10);
    }

    update() {


    }

    async doBehaviorEvent(map) {

        // makes sure to short circuit if there is a bigger cutscene going - always want to honor that first
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
            return;
        }

        // identify which event to execute rn
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id; // whatever the id of the gameObject is that is calling this method (because each one does)
        
        const eventHandler = new OverworldEvent({ map, event: eventConfig }); // OverworldEvent is going to instruct the blobs to do the blob thing, kinda like the puppetmaster
        await eventHandler.init(); // await tells the code : yo, this line is gonna take some time, dont do anything until we're done; need to mark the function as async 

        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        this.doBehaviorEvent(map) // once we reach the end, re-call again
    }

}