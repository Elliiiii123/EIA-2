"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Heron extends EntenteichClasses.Moveable {
        constructor(_x, _y, _size, _direction, _color) {
            //console.log("Duck Constructor")
            super(_x, _y, _size, _direction, _color);
        }
        move() {
            let randomX = (Math.random() * 10 - 1) * 10;
            if (randomX < 0) {
                randomX *= -1; // Umdrehen der X-Komponente, um sicherzustellen, dass sie positiv ist
            }
            // Bewegung basierend auf der Richtung
            //this.xFlying -= this.direction.x;
            //this.yFlying -= this.direction.y;
            this.x += this.direction.x;
            this.y += this.direction.y;
            // Wenn der Kranich den Canvas verlässt, erscheint er auf der gegenüberliegenden Seite
            if (this.x > EntenteichClasses.crc2.canvas.width) {
                this.x = 0;
            }
            else if (this.x < 0) {
                this.x = EntenteichClasses.crc2.canvas.width;
            }
            //if (this.xFlying >= 300 || this.xFlying <= 50) {
            //     this.direction.x *= -1;
            // }
        }
    }
    EntenteichClasses.Heron = Heron;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Heron.js.map