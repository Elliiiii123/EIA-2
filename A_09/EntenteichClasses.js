"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        //query selector um auf den canvas zuzugreifen und überprüfen ob er da ist
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        EntenteichClasses.crc2 = canvas.getContext("2d");
        drawBackground();
        drawSun();
        drawMountain();
        drawForrest();
        drawCloud();
        drawHouse();
        drawTree();
        drawLake();
        drawDuck(200, 400);
        drawStandingDuck(300, 500, -0);
        drawDuckTail(170, 370);
        drawFlower(200, 563, "pink");
        drawFlowers();
        drawBush();
        let duck = new EntenteichClasses.Duck;
        console.log(duck);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = EntenteichClasses.crc2.createLinearGradient(0, 0, 0, EntenteichClasses.crc2.canvas.height);
        gradient.addColorStop(0.1, "#2980b9");
        gradient.addColorStop(0.27, "orangered"); // Adjusted the position to 0.4 to match the desired position
        gradient.addColorStop(0.27, "hsl(120, 60%, 30%)");
        EntenteichClasses.crc2.fillStyle = gradient;
        EntenteichClasses.crc2.fillRect(0, 0, EntenteichClasses.crc2.canvas.width, EntenteichClasses.crc2.canvas.height);
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
        console.log("Mountain");
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
        console.log("Forrest");
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
        console.log("House");
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
    let tree = new EntenteichClasses.Tree();
    console.log(tree);
    tree.draw();
    //später weg, nur weil class net funktioniert
    function drawTree() {
        console.log("Tree draw");
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.translate(390, 320);
        EntenteichClasses.crc2.fillStyle = "brown";
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.moveTo(0, 0);
        EntenteichClasses.crc2.lineTo(-60, 0);
        EntenteichClasses.crc2.lineTo(-48, -20);
        EntenteichClasses.crc2.lineTo(-45, -50);
        EntenteichClasses.crc2.lineTo(-40, -100);
        EntenteichClasses.crc2.lineTo(-90, -120);
        EntenteichClasses.crc2.lineTo(-100, -130);
        EntenteichClasses.crc2.lineTo(-90, -125);
        EntenteichClasses.crc2.lineTo(-50, -120);
        EntenteichClasses.crc2.lineTo(-60, -150);
        EntenteichClasses.crc2.lineTo(-100, -170);
        EntenteichClasses.crc2.lineTo(-140, -170);
        EntenteichClasses.crc2.lineTo(-100, -180);
        EntenteichClasses.crc2.lineTo(-140, -190);
        EntenteichClasses.crc2.lineTo(-90, -185);
        EntenteichClasses.crc2.lineTo(-55, -170);
        EntenteichClasses.crc2.lineTo(-30, -140);
        EntenteichClasses.crc2.lineTo(-30, -180);
        EntenteichClasses.crc2.lineTo(-70, -200);
        EntenteichClasses.crc2.lineTo(-90, -220);
        EntenteichClasses.crc2.lineTo(-30, -190);
        EntenteichClasses.crc2.lineTo(0, -230);
        EntenteichClasses.crc2.lineTo(0, -200);
        EntenteichClasses.crc2.lineTo(-5, -150);
        EntenteichClasses.crc2.lineTo(0, -160);
        EntenteichClasses.crc2.lineTo(0, -130);
        EntenteichClasses.crc2.lineTo(-5, -100);
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.restore();
    }
    let cloud = new EntenteichClasses.Cloud();
    console.log(cloud);
    cloud.draw();
    function drawCloud() {
        console.log("Forrest");
        let numberOfParticles = 50; // Anzahl der Partikel in der Wolke
        let cloudWidth = 120; // Breite der Wolke
        let cloudHeight = 40; // Höhe der Wolke
        let xPosition = 40; // Feste X-Position der Wolke
        let yPosition = 50; // Y-Position der Wolke
        let random = pseudoRandom(42);
        for (let i = 0; i < numberOfParticles; i++) {
            let x = xPosition + (i * (cloudWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
            let y = yPosition + (random() * cloudHeight); // Zufällige Y-Position innerhalb der Wolke
            drawCloudParticle(x, y); // Partikel zeichnen
        }
    }
    function drawCloudParticle(x, y) {
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
    let lake = new EntenteichClasses.Lake();
    console.log(EntenteichClasses.Lake);
    lake.draw();
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
    function drawDuck(x, y) {
        EntenteichClasses.crc2.save();
        // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
        EntenteichClasses.crc2.translate(x, y);
        // Körper der Ente als Ellipse
        let bodyRadiusX = 15; // Horizontaler Radius des Körpers
        let bodyRadiusY = 10; // Vertikaler Radius des Körpers
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
        EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Kopf der Ente als Kreis
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(20, -5, 5, 0, Math.PI * 2); // Kopf als Kreis
        EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kopf
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Auge der Ente als Kreis
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(22, -5, 2, 0, Math.PI * 2); // Auge als Kreis
        EntenteichClasses.crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Schnabel der Ente
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.moveTo(25, -5);
        EntenteichClasses.crc2.lineTo(30, -3);
        EntenteichClasses.crc2.lineTo(25, -1);
        EntenteichClasses.crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
        EntenteichClasses.crc2.stroke();
        EntenteichClasses.crc2.closePath();
        // Linker Flügel der Ente als schmale Ellipse
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.ellipse(-4, -2, 15, 7, -0.2, 0, Math.PI * 2); // Linker Flügel als Ellipse
        EntenteichClasses.crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Wiederherstellen des ursprünglichen Zustands des Canvas
        EntenteichClasses.crc2.restore();
    }
    function drawStandingDuck(x, y, headRotation) {
        EntenteichClasses.crc2.save();
        // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
        EntenteichClasses.crc2.translate(x, y);
        EntenteichClasses.crc2.scale(-1, 1);
        // Körper der Ente als Ellipse
        let bodyRadiusX = 15; // Horizontaler Radius des Körpers
        let bodyRadiusY = 10; // Vertikaler Radius des Körpers
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
        EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Kopf der Ente als Kreis mit variabler Rotation
        EntenteichClasses.crc2.rotate(headRotation); // Rotation des Kopfes
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(20, -5, 5, 0, Math.PI * 2); // Kopf als Kreis
        EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kopf
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Auge der Ente als Kreis
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(22, -5, 2, 0, Math.PI * 2); // Auge als Kreis
        EntenteichClasses.crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Schnabel der Ente
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.moveTo(25, -5);
        EntenteichClasses.crc2.lineTo(30, -3);
        EntenteichClasses.crc2.lineTo(25, -1);
        EntenteichClasses.crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
        EntenteichClasses.crc2.stroke();
        EntenteichClasses.crc2.closePath();
        // Rechter Flügel der Ente als schmale Ellipse
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.ellipse(-4, -2, 15, 7, -0.2, 0, Math.PI * 2); // Rechter Flügel als Ellipse
        EntenteichClasses.crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Beine der Ente 
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.moveTo(0, 7); // Startpunkt des Beins
        EntenteichClasses.crc2.lineTo(0, 15); // Obere Linie des Beins
        EntenteichClasses.crc2.lineTo(-3, 15); // Schräge Linie des Beins
        EntenteichClasses.crc2.lineTo(-3, 7); // Untere Linie des Beins
        EntenteichClasses.crc2.strokeStyle = "brown"; // Braune Farbe für die Beine
        EntenteichClasses.crc2.stroke();
        EntenteichClasses.crc2.closePath();
        // Wiederherstellen des ursprünglichen Zustands des Canvas
        EntenteichClasses.crc2.restore();
    }
    let duck = new EntenteichClasses.Duck();
    console.log(EntenteichClasses.Duck);
    duck.draw();
    function drawDuckTail(x, y) {
        EntenteichClasses.crc2.save();
        // Verschieben des Ursprungs des Koordinatensystems zur Position des Entenschwanzes
        EntenteichClasses.crc2.translate(x, y);
        // Körper der Ente als halbe Ellipse
        let bodyRadiusX = 7; // Horizontaler Radius des Körpers
        let bodyRadiusY = 10; // Vertikaler Radius des Körpers
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, Math.PI, 0, Math.PI); // Körper als halbe Ellipse
        EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Linker Flügel der Ente als halbe Ellipse
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.ellipse(-3, 0, 6, 14, 0, Math.PI, 0); // Linker Flügel als halbe Ellipse
        EntenteichClasses.crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.closePath();
        // Wiederherstellen des ursprünglichen Zustands des Canvas
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
    function drawBush() {
        console.log("Forrest");
        let numberOfParticles = 50; // Anzahl der Partikel in der Wolke
        let cloudWidth = 80; // Breite der Wolke
        let cloudHeight = 70; // Höhe der Wolke
        let xPosition = 310; // Feste X-Position der Wolke
        let yPosition = 580; // Y-Position der Wolke
        let random = pseudoRandom(42);
        for (let i = 0; i < numberOfParticles; i++) {
            let x = xPosition + (i * (cloudWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
            let y = yPosition + (random() * cloudHeight); // Zufällige Y-Position innerhalb der Wolke
            drawBushParticle(x, y); // Partikel zeichnen
        }
    }
    function drawBushParticle(x, y) {
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(x, y, 15, 0, Math.PI * 2); // Kreispartikel zeichnen
        EntenteichClasses.crc2.fillStyle = "#006400";
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.restore();
    }
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=EntenteichClasses.js.map