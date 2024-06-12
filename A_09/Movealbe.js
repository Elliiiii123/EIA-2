"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Moveable extends EntenteichClasses.Drawable {
        direction;
        color;
        size;
        constructor(_x, _y, _size, _direction, _color) {
            //console.log("Duck Constructor")
            super(_x, _y);
            this.size = _size;
            this.direction = _direction;
            this.color = _color;
            if (_color === "yellow" || _color === "gold") {
                this.color = _color;
            }
            else {
                this.color = "brown"; // Wenn nicht, ist die Ente braun
            }
        }
        update() {
            this.draw();
            this.move();
        }
    }
    EntenteichClasses.Moveable = Moveable;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Movealbe.js.map