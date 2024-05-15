"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Bee {
        x;
        y;
        size;
        direction;
        constructor(_x, _y, _size, _direction) {
            this.x = _x;
            this.y = _y;
            this.size = _size;
            this.direction = _direction;
        }
        move() {
            this.x += this.direction.x;
            this.y += this.direction.y;
            // Wenn die Biene den Canvas verlässt, erscheint sie auf der gegenüberliegenden Seite
            if (this.x > EntenteichClasses.crc2.canvas.width) {
                this.x = 0;
            }
            else if (this.x < 0) {
                this.x = EntenteichClasses.crc2.canvas.width;
            }
            if (this.y > EntenteichClasses.crc2.canvas.height) {
                this.y = 0;
            }
            else if (this.y < 0) {
                this.y = EntenteichClasses.crc2.canvas.height;
            }
        }
        draw() {
            EntenteichClasses.crc2.save();
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.translate(this.x, this.y);
            EntenteichClasses.crc2.scale(this.size, this.size);
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(0, 0);
            EntenteichClasses.crc2.ellipse(0, 0, 16, 8, Math.PI * 2, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = "#FFD700";
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.strokeStyle = "black";
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            // Schwarze Streifen auf dem Körper der Biene
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(0, -6);
            EntenteichClasses.crc2.lineTo(6, 0);
            EntenteichClasses.crc2.moveTo(-6, 0);
            EntenteichClasses.crc2.lineTo(6, 0);
            EntenteichClasses.crc2.moveTo(-6, 6);
            EntenteichClasses.crc2.lineTo(6, 6);
            EntenteichClasses.crc2.strokeStyle = "black";
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            // Auge der Biene
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(8, 0, 2, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = "black";
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Flügel der Biene (weiße Ellipsen)
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(-6, -12, 8, 4, 0, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = "white";
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.strokeStyle = "black";
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(-6, 12, 8, 4, 0, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = "white";
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.strokeStyle = "black";
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            EntenteichClasses.crc2.restore();
        }
    }
    EntenteichClasses.Bee = Bee;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Bee.js.map