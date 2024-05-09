"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Lake {
        position;
        color;
        size;
        constructor() {
            console.log("Lake Constructor");
        }
        draw() {
            console.log("Lake draw");
        }
    }
    EntenteichClasses.Lake = Lake;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Lake.js.map