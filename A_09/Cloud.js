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
            console.log("Cloud draw");
            let numberOfParticles = 50; // Anzahl der Partikel in der Wolke
            let cloudWidth = 120; // Breite der Wolke
            let cloudHeight = 40; // Höhe der Wolke
            let xPosition = 40; // Feste X-Position der Wolke
            let yPosition = 50; // Y-Position der Wolke
            let random = EntenteichClasses.pseudoRandom(42);
            for (let i = 0; i < numberOfParticles; i++) {
                let x = xPosition + (i * (cloudWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
                let y = yPosition + (random() * cloudHeight); // Zufällige Y-Position innerhalb der Wolke
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
    }
    EntenteichClasses.Cloud = Cloud;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Cloud.js.map