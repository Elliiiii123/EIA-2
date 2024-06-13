"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Duck extends EntenteichClasses.Moveable {
        state;
        isClicked = false;
        clickCounter = 0;
        previousState;
        targetX;
        targetY;
        speed;
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
            //console.log("Duck move")
            if (this.targetX !== null && this.targetY !== null) {
                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > this.speed) {
                    this.x += (dx / distance) * this.speed;
                    this.y += (dy / distance) * this.speed;
                }
                else {
                    this.x = this.targetX;
                    this.y = this.targetY;
                    this.targetX = null;
                    this.targetY = null;
                    if (this.state === EntenteichClasses.DuckState.Run) {
                        this.state = this.previousState;
                    }
                }
            }
            if (this.isClicked) {
                this.clickCounter++;
                if (this.clickCounter >= 5) {
                    this.clickCounter = 0;
                    this.isClicked = false;
                    this.state = this.previousState;
                }
            }
            switch (this.state) {
                case EntenteichClasses.DuckState.Run:
                case EntenteichClasses.DuckState.Swim:
                    this.x += this.direction.x;
                    if (this.x >= 360 || this.x <= 50) {
                        this.direction.x *= -1;
                    }
                    break;
                case EntenteichClasses.DuckState.Dive:
                    this.x += this.direction.x * 0.5;
                    if (this.x >= 360 || this.x <= 50) {
                        this.direction.x *= -1;
                    }
                    break;
                default: // assuming Duckstate.Stand ist der default state
                    this.x += this.direction.x;
                    if (this.x >= 400) {
                        this.x = 0; // Ente erscheint auf der linken Seite
                    }
                    else if (this.x <= 0) {
                        this.x = 400; // Ente erscheint auf der rechten Seite
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
        setTarget(x, y) {
            this.targetX = x;
            this.targetY = y;
            this.state = EntenteichClasses.DuckState.Run;
        }
        checkHit(_x, _y) {
            const minX = _x - 3 * this.size;
            const maxX = _x + 3 * this.size;
            const minY = _y - 2 * this.size;
            const maxY = _y + 2 * this.size;
            // Überprüfen, ob das Klickereignis innerhalb des Rechtecks liegt
            if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
                this.click(); // Aufruf einer Methode in der Duck-Klasse, um den Klick zu behandeln
                // break Schleife verlassen, wenn die Ente gefunden wurde
                return true;
            }
            else {
                return false;
            }
        }
        click() {
            console.log("duck is clicked");
            if (!this.isClicked) {
                this.isClicked = true;
                this.previousState = this.state;
                this.state = EntenteichClasses.DuckState.Shock;
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
            EntenteichClasses.crc2.ellipse(-4, -2, 15, 7, 2, 0, Math.PI * 2); // Rechter Flügel als Ellipse
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