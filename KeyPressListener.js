// to listen for keypresses, to be used in multiple situations
// replicates a default button - press down, something happens, must release + repress to fire again
// adding listener for KeyDown would just rapid fire when key is held down, which is not cool

class KeyPressListener {
    constructor(keyCode, callback) { // callback is what will happen when the keycode is pressed down once
        let keySafe = true;

        this.keydownFunction = function(event) {
            if (event.code === keyCode) {
                if (keySafe) {
                    keySafe = false;
                    callback();
                }
            }
        };

        this.keyupFunction = function(event) {
            if (event.code === keyCode) {
                keySafe = true;
            }
        };

        document.addEventListener("keydown", this.keydownFunction);
        document.addEventListener("keyup", this.keyupFunction);

        // when the document hears a keydown press that matches the keyCode,
        // itll fire the callback ONLY ONCE until the keyup is fired
        // then after the dialogue or whatever finishes, unbind the event listener,
        // so that the document no longer looks for that "enter" keypress
    }

    // unbinding

    unbind() {
        document.removeEventListener("keydown", this.keydownFunction);
        document.removeEventListener("keyup", this.keyupFunction);
    }
}