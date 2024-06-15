"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Duck extends EntenteichClasses.Moveable {
        state;
        isClicked = false;
        clickCounter = 0;
        previousState; //vorheriger Zustand der Ente
        targetX; //Klick Koordinate x
        targetY; //Klick Koordinate y
        speed;
        waitTime = 40; // Wartezeit in Frames
        waitCounter = 0; // Zähler für die Wartezeit
        previousX = null; // Speichern der vorherigen X-Position
        previousY = null; // Speichern der vorherigen Y-Position
        returning = false; // Flag, um anzuzeigen, ob die Ente zurückkehrt
        constructor(_x, _y, _size, _speed, _direction, _color, _state) {
            super(_x, _y, _size, _direction, _color);
            //console.log("Duck Constructor")
            this.state = _state;
            this.direction = Duck.getRandomDirection();
            this.previousState = _state;
            this.targetX = null;
            this.targetY = null;
            this.speed = _speed;
        }
        move() {
            if (this.returning) {
                // Bewegung zur vorherigen Position
                const dx = this.previousX - this.x; // Differenz in x-Richtung zur vorherigen Position
                const dy = this.previousY - this.y; // Differenz in y-Richtung zur vorherigen Position
                const distance = Math.sqrt(dx * dx + dy * dy); // Berechne die Entfernung zur vorherigen Position
                if (distance > this.speed) {
                    // Wenn die Entfernung größer ist als die Geschwindigkeit der Ente, bewegt sich die Ente in Richtung der vorherigen Position
                    this.x += (dx / distance) * this.speed;
                    this.y += (dy / distance) * this.speed;
                }
                else {
                    // Wenn die Ente die vorherige Position erreicht hat
                    this.x = this.previousX;
                    this.y = this.previousY;
                    this.returning = false; // Beende den Rückweg
                    this.previousX = null;
                    this.previousY = null;
                    this.state = this.previousState; // Ente wird in ihren verherigen State gesetzt
                }
            }
            else if (this.targetX !== null && this.targetY !== null) {
                // Wenn ein Klick gesetzt ist
                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy); // Berechne die Entfernung zum Klick
                if (distance > this.speed) {
                    // Wenn die Entfernung größer ist als die Geschwindigkeit der Ente, bewege die Ente in Richtung des Klicks
                    this.x += (dx / distance) * this.speed;
                    this.y += (dy / distance) * this.speed;
                }
                else {
                    // Wenn die Ente die Koordinaten des Kicks erreicht hat
                    this.x = this.targetX;
                    this.y = this.targetY;
                    this.targetX = null;
                    this.targetY = null;
                    this.state = EntenteichClasses.DuckState.Eat; // Wechsel zum Esszustand
                    this.waitCounter = this.waitTime; // Setze den Zähler zum Pausieren der Entenbewegung
                    EntenteichClasses.removeBreadCrumpsAt(this.x, this.y, this.size); // Entferne die Brotkrumen wenn die Ente an der Koordinate ist
                }
            }
            else if (this.waitCounter > 0) {
                // Wenn die Ente Pausiert/Isst
                this.waitCounter--; //Die Zeit die sie pausiert wird runtergezählt
                if (this.waitCounter <= 0) {
                    this.returning = true; // Beginne den Rückweg
                    this.state = EntenteichClasses.DuckState.Run; // Während des Rückwegs im Run State
                }
            }
            else {
                switch (this.state) {
                    case EntenteichClasses.DuckState.Swim: // wenn die Ente schwimmt
                        this.x += this.direction.x;
                        if (this.x >= 360 || this.x <= 50) {
                            this.direction.x *= -1;
                        }
                        break;
                    case EntenteichClasses.DuckState.Dive: // wenn die Ente taucht
                        this.x += this.direction.x * 0.5;
                        if (this.x >= 360 || this.x <= 50) {
                            this.direction.x *= -1;
                        }
                        break;
                    default: // wenn die Ente steht
                        this.x += this.direction.x;
                        if (this.x >= 400) {
                            this.x = 0; // Ente erscheint auf der linken Seite
                        }
                        else if (this.x <= 0) {
                            this.x = 400; // Ente erscheint auf der rechten Seite
                        }
                }
            }
            //Wenn die Ente angeklickt wird
            if (this.isClicked) {
                this.clickCounter++;
                if (this.clickCounter >= 7) { //Ente verändert sieben Frames lang ihren zustand
                    this.clickCounter = 0;
                    this.isClicked = false; // Setze den Klickzustand zurück
                    this.state = this.previousState; // Ente wird in ihren vorherigen Zustand gesetzt
                }
            }
        }
        static getRandomDirection() {
            let rand = Math.random();
            if (rand < 0.45) {
                return new EntenteichClasses.Vector(-1, 0); // Links
            }
            else if (rand < 0.9) {
                return new EntenteichClasses.Vector(1, 0); // Rechts
            }
            else {
                return new EntenteichClasses.Vector(0, 0); // Keine Bewegung
            }
        }
        setTarget(_x, _y) {
            this.previousX = this.x; // Speichern der aktuellen Position
            this.previousY = this.y;
            this.targetX = _x; // Geklickte position setzen
            this.targetY = _y;
            this.state = EntenteichClasses.DuckState.Run; // Ente in den Run State
        }
        checkHit(_x, _y) {
            const minX = _x - 3 * this.size;
            const maxX = _x + 3 * this.size;
            const minY = _y - 2 * this.size;
            const maxY = _y + 2 * this.size; // Grenzen um die Ente Festlegen
            // Überprüfen, ob das Klickereignis innerhalb des Rechtecks liegt
            if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
                this.click(); // Aufruf der click Methode
                // break Schleife verlassen, wenn die Ente gefunden wurde
                return true; //true zurückgeben wenn Ente nicht getroffen wird
            }
            else {
                return false; //false zurückgeben wenn Ente nicht getroffen wird
            }
        }
        click() {
            //console.log("duck is clicked");
            if (!this.isClicked) {
                //Ente ist nicht schon angeklickt
                this.isClicked = true; //Ente ist geklickt
                this.previousState = this.state; //Aktuellen zustand der Ente speichern
                this.state = EntenteichClasses.DuckState.Shock; //ENten zustand zu Shock Zustand ändern
            }
        }
        draw() {
            if (this.isClicked) {
                this.drawShock();
            }
            else {
                switch (this.state) {
                    case EntenteichClasses.DuckState.Swim:
                        this.drawSwimming();
                        break;
                    case EntenteichClasses.DuckState.Dive:
                        this.drawTail();
                        break;
                    case EntenteichClasses.DuckState.Run:
                        this.drawRun();
                        break;
                    case EntenteichClasses.DuckState.Eat:
                        this.drawEat();
                        break;
                    default:
                        this.drawStanding();
                }
            }
        }
        drawSwimming() {
            //console.log("Duck draw")
            EntenteichClasses.crc2.save();
            // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
            EntenteichClasses.crc2.translate(this.x, this.y);
            if (this.direction.x != 0)
                EntenteichClasses.crc2.scale(this.direction.x, 1);
            // Körper der Ente als Ellipse
            let bodyRadiusX = 15; // Horizontaler Radius des Körpers
            let bodyRadiusY = 10; // Vertikaler Radius des Körpers
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
            if (this.color === "brown") {
                EntenteichClasses.crc2.fillStyle = "brown";
            }
            else {
                EntenteichClasses.crc2.fillStyle = "yellow";
            }
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Kopf der Ente als Kreis
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(20, -5, 5, 0, Math.PI * 2); // Kopf als Kreis
            if (this.color === "brown") {
                EntenteichClasses.crc2.fillStyle = "brown";
            }
            else {
                EntenteichClasses.crc2.fillStyle = "yellow";
            }
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
            if (this.color === "brown") {
                EntenteichClasses.crc2.fillStyle = "lightblue";
            }
            else {
                EntenteichClasses.crc2.fillStyle = "brown";
            }
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Wiederherstellen des ursprünglichen Zustands des Canvas
            EntenteichClasses.crc2.restore();
        }
        drawStanding() {
            EntenteichClasses.crc2.save();
            // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
            EntenteichClasses.crc2.translate(this.x, this.y);
            if (this.direction.x != 0)
                EntenteichClasses.crc2.scale(this.direction.x, 1);
            // Körper der Ente als Ellipse
            let bodyRadiusX = 15; // Horizontaler Radius des Körpers
            let bodyRadiusY = 10; // Vertikaler Radius des Körpers
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
            EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Kopf der Ente als Kreis mit variabler Rotation
            EntenteichClasses.crc2.rotate(0); // Rotation des Kopfes
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
        drawTail() {
            EntenteichClasses.crc2.save();
            // Verschieben des Ursprungs des Koordinatensystems zur Position des Entenschwanzes
            EntenteichClasses.crc2.translate(this.x, this.y);
            if (this.direction.x != 0)
                EntenteichClasses.crc2.scale(-this.direction.x, 1);
            // Körper der Ente als halbe Ellipse
            let bodyRadiusX = 7; // Horizontaler Radius des Körpers
            let bodyRadiusY = 10; // Vertikaler Radius des Körpers
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, Math.PI, 0, Math.PI); // Körper als halbe Ellipse
            EntenteichClasses.crc2.fillStyle = "yellow";
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
        drawShock() {
            //console.log("Duck draw")
            EntenteichClasses.crc2.save();
            // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
            EntenteichClasses.crc2.translate(this.x, this.y);
            if (this.direction.x != 0)
                EntenteichClasses.crc2.scale(this.direction.x, 1);
            // Körper der Ente als Ellipse
            let bodyRadiusX = 15; // Horizontaler Radius des Körpers
            let bodyRadiusY = 15; // Vertikaler Radius des Körpers
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
            if (this.color === "brown") {
                EntenteichClasses.crc2.fillStyle = "brown";
            }
            else {
                EntenteichClasses.crc2.fillStyle = "yellow";
            }
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Kopf der Ente als Kreis
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(0, -17, 8, 0, Math.PI * 2); // Kopf als Kreis
            if (this.color === "brown") {
                EntenteichClasses.crc2.fillStyle = "brown";
            }
            else {
                EntenteichClasses.crc2.fillStyle = "yellow";
            }
            EntenteichClasses.crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Auge der Ente als Kreis
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(-4, -19, 2, 0, Math.PI * 2); // Auge als Kreis
            EntenteichClasses.crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Auge 2 der Ente als Kreis
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(4, -19, 2, 0, Math.PI * 2); // Auge als Kreis
            EntenteichClasses.crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Schnabel der Ente
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(0, -15);
            EntenteichClasses.crc2.lineTo(5, -13);
            EntenteichClasses.crc2.lineTo(0, -11);
            EntenteichClasses.crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            // Linker Flügel der Ente als schmale Ellipse
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(-17, -10, 15, 7, 4, 0, Math.PI * 2); // Linker Flügel als Ellipse
            if (this.color === "brown") {
                EntenteichClasses.crc2.fillStyle = "lightblue";
            }
            else {
                EntenteichClasses.crc2.fillStyle = "brown";
            }
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Rechter Flügel der Ente als schmale Ellipse
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(17, -10, 7, 15, -5.5, 0, Math.PI * 2); // Linker Flügel als Ellipse
            if (this.color === "brown") {
                EntenteichClasses.crc2.fillStyle = "lightblue";
            }
            else {
                EntenteichClasses.crc2.fillStyle = "brown";
            }
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Wiederherstellen des ursprünglichen Zustands des Canvas
            EntenteichClasses.crc2.restore();
        }
        drawRun() {
            EntenteichClasses.crc2.save();
            // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
            EntenteichClasses.crc2.translate(this.x, this.y);
            if (this.direction.x != 0)
                EntenteichClasses.crc2.scale(this.direction.x, 1);
            // Körper der Ente als Ellipse
            let bodyRadiusX = 15; // Horizontaler Radius des Körpers
            let bodyRadiusY = 10; // Vertikaler Radius des Körpers
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
            EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Kopf der Ente als Kreis mit variabler Rotation
            EntenteichClasses.crc2.rotate(0); // Rotation des Kopfes
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
            EntenteichClasses.crc2.ellipse(-4, -7, 15, 7, 10, 0, Math.PI * 2); // Rechter Flügel als Ellipse
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
        drawEat() {
            EntenteichClasses.crc2.save();
            // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
            EntenteichClasses.crc2.translate(this.x, this.y);
            if (this.direction.x != 0)
                EntenteichClasses.crc2.scale(this.direction.x, 1);
            // Körper der Ente als Ellipse
            let bodyRadiusX = 15; // Horizontaler Radius des Körpers
            let bodyRadiusY = 10; // Vertikaler Radius des Körpers
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 7, 0, Math.PI * 2); // Körper als Ellipse
            EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Kopf der Ente als Kreis mit variabler Rotation
            EntenteichClasses.crc2.rotate(0); // Rotation des Kopfes
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(20, 20, 5, 0, Math.PI * 2); // Kopf als Kreis
            EntenteichClasses.crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kopf
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Auge der Ente als Kreis
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.arc(22, 20, 2, 0, Math.PI * 2); // Auge als Kreis
            EntenteichClasses.crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.closePath();
            // Schnabel der Ente
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(20, 23);
            EntenteichClasses.crc2.lineTo(25, 28);
            EntenteichClasses.crc2.lineTo(20, 26);
            EntenteichClasses.crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
            EntenteichClasses.crc2.stroke();
            EntenteichClasses.crc2.closePath();
            // Rechter Flügel der Ente als schmale Ellipse
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.ellipse(-4, -7, 15, 7, 10, 0, Math.PI * 2); // Rechter Flügel als Ellipse
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
    }
    EntenteichClasses.Duck = Duck;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Duck.js.map