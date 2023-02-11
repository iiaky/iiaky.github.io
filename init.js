// this file starts up the whole thing, passes in the HTML canvas
// to the overworld object in order to draw our world

(function () {
    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    });
    overworld.init();
})();