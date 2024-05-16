"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Cloud {
        x;
        y;
        constructor(_x, _y) {
            //console.log("Cloud Constructor")
            this.x = _x;
            this.y = _y;
        }
        move() {
            //console.log("Cloud move");
            this.x += 1;
            if (this.x > EntenteichClasses.crc2.canvas.width) {
                this.x = -50;
            }
        }
        draw() {
            //console.log("Cloud draw")
            let numberOfParticles = 50; // Anzahl der Partikel in der Wolke
            let cloudWidth = 120; // Breite der Wolke
            let cloudHeight = 40; // Höhe der Wolke
            let random = this.pseudoRandom(42);
            EntenteichClasses.crc2.save();
            EntenteichClasses.crc2.translate(this.x, this.y);
            EntenteichClasses.crc2.restore();
            for (let i = 0; i < numberOfParticles; i++) {
                let x = this.x + (i * (cloudWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
                let y = this.y + (random() * cloudHeight); // Zufällige Y-Position innerhalb der Wolke
                this.drawCloudParticle(x, y); // Partikel zeichnen
            }
        }
        drawCloudParticle(x, y) {
            let gradient = EntenteichClasses.crc2.createRadialGradient(x, y, 0, x, y, 15);
            // Farben für den Gradienten festlegen
            gradient.addColorStop(0, "white"); // Der Innenbereich des Partikels ist undurchsichtig (weiß)
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Der äußere Bereich des Partikels wird transparent
            // Stelle den Gradienten als Füllfarbe für das Partikel ein
            EntenteichClasses.crc2.save();
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(x, y, 15, 0, Math.PI * 2); // Kreispartikel zeichnen
            EntenteichClasses.crc2.fillStyle = gradient; // Gradient für Wolke
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.restore();
        }
        pseudoRandom(seed) {
            let value = seed;
            return function () {
                value = (value * 9301 + 49297) % 233280;
                return value / 233280;
            };
        }
    }
    EntenteichClasses.Cloud = Cloud;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Cloud.js.map