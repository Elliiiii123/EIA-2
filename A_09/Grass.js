"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Grass {
        position;
        color;
        size;
        constructor() {
            console.log("Grass Constructor");
        }
        draw() {
            console.log("Grass draw");
        }
    }
    EntenteichClasses.Grass = Grass;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Grass.js.map