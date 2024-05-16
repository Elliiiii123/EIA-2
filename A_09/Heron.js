"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Heron {
        x;
        y;
        xFlying;
        yFlying;
        direction;
        size;
        constructor(_x, _y, _xFlying, _yFlying, _size, _direction) {
            //console.log("Duck Constructor")
            this.x = _x;
            this.y = _y;
            this.xFlying = _xFlying;
            this.yFlying = _yFlying;
            this.size = _size;
            this.direction = _direction;
        }
        move() {
            let randomX = (Math.random() * 10 - 1) * 10;
            if (randomX < 0) {
                randomX *= -1; // Umdrehen der X-Komponente, um sicherzustellen, dass sie positiv ist
            }
            // Bewegung basierend auf der Richtung
            this.xFlying -= this.direction.x;
            this.yFlying -= this.direction.y;
            this.x += this.direction.x;
            this.y += this.direction.y;
            // Wenn der Kranich den Canvas verlässt, erscheint er auf der gegenüberliegenden Seite
            if (this.x > EntenteichClasses.crc2.canvas.width) {
                this.x = 0;
            }
            else if (this.x < 0) {
                this.x = EntenteichClasses.crc2.canvas.width;
            }
            if (this.xFlying >= 300 || this.xFlying <= 50) {
                this.direction.x *= -1;
            }
        }
        draw() {
            EntenteichClasses.crc2.save();
            EntenteichClasses.crc2.translate(this.x, this.y);
            EntenteichClasses.crc2.scale(this.size, this.size);
            if (this.direction.x > 0) {
                EntenteichClasses.crc2.scale(-1, 1); // Spiegeln in der x-Richtung
            }
            // Körper zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(0, 0, 50, 15, 0.3 * Math.PI, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = 'white';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Hals zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(-26, -40);
            EntenteichClasses.crc2.lineTo(-26, -70);
            EntenteichClasses.crc2.lineTo(-16, -70);
            EntenteichClasses.crc2.lineTo(-16, -40);
            EntenteichClasses.crc2.fillStyle = 'white';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Kopf zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(-26, -80, 14, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = 'white';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Auge zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(-30, -85, 3, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = 'white';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.strokeStyle = "black";
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(-30, -85, 2, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = 'black';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            // Schnabel zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(-38, -85);
            EntenteichClasses.crc2.lineTo(-60, -80);
            EntenteichClasses.crc2.lineTo(-38, -75);
            EntenteichClasses.crc2.fillStyle = 'orange';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Beine zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(-10, 10); // Adjust the y-coordinate to start higher up
            EntenteichClasses.crc2.lineTo(-10, 60);
            EntenteichClasses.crc2.lineTo(-20, 60);
            EntenteichClasses.crc2.moveTo(0, 8); // Adjust the y-coordinate to start higher up
            EntenteichClasses.crc2.lineTo(0, 60);
            EntenteichClasses.crc2.lineTo(-10, 60);
            EntenteichClasses.crc2.strokeStyle = 'orange';
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            // Flügel zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(10, 0, 50, 10, 0.9, 0, Math.PI * 2);
            EntenteichClasses.crc2.fillStyle = "grey";
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            EntenteichClasses.crc2.restore();
        }
        drawFlying() {
            EntenteichClasses.crc2.save();
            EntenteichClasses.crc2.translate(this.xFlying, this.yFlying);
            EntenteichClasses.crc2.scale(this.size, this.size);
            if (this.direction.x < 0) {
                EntenteichClasses.crc2.scale(-1, 1); // Spiegeln in der x-Richtung
            }
            // Körper zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(20, -45, 50, 15, 0 * Math.PI, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = 'white';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Hals zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(-26, -40);
            EntenteichClasses.crc2.lineTo(-26, -70);
            EntenteichClasses.crc2.lineTo(-16, -70);
            EntenteichClasses.crc2.lineTo(-16, -40);
            EntenteichClasses.crc2.fillStyle = 'white';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Kopf zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(-26, -80, 14, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = 'white';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Auge zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(-30, -85, 3, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = 'white';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.strokeStyle = "black";
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(-30, -85, 2, 0, 2 * Math.PI);
            EntenteichClasses.crc2.fillStyle = 'black';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            // Schnabel zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(-38, -85);
            EntenteichClasses.crc2.lineTo(-60, -80);
            EntenteichClasses.crc2.lineTo(-38, -75);
            EntenteichClasses.crc2.fillStyle = 'orange';
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Flügel zeichnen
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(25, -50, 50, 13, 0, 0, Math.PI * 2);
            EntenteichClasses.crc2.fillStyle = "grey";
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            EntenteichClasses.crc2.restore();
        }
    }
    EntenteichClasses.Heron = Heron;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Heron.js.map