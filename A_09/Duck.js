"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Duck {
        position;
        color;
        size;
        type;
        direction;
        activity;
        constructor() {
            console.log("Duck Constructor");
        }
        move() {
            console.log("Duck move");
        }
        draw() {
            console.log("Duck draw");
        }
    }
    EntenteichClasses.Duck = Duck;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Duck.js.map