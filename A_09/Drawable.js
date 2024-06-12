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
        update() {
            this.draw();
        }
    }
    EntenteichClasses.Drawable = Drawable;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Drawable.js.map