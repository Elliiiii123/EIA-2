"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Cloud {
        position;
        color;
        size;
        constructor() {
            console.log("Cloud Constructor");
        }
        move() {
            console.log("Cloud move");
        }
        draw() {
            console.log("Clous draw");
        }
    }
    EntenteichClasses.Cloud = Cloud;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Cloud.js.map