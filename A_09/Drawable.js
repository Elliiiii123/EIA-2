"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Drawable {
        x;
        y;
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        draw() {
            console.log("draw Movable");
        }
        update() {
            this.draw();
        }
    }
    EntenteichClasses.Drawable = Drawable;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Drawable.js.map