"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad);
    let clouds = [];
    let ducks = [];
    let herons = [];
    let drawables = [];
    let moveables = [];
    //Drawables.push (newBush());
    //drawables.push(newTree());
    // for (let d of drawables)
    // d.draw
    function handleLoad(_event) {
        //query selector um auf den canvas zuzugreifen und überprüfen ob er da ist
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        EntenteichClasses.crc2 = canvas.getContext("2d");
        for (let i = 0; i < 4; i++) {
            //neue Wolke wird an zufälliger Position erzeugt
            let cloud = new EntenteichClasses.Cloud(Math.random() * 200, Math.random() * 150);
            //Wolken werden an des Array angehängt
            clouds.push(cloud);
        }
        let tree = new EntenteichClasses.Tree(389, 320);
        console.log(tree);
        tree.draw();
        drawables.push(tree);
        for (let i = 0; i < 7; i++) {
            let x = 100 + Math.random() * 200;
            let y = 340 + Math.random() * 70;
            let xTail = 70 + Math.random() * 70;
            let yTail = 350 + Math.random() * 100;
            let xStanding = 200 + Math.random() * 300;
            let yStanding = 450 + Math.random() * 80;
            let duck = new EntenteichClasses.Duck(x, y, xStanding, yStanding, xTail, yTail, "brown");
            let duckYellow = new EntenteichClasses.Duck(x, y, xStanding, yStanding, xTail, yTail, "yellow");
            ducks.push(duck);
            ducks.push(duckYellow);
        }
        for (let i = 0; i < 4; i++) {
            let randomX = Math.random() * 2 - 1; // Zufällige Zahl zwischen -1 und 1 für die x-Richtung
            let randomY = 450 + Math.random() * 200; // Zufällige y-Position zwischen 400 und 600
            let xFlying = 70 + Math.random() * 200;
            let yFlying = 350 + Math.random() * 100;
            let heron = new EntenteichClasses.Heron(Math.random() * 200, randomY, xFlying, yFlying, 0.5, new EntenteichClasses.Vector(randomX, 0));
            // Kranich nur zum Array hinzufügen, wenn y-Position zwischen 400 und 600 liegt
            if (randomY >= 400 && randomY <= 600) {
                herons.push(heron);
            }
        }
        let bush = new EntenteichClasses.Bush(310, 580);
        console.log(bush);
        bush.draw();
        drawables.push(bush);
        for (let i = 0; i < 8; i++) {
            //neue Biene wird an zufälliger Position erzeugt
            let randomX = Math.random() * 2 - 1; // Zufällige Zahl zwischen -1 und 1 für die x-Richtung
            let randomY = Math.random() * 2 - 1; // Zufällige Zahl zwischen -1 und 1 für die y-Richtung
            let bee = new EntenteichClasses.Bee(Math.random() * 500, Math.random() * 500, 0.5, new EntenteichClasses.Vector(randomX, randomY));
            //Bienen werden an des Array angehängt
            moveables.push(bee);
        }
        drawBackground();
        setInterval(animate, 40);
    }
    function animate() {
        console.log("animate");
        drawBackground();
        for (let i = 0; i < 4; i++) {
            clouds[i].move();
            clouds[i].draw();
        }
        for (let drawable of drawables) {
            drawable.draw();
        }
        for (let i = 0; i < 7; i++) {
            ducks[i].move();
            ducks[i].draw();
            ducks[i].drawStanding();
            ducks[i].drawTail();
        }
        for (let moveable of moveables) {
            moveable.move();
            moveable.draw();
        }
        for (let i = 0; i < herons.length; i++) {
            herons[i].move();
            herons[i].draw();
            herons[i].drawFlying();
        }
    }
    function drawBackground() {
        //console.log("Background");
        let gradient = EntenteichClasses.crc2.createLinearGradient(0, 0, 0, EntenteichClasses.crc2.canvas.height);
        gradient.addColorStop(0.1, "#2980b9");
        gradient.addColorStop(0.27, "orangered"); // Adjusted the position to 0.4 to match the desired position
        gradient.addColorStop(0.27, "hsl(120, 60%, 30%)");
        EntenteichClasses.crc2.fillStyle = gradient;
        EntenteichClasses.crc2.fillRect(0, 0, EntenteichClasses.crc2.canvas.width, EntenteichClasses.crc2.canvas.height);
        drawSun();
        drawMountain();
        drawForrest();
        drawHouse();
        drawLake();
        drawFlower(200, 563, "pink");
        drawFlowers();
    }
    function drawSun() {
        //Zentrum und Radius des Gradienten für die Sonne
        var centerX = EntenteichClasses.crc2.canvas.width / 2;
        var centerY = 180; // Die y-Koordinate, wo die grüne Fläche endet
        var sunRadius = Math.min(EntenteichClasses.crc2.canvas.width, EntenteichClasses.crc2.canvas.height) / 10;
        //Erstelle den radialen Gradienten für die Sonne
        var gradient = EntenteichClasses.crc2.createRadialGradient(centerX, centerY, sunRadius, centerX, centerY, sunRadius * 3);
        gradient.addColorStop(0, "#ffb624"); // Anfang des Gradienten
        gradient.addColorStop(0.9, "rgba(255, 165, 0, 0.2)"); // Ende des Gradienten
        gradient.addColorStop(1, "rgba(255, 165, 0, 0.05)"); // Ende des Gradienten
        //Zeichne den Gradienten um die Sonne herum
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.fillStyle = gradient;
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(centerX, centerY, sunRadius * 3, 0, Math.PI * 2);
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.restore();
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.beginPath();
    }
    function drawMountain() {
        //console.log("Mountain");
        let color = "#aaaaaa";
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.translate(0, 280);
        EntenteichClasses.crc2.fillStyle = color;
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.moveTo(0, 0);
        EntenteichClasses.crc2.lineTo(390, 0);
        EntenteichClasses.crc2.lineTo(390, -50);
        EntenteichClasses.crc2.lineTo(300, -80);
        EntenteichClasses.crc2.lineTo(190, -55);
        EntenteichClasses.crc2.lineTo(130, -80);
        EntenteichClasses.crc2.lineTo(70, -60);
        EntenteichClasses.crc2.lineTo(0, -65);
        EntenteichClasses.crc2.closePath();
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.restore();
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.translate(0, 290);
        EntenteichClasses.crc2.fillStyle = "grey";
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.moveTo(0, 0);
        EntenteichClasses.crc2.lineTo(390, 0);
        EntenteichClasses.crc2.lineTo(390, -60);
        EntenteichClasses.crc2.lineTo(330, -30);
        EntenteichClasses.crc2.lineTo(240, -55);
        EntenteichClasses.crc2.lineTo(170, -35);
        EntenteichClasses.crc2.lineTo(100, -65);
        EntenteichClasses.crc2.lineTo(50, -40);
        EntenteichClasses.crc2.lineTo(0, -60);
        EntenteichClasses.crc2.closePath();
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.restore();
    }
    function pseudoRandom(seed) {
        let value = seed;
        return function () {
            value = (value * 9301 + 49297) % 233280;
            return value / 233280;
        };
    }
    EntenteichClasses.pseudoRandom = pseudoRandom;
    function drawForrest() {
        //console.log("Forrest");
        let numberOfParticles = 170; // Anzahl der Partikel im Büschel
        let forrestHeight = 20; // Höhe des Büschels
        let yPosition = 270; // Y-Position der Horizontlinie
        let random = pseudoRandom(42);
        for (let i = 0; i < numberOfParticles; i++) {
            let x = random() * EntenteichClasses.crc2.canvas.width; // Zufällige X-Position im Canvas
            let y = yPosition + random() * forrestHeight; // Zufällige Y-Position in der Nähe der Horizontlinie
            drawForrestParticle(x, y); // Partikel zeichnen
        }
    }
    function drawForrestParticle(x, y) {
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(x, y, 7, 0, Math.PI * 2); // Kreispartikel zeichnen
        EntenteichClasses.crc2.fillStyle = "darkgreen"; // Grün für Büsche
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.restore();
    }
    function drawHouse() {
        //console.log("House")
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.translate(10, 340);
        EntenteichClasses.crc2.fillStyle = "#a0522d";
        EntenteichClasses.crc2.strokeStyle = "#4a2f1b";
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.moveTo(0, 0);
        EntenteichClasses.crc2.lineTo(50, 0);
        EntenteichClasses.crc2.lineTo(50, -50);
        EntenteichClasses.crc2.lineTo(0, -50);
        EntenteichClasses.crc2.lineTo(0, 0);
        EntenteichClasses.crc2.moveTo(0, -50);
        EntenteichClasses.crc2.lineTo(20, -75);
        EntenteichClasses.crc2.lineTo(70, -75);
        EntenteichClasses.crc2.lineTo(50, -50);
        EntenteichClasses.crc2.moveTo(50, -50);
        EntenteichClasses.crc2.lineTo(80, -60);
        EntenteichClasses.crc2.lineTo(70, -75);
        EntenteichClasses.crc2.moveTo(80, -60);
        EntenteichClasses.crc2.lineTo(80, -20);
        EntenteichClasses.crc2.lineTo(50, 0);
        EntenteichClasses.crc2.lineTo(50, -50);
        EntenteichClasses.crc2.closePath();
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.stroke();
        EntenteichClasses.crc2.restore();
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.translate(75, 330);
        EntenteichClasses.crc2.fillStyle = "#a0522d";
        EntenteichClasses.crc2.strokeStyle = "#4a2f1b";
        EntenteichClasses.crc2.moveTo(0, 0);
        EntenteichClasses.crc2.lineTo(10, -6);
        EntenteichClasses.crc2.lineTo(10, -40);
        EntenteichClasses.crc2.lineTo(0, -35);
        EntenteichClasses.crc2.closePath();
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.stroke();
        EntenteichClasses.crc2.restore();
    }
    function drawLake() {
        let centerX = 220; // X-Koordinate des Mittelpunkts des Sees
        let centerY = 390; // Y-Koordinate des Mittelpunkts des Sees
        let radiusX = 190; // Horizontaler Radius des Sees
        let radiusY = 70; // Vertikaler Radius des Sees
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        EntenteichClasses.crc2.closePath();
        EntenteichClasses.crc2.fillStyle = "blue";
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.restore();
    }
    function drawFlower(x, y, color) {
        EntenteichClasses.crc2.save();
        // Verschieben des Ursprungs des Koordinatensystems zur Position der Blume
        EntenteichClasses.crc2.translate(x, y);
        EntenteichClasses.crc2.scale(0.5, 0.5);
        // Zeichnen des Kreises in der Mitte
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(0, 0, 8, 0, Math.PI * 2); // Kreis in der Mitte
        EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kreis
        EntenteichClasses.crc2.fill();
        // Zeichnen der Blütenblätter drumherum
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
            let petalX = Math.cos(angle) * 14; // Größere Blütenblätter
            let petalY = Math.sin(angle) * 14; // Größere Blütenblätter
            EntenteichClasses.crc2.save(); // Zustand speichern, um die Transformation für jedes Blütenblatt einzeln anzuwenden
            EntenteichClasses.crc2.translate(petalX, petalY); // Blütenblatt an die gewünschte Position verschieben
            EntenteichClasses.crc2.rotate(angle); // Blütenblatt drehen, um um den Kreis herum zu rotieren
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(0, 0);
            EntenteichClasses.crc2.quadraticCurveTo(10, -10, 17, 0); // Größere Blütenblätter
            EntenteichClasses.crc2.quadraticCurveTo(10, 10, -5, 5); // Größere Blütenblätter
            EntenteichClasses.crc2.fillStyle = color; // Verwenden der übergebenen Farbe
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.restore(); // Zustand wiederherstellen, um mit dem nächsten Blütenblatt fortzufahren
        }
        // Wiederherstellen des ursprünglichen Zustands des Canvas
        EntenteichClasses.crc2.restore();
    }
    function drawFlowers() {
        // Anzahl der Blumen, die du zeichnen möchtest
        let numFlowers = 15;
        // Bereich, in dem die Blumen auf der Wiese verteilt werden sollen
        let minX = 50; // Mindestwert für die X-Position
        let maxX = EntenteichClasses.crc2.canvas.width - 50; // Maximale Breite des Canvas minus 50 (um Platz für die Blumen zu lassen)
        let minY = 470; // Untere Hälfte des Canvas
        let random = pseudoRandom(15);
        for (let i = 0; i < numFlowers; i++) {
            // Zufällige Position innerhalb des definierten Bereichs generieren
            let randomX = minX + random() * (maxX - minX);
            let randomY = minY + random() * (EntenteichClasses.crc2.canvas.height - minY);
            // Zufällige Farbe für die Blume auswählen
            let randomColor = ["red", "blue", "purple", "orange"][Math.floor(random() * 4)]; // Beispiel für Farben, du kannst weitere hinzufügen
            // Blume an der zufälligen Position zeichnen
            drawFlower(randomX, randomY, randomColor);
        }
    }
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=EntenteichClasses.js.map