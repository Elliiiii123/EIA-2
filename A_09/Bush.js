"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Bush extends EntenteichClasses.Drawable {
        constructor(_x, _y) {
            //console.log("Bush Constructor")
            super(_x, _y);
        }
        draw() {
            //console.log("Bush draw")
            let numberOfParticles = 50; // Anzahl der Partikel in der Wolke
            let cloudWidth = 80; // Breite der Wolke
            let cloudHeight = 70; // Höhe der Wolke
            let xPosition = 310; // Feste X-Position der Wolke
            let yPosition = 580; // Y-Position der Wolke
            let random = EntenteichClasses.pseudoRandom(42);
            for (let i = 0; i < numberOfParticles; i++) {
                let x = xPosition + (i * (cloudWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
                let y = yPosition + (random() * cloudHeight); // Zufällige Y-Position innerhalb der Wolke
                this.drawBushParticle(x, y); // Partikel zeichnen
            }
        }
        drawBushParticle(x, y) {
            EntenteichClasses.crc2.save();
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(x, y, 15, 0, Math.PI * 2); // Kreispartikel zeichnen
            EntenteichClasses.crc2.fillStyle = "#006400";
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.restore();
        }
    }
    EntenteichClasses.Bush = Bush;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Bush.js.map