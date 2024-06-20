"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad);
    EntenteichClasses.allObjects = [];
    let Button;
    function handleLoad(_event) {
        //query selector um auf den canvas zuzugreifen und überprüfen ob er da ist
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        EntenteichClasses.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleCanvasClick);
        //Funktioniert nicht
        Button = document.querySelector("#Button");
        Button.addEventListener("click", clickToCreateDuck);
        for (let i = 0; i < 7; i++) {
            //neue Wolke wird an zufälliger Position erzeugt
            let cloud = new EntenteichClasses.Cloud(Math.random() * 200, Math.random() * 150, 0, new EntenteichClasses.Vector(0, 0), "white");
            //Wolken werden an des Array angehängt
            EntenteichClasses.allObjects.push(cloud);
        }
        let tree = new EntenteichClasses.Tree(389, 320);
        console.log(tree);
        EntenteichClasses.allObjects.push(tree);
        for (let i = 0; i < 7; i++) {
            EntenteichClasses.allObjects.push(createDuck());
        }
        for (let i = 0; i < 4; i++) {
            EntenteichClasses.allObjects.push(createHeron());
        }
        let bush = new EntenteichClasses.Bush(200, 200);
        console.log(bush);
        EntenteichClasses.allObjects.push(bush);
        for (let i = 0; i < 8; i++) {
            //neue Biene wird an zufälliger Position erzeugt
            let randomX = Math.random() * 2 - 1; // Zufällige Zahl zwischen -1 und 1 für die x-Richtung
            let randomY = Math.random() * 2 - 1; // Zufällige Zahl zwischen -1 und 1 für die y-Richtung
            let bee = new EntenteichClasses.Bee(Math.random() * 500, Math.random() * 500, 0.5, new EntenteichClasses.Vector(randomX, randomY));
            //Bienen werden an des Array angehängt
            EntenteichClasses.allObjects.push(bee);
        }
        drawBackground();
        setInterval(animate, 40);
    }
    function createDuck() {
        let r = Math.random();
        let state = EntenteichClasses.DuckState.Swim;
        let x = 100 + Math.random() * 200;
        let y = 340 + Math.random() * 70;
        if (r < 0.3) {
            state = EntenteichClasses.DuckState.Stand;
            x = 200 + Math.random() * 300;
            y = 450 + Math.random() * 80;
        }
        else if (r > 0.8) {
            state = EntenteichClasses.DuckState.Dive;
            x = 70 + Math.random() * 70;
            y = 350 + Math.random() * 100;
        }
        let color = Math.random() < 0.5 ? "yellow" : "brown"; // Zufällige Farbe (gelb oder braun)
        let duck = new EntenteichClasses.Duck(x, y, 10, 5, new EntenteichClasses.Vector(1, 0), color, state);
        return duck;
    }
    function clickToCreateDuck() {
        for (let i = 0; i < 1; i++) {
            EntenteichClasses.allObjects.push(createDuck());
        }
    }
    function createHeron() {
        let r = Math.random();
        let state = EntenteichClasses.HeronState.Swim;
        let x; //Math.random() * 50 - 1;
        if (r < 0.5) {
            state = EntenteichClasses.HeronState.Swim;
            x = 70 + Math.random() * 200; // x-Koordinate für den stehenden Kranich
        }
        else {
            // x-Koordinate für den schwimmenden Kranich zwischen 50 und 350
            x = 70 + Math.random() * 300;
        }
        let y = 370 + Math.random() * 100;
        if (r < 0.5) {
            state = EntenteichClasses.HeronState.Stand;
            x = 70 + Math.random() * 200;
            y = 450 + Math.random() * 80;
        }
        let color = Math.random() < 0.5 ? "yellow" : "brown"; // Zufällige Farbe (gelb oder braun)
        let herons = new EntenteichClasses.Heron(x, y, 0.6, new EntenteichClasses.Vector(1, 0), color, state);
        return herons;
    }
    function animate() {
        console.log("animate");
        drawBackground();
        for (let object of EntenteichClasses.allObjects) {
            object.update();
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
    //Funktioniert noch nicht
    function handleCanvasClick(_event) {
        console.log("canvas is clicked");
        // Mausposition im Canvas-Koordinatensystem erhalten
        const canvasRect = _event.target.getBoundingClientRect();
        const x = _event.clientX - canvasRect.left;
        const y = _event.clientY - canvasRect.top; //Berechnung der Klick Koordinaten
        // console.log (x,y)
        let duckClicked = false; //Variable für  zur verfolgung des Klicks
        let heronClicked = false;
        //Checken ob Ente geklickt wurde
        for (const object of EntenteichClasses.allObjects) {
            if (object instanceof EntenteichClasses.Duck) {
                // Wenn das Objekt eine Ente ist
                const duck = object;
                if (duck.checkHit(x, y)) {
                    // Überprüfe, ob die Ente getroffen wurde mit checkHit in der Entenklasse
                    duckClicked = true;
                    break; // Wenn eine Ente getroffen wurde, beende die Schleife
                }
            }
        }
        //Checken ob Kranich geklickt wurde
        for (const object of EntenteichClasses.allObjects) {
            if (object instanceof EntenteichClasses.Heron) {
                // Wenn das Objekt ein Kranich ist
                const heron = object;
                if (heron.checkHit(x, y)) {
                    // Überprüfe, ob der Kranich getroffen wurde mit checkHit in der Kranichklasse
                    heronClicked = true;
                    break; // Wenn ein Kranich getroffen wurde, beende die Schleife
                }
            }
        }
        // Nur Breadcrumbs erstellen, wenn keine Ente geklickt wurde
        if (!duckClicked && !heronClicked) {
            let bread = new EntenteichClasses.BreadCrumps(x - 25, y - 50); //Neus Brot an der geklickten stelle erzeugen
            //console.log(bread);
            EntenteichClasses.allObjects.push(bread); //neues Brotobjekt in den allObjects Array pushen
            let closestDuck = null; // Variable, um die nächste Ente zu speichern
            let closestDistance = Infinity; // Variable, um die kürzeste Distanz zu speichern
            // Finden der nächsten Ente zur Klickposition
            for (const object of EntenteichClasses.allObjects) {
                if (object instanceof EntenteichClasses.Duck) {
                    // Wenn das Objekt eine Ente ist
                    const duck = object;
                    const distance = Math.sqrt((duck.x - x) ** 2 + (duck.y - y) ** 2); // Berechnung der Distanz zur Ente
                    const stateRun = EntenteichClasses.DuckState.Run;
                    const stateEat = EntenteichClasses.DuckState.Eat;
                    if (distance < closestDistance && duck.state !== stateRun && duck.state !== stateEat) {
                        // Wenn die Distanz kürzer ist als die bisher kürzeste
                        closestDistance = distance;
                        closestDuck = duck; // Speichere diese Ente als nächste Ente
                    }
                }
            }
            if (closestDuck) {
                //closestDuck.moveTo(x, y);
                closestDuck.setTarget(x, y); // Setze das Ziel der Ente auf die Klickposition
            }
        }
    }
    function removeBreadCrumpsAt(_x, _y, _size) {
        EntenteichClasses.allObjects = EntenteichClasses.allObjects.filter((object) => {
            if (object instanceof EntenteichClasses.BreadCrumps) {
                // Wenn das Objekt ein Brotkrumen ist
                const breadCrumps = object;
                const distance = Math.sqrt((breadCrumps.x - _x) ** 2 + (breadCrumps.y - _y) ** 2); // Berechnung der Distanz zum Brotkrumen
                if (distance <= _size + 50) {
                    // Wenn der Brotkrumen nah an einer Ente ist
                    return false; // Entfernt dieses Objekt aus dem Array
                }
            }
            return true; // Behalte alle anderen Objekte im Array
        });
    }
    EntenteichClasses.removeBreadCrumpsAt = removeBreadCrumpsAt;
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