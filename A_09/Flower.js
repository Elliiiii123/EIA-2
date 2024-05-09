"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Flower {
        position;
        color;
        size;
        constructor() {
            console.log("Flower Constructor");
        }
        draw() {
            console.log("Flower draw");
        }
    }
    EntenteichClasses.Flower = Flower;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Flower.js.map