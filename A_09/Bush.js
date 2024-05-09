"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Bush {
        position;
        color;
        size;
        constructor() {
            console.log("Bush Constructor");
        }
        draw() {
            console.log("Bush draw");
        }
    }
    EntenteichClasses.Bush = Bush;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Bush.js.map