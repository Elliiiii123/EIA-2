"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class HeronSwimming extends EntenteichClasses.Heron {
        constructor(_x, _y, _size, _direction, _color) {
            //console.log("Duck Constructor")
            super(_x, _y, _size, _direction, _color);
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
    }
    EntenteichClasses.HeronSwimming = HeronSwimming;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=HeronSwimming.js.map