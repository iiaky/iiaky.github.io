class PlayerState {
    constructor() {
        this.storyFlags = {
            "village_start": true,
            "first_path": true,
            "second_path": true,

            // for testing purposes
            // "met_human": true,
            // "visited_cave": true,
            // "saw_flower": true,
        }

        this.playerSrc = "";
        this.currentBattleScene = "decision";

        this.ch1 = window.script[this.currentBattleScene].ch1;
        this.ch2 = window.script[this.currentBattleScene].ch2;

        this.enemyResponseId = "";
        this.enRes = window.enemyScript[this.enemyResponseId];
    }

    updateBattleProgress(scene) { // what scene we are at - we can access enemy dialogue and future succession from here
        this.currentBattleScene = scene;
    }

    updateEnemyResponse(identifier) {
        this.enemyResponseId = identifier;
        this.enRes = window.enemyScript[this.enemyResponseId];
    }
}

window.playerState = new PlayerState(); // saving an instance into the window - will save and persist through battles and whatnot