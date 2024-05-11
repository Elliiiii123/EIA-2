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
            // let centerX:Vector = this.position; // X-Koordinate des Mittelpunkts des Sees
            // let centerY:Vector = this.position; // Y-Koordinate des Mittelpunkts des Sees
            // let radiusX:number = this.size; // Horizontaler Radius des Sees
            // let radiusY:number = this.size; // Vertikaler Radius des Sees
            // crc2.beginPath();
            // crc2.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            // crc2.closePath();
            // // Fülle den See mit blauer Farbe
            // crc2.fillStyle = "blue";
            // crc2.fill();
        }
    }
    EntenteichClasses.Lake = Lake;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Lake.js.map