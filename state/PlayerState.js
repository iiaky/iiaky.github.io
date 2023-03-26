class PlayerState {
    constructor() {
        this.storyFlags = {
            
        }

        this.currentBattleScene = "scene1";

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