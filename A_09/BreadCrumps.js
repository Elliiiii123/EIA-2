"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class BreadCrumps extends EntenteichClasses.Drawable {
        constructor(_x, _y) {
            //console.log("BreadCrumps Constructor")
            super(_x, _y);
        }
        checkHit() {
            this.draw();
        }
        draw() {
            //console.log("BreadCrumps draw")
            let numberOfParticles = 7; // Anzahl der Partikel in der Wolke
            let breadWidth = 80; // Breite der Wolke
            let breadHeight = 70; // Höhe der Wolke
            let random = EntenteichClasses.pseudoRandom(42);
            for (let i = 0; i < numberOfParticles; i++) {
                let x = this.x + (i * (breadWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
                let y = this.y + (random() * breadHeight); // Zufällige Y-Position innerhalb der Wolke
                this.drawBreadParticle(x, y); // Partikel zeichnen
            }
        }
        drawBreadParticle(_x, _y) {
            EntenteichClasses.crc2.save();
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(_x, _y, 4, 0, Math.PI * 2); // Kreispartikel zeichnen
            EntenteichClasses.crc2.fillStyle = "brown";
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.restore();
        }
    }
    EntenteichClasses.BreadCrumps = BreadCrumps;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=BreadCrumps.js.map