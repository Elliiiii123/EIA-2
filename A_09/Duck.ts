namespace EntenteichClasses {
  export class Duck extends Moveable {
    private state: DuckState;
    private isClicked: boolean = false;
    private clickCounter: number = 0;
    private previousState: DuckState;
    private targetX: number | null;
    private targetY: number | null;
    private speed: number;
    private waitTime: number = 40; // Wartezeit in Frames
    private waitCounter: number = 0; // Zähler für die Wartezeit
    private previousX: number | null = null; // Speichern der vorherigen X-Position
    private previousY: number | null = null; // Speichern der vorherigen Y-Position
    private returning: boolean = false; // Flag, um anzuzeigen, ob die Ente zurückkehrt

    constructor(
      _x: number,
      _y: number,
      _size: number,
      _speed: number,
      _direction: Vector,
      _color: string,
      _state: DuckState
    ) {
      super(_x, _y, _size, _direction, _color);
      //console.log("Duck Constructor")
      this.state = _state;
      this.direction = Duck.getRandomDirection();
      this.previousState = _state;
      this.targetX = null;
      this.targetY = null;
      this.speed = _speed;
    }

    protected move(): void {
      if (this.returning) {
        // Bewegung zur vorherigen Position
        const dx = this.previousX! - this.x;
        const dy = this.previousY! - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.speed) {
          this.x += (dx / distance) * this.speed;
          this.y += (dy / distance) * this.speed;
        } else {
          this.x = this.previousX!;
          this.y = this.previousY!;
          this.returning = false;
          this.previousX = null;
          this.previousY = null;
          this.state = this.previousState;
        }
      } else if (this.targetX !== null && this.targetY !== null) {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.speed) {
          this.x += (dx / distance) * this.speed;
          this.y += (dy / distance) * this.speed;
        } else {
          this.x = this.targetX;
          this.y = this.targetY;
          this.targetX = null;
          this.targetY = null;

          this.state = DuckState.Eat; // Wechsel zum Esszustand
          this.waitCounter = this.waitTime; // Setze den Wartezähler

          removeBreadCrumpsAt(this.x, this.y, this.size);
        }
      } else if (this.waitCounter > 0) {
        // Wartezeit runterzählen
        this.waitCounter--;
        if (this.waitCounter <= 0) {
          this.returning = true; // Beginne den Rückweg
          this.state = DuckState.Run; // Während des Rückwegs im Run-Status
        }
      } else {
        switch (this.state) {
          case DuckState.Swim:
            this.x += this.direction.x;
            if (this.x >= 360 || this.x <= 50) {
              this.direction.x *= -1;
            }
            break;
          case DuckState.Dive:
            this.x += this.direction.x * 0.5;
            if (this.x >= 360 || this.x <= 50) {
              this.direction.x *= -1;
            }
            break;
          default: // assuming Duckstate.Stand ist der default state
            this.x += this.direction.x;
            if (this.x >= 400) {
              this.x = 0; // Ente erscheint auf der linken Seite
            } else if (this.x <= 0) {
              this.x = 400; // Ente erscheint auf der rechten Seite
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
    }

    private static getRandomDirection(): Vector {
      let rand = Math.random();
      if (rand < 0.45) {
        return new Vector(-1, 0); // Links
      } else if (rand < 0.9) {
        return new Vector(1, 0); // Rechts
      } else {
        return new Vector(0, 0); // Keine Bewegung
      }
    }

    public setTarget(x: number, y: number): void {
      this.previousX = this.x; // Speichern der aktuellen Position
      this.previousY = this.y;
      this.targetX = x;
      this.targetY = y;
      this.state = DuckState.Run;
    }

    public checkHit(_x: number, _y: number): boolean {
      const minX = _x - 3 * this.size;
      const maxX = _x + 3 * this.size;
      const minY = _y - 2 * this.size;
      const maxY = _y + 2 * this.size;
      // Überprüfen, ob das Klickereignis innerhalb des Rechtecks liegt
      if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
        this.click(); // Aufruf einer Methode in der Duck-Klasse, um den Klick zu behandeln
        // break Schleife verlassen, wenn die Ente gefunden wurde
        return true;
      } else {
        return false;
      }
    }

    public click(): void {
      console.log("duck is clicked");
      if (!this.isClicked) {
        this.isClicked = true;
        this.previousState = this.state;
        this.state = DuckState.Shock;
      }
    }

    protected draw(): void {
      if (this.isClicked) {
        this.drawShock();
      } else {
        switch (this.state) {
          case DuckState.Swim:
            this.drawSwimming();
            break;
          case DuckState.Dive:
            this.drawTail();
            break;
          case DuckState.Run:
            this.drawRun();
            break;
          case DuckState.Eat:
            this.drawEat();
            break;
          default:
            this.drawStanding();
        }
      }
    }

    private drawSwimming(): void {
      //console.log("Duck draw")
      crc2.save();

      // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
      crc2.translate(this.x, this.y);
      if (this.direction.x != 0) crc2.scale(this.direction.x, 1);

      // Körper der Ente als Ellipse
      let bodyRadiusX = 15; // Horizontaler Radius des Körpers
      let bodyRadiusY = 10; // Vertikaler Radius des Körpers
      crc2.beginPath();
      crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
      if (this.color === "brown") {
        crc2.fillStyle = "brown";
      } else {
        crc2.fillStyle = "yellow";
      }
      crc2.fill();
      crc2.closePath();

      // Kopf der Ente als Kreis
      crc2.beginPath();
      crc2.arc(20, -5, 5, 0, Math.PI * 2); // Kopf als Kreis
      if (this.color === "brown") {
        crc2.fillStyle = "brown";
      } else {
        crc2.fillStyle = "yellow";
      }
      crc2.fill();
      crc2.closePath();

      // Auge der Ente als Kreis
      crc2.beginPath();
      crc2.arc(22, -5, 2, 0, Math.PI * 2); // Auge als Kreis
      crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
      crc2.fill();
      crc2.closePath();

      // Schnabel der Ente
      crc2.beginPath();
      crc2.moveTo(25, -5);
      crc2.lineTo(30, -3);
      crc2.lineTo(25, -1);
      crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
      crc2.stroke();
      crc2.closePath();

      // Linker Flügel der Ente als schmale Ellipse
      crc2.beginPath();
      crc2.ellipse(-4, -2, 15, 7, -0.2, 0, Math.PI * 2); // Linker Flügel als Ellipse
      if (this.color === "brown") {
        crc2.fillStyle = "lightblue";
      } else {
        crc2.fillStyle = "brown";
      }
      crc2.fill();
      crc2.closePath();

      // Wiederherstellen des ursprünglichen Zustands des Canvas
      crc2.restore();
    }

    private drawStanding(): void {
      crc2.save();

      // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
      crc2.translate(this.x, this.y);
      if (this.direction.x != 0) crc2.scale(this.direction.x, 1);

      // Körper der Ente als Ellipse
      let bodyRadiusX = 15; // Horizontaler Radius des Körpers
      let bodyRadiusY = 10; // Vertikaler Radius des Körpers
      crc2.beginPath();
      crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
      crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
      crc2.fill();
      crc2.closePath();

      // Kopf der Ente als Kreis mit variabler Rotation
      crc2.rotate(0); // Rotation des Kopfes
      crc2.beginPath();
      crc2.arc(20, -5, 5, 0, Math.PI * 2); // Kopf als Kreis
      crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kopf
      crc2.fill();
      crc2.closePath();

      // Auge der Ente als Kreis
      crc2.beginPath();
      crc2.arc(22, -5, 2, 0, Math.PI * 2); // Auge als Kreis
      crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
      crc2.fill();
      crc2.closePath();

      // Schnabel der Ente
      crc2.beginPath();
      crc2.moveTo(25, -5);
      crc2.lineTo(30, -3);
      crc2.lineTo(25, -1);
      crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
      crc2.stroke();
      crc2.closePath();

      // Rechter Flügel der Ente als schmale Ellipse
      crc2.beginPath();
      crc2.ellipse(-4, -2, 15, 7, -0.2, 0, Math.PI * 2); // Rechter Flügel als Ellipse
      crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
      crc2.fill();
      crc2.closePath();

      // Beine der Ente
      crc2.beginPath();
      crc2.moveTo(0, 7); // Startpunkt des Beins
      crc2.lineTo(0, 15); // Obere Linie des Beins
      crc2.lineTo(-3, 15); // Schräge Linie des Beins
      crc2.lineTo(-3, 7); // Untere Linie des Beins
      crc2.strokeStyle = "brown"; // Braune Farbe für die Beine
      crc2.stroke();
      crc2.closePath();

      // Wiederherstellen des ursprünglichen Zustands des Canvas
      crc2.restore();
    }

    private drawTail(): void {
      crc2.save();

      // Verschieben des Ursprungs des Koordinatensystems zur Position des Entenschwanzes
      crc2.translate(this.x, this.y);
      if (this.direction.x != 0) crc2.scale(-this.direction.x, 1);

      // Körper der Ente als halbe Ellipse
      let bodyRadiusX = 7; // Horizontaler Radius des Körpers
      let bodyRadiusY = 10; // Vertikaler Radius des Körpers
      crc2.beginPath();
      crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, Math.PI, 0, Math.PI); // Körper als halbe Ellipse
      crc2.fillStyle = "yellow";
      crc2.fill();
      crc2.closePath();

      // Linker Flügel der Ente als halbe Ellipse
      crc2.beginPath();
      crc2.ellipse(-3, 0, 6, 14, 0, Math.PI, 0); // Linker Flügel als halbe Ellipse
      crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
      crc2.fill();
      crc2.closePath();

      // Wiederherstellen des ursprünglichen Zustands des Canvas
      crc2.restore();
    }

    private drawShock(): void {
      //console.log("Duck draw")
      crc2.save();

      // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
      crc2.translate(this.x, this.y);
      if (this.direction.x != 0) crc2.scale(this.direction.x, 1);

      // Körper der Ente als Ellipse
      let bodyRadiusX = 15; // Horizontaler Radius des Körpers
      let bodyRadiusY = 15; // Vertikaler Radius des Körpers
      crc2.beginPath();
      crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
      if (this.color === "brown") {
        crc2.fillStyle = "brown";
      } else {
        crc2.fillStyle = "yellow";
      }
      crc2.fill();
      crc2.closePath();

      // Kopf der Ente als Kreis
      crc2.beginPath();
      crc2.arc(0, -17, 8, 0, Math.PI * 2); // Kopf als Kreis
      if (this.color === "brown") {
        crc2.fillStyle = "brown";
      } else {
        crc2.fillStyle = "yellow";
      }
      crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
      crc2.stroke();
      crc2.fill();
      crc2.closePath();

      // Auge der Ente als Kreis
      crc2.beginPath();
      crc2.arc(-4, -19, 2, 0, Math.PI * 2); // Auge als Kreis
      crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
      crc2.fill();
      crc2.closePath();

      // Auge 2 der Ente als Kreis
      crc2.beginPath();
      crc2.arc(4, -19, 2, 0, Math.PI * 2); // Auge als Kreis
      crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
      crc2.fill();
      crc2.closePath();

      // Schnabel der Ente
      crc2.beginPath();
      crc2.moveTo(0, -15);
      crc2.lineTo(5, -13);
      crc2.lineTo(0, -11);
      crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
      crc2.stroke();
      crc2.closePath();

      // Linker Flügel der Ente als schmale Ellipse
      crc2.beginPath();
      crc2.ellipse(-17, -10, 15, 7, 4, 0, Math.PI * 2); // Linker Flügel als Ellipse
      if (this.color === "brown") {
        crc2.fillStyle = "lightblue";
      } else {
        crc2.fillStyle = "brown";
      }
      crc2.fill();
      crc2.closePath();

      // Rechter Flügel der Ente als schmale Ellipse
      crc2.beginPath();
      crc2.ellipse(17, -10, 7, 15, -5.5, 0, Math.PI * 2); // Linker Flügel als Ellipse
      if (this.color === "brown") {
        crc2.fillStyle = "lightblue";
      } else {
        crc2.fillStyle = "brown";
      }
      crc2.fill();
      crc2.closePath();

      // Wiederherstellen des ursprünglichen Zustands des Canvas
      crc2.restore();
    }

    private drawRun(): void {
      crc2.save();

      // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
      crc2.translate(this.x, this.y);
      if (this.direction.x != 0) crc2.scale(this.direction.x, 1);

      // Körper der Ente als Ellipse
      let bodyRadiusX = 15; // Horizontaler Radius des Körpers
      let bodyRadiusY = 10; // Vertikaler Radius des Körpers
      crc2.beginPath();
      crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
      crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
      crc2.fill();
      crc2.closePath();

      // Kopf der Ente als Kreis mit variabler Rotation
      crc2.rotate(0); // Rotation des Kopfes
      crc2.beginPath();
      crc2.arc(20, -5, 5, 0, Math.PI * 2); // Kopf als Kreis
      crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kopf
      crc2.fill();
      crc2.closePath();

      // Auge der Ente als Kreis
      crc2.beginPath();
      crc2.arc(22, -5, 2, 0, Math.PI * 2); // Auge als Kreis
      crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
      crc2.fill();
      crc2.closePath();

      // Schnabel der Ente
      crc2.beginPath();
      crc2.moveTo(25, -5);
      crc2.lineTo(30, -3);
      crc2.lineTo(25, -1);
      crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
      crc2.stroke();
      crc2.closePath();

      // Rechter Flügel der Ente als schmale Ellipse
      crc2.beginPath();
      crc2.ellipse(-4, -7, 15, 7, 10, 0, Math.PI * 2); // Rechter Flügel als Ellipse
      crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
      crc2.fill();
      crc2.closePath();

      // Beine der Ente
      crc2.beginPath();
      crc2.moveTo(0, 7); // Startpunkt des Beins
      crc2.lineTo(0, 15); // Obere Linie des Beins
      crc2.lineTo(-3, 15); // Schräge Linie des Beins
      crc2.lineTo(-3, 7); // Untere Linie des Beins
      crc2.strokeStyle = "brown"; // Braune Farbe für die Beine
      crc2.stroke();
      crc2.closePath();

      // Wiederherstellen des ursprünglichen Zustands des Canvas
      crc2.restore();
    }

    private drawEat(): void {
      crc2.save();

      // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
      crc2.translate(this.x, this.y);
      if (this.direction.x != 0) crc2.scale(this.direction.x, 1);

      // Körper der Ente als Ellipse
      let bodyRadiusX = 15; // Horizontaler Radius des Körpers
      let bodyRadiusY = 10; // Vertikaler Radius des Körpers
      crc2.beginPath();
      crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 7, 0, Math.PI * 2); // Körper als Ellipse
      crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
      crc2.fill();
      crc2.closePath();

      // Kopf der Ente als Kreis mit variabler Rotation
      crc2.rotate(0); // Rotation des Kopfes
      crc2.beginPath();
      crc2.arc(20, 20, 5, 0, Math.PI * 2); // Kopf als Kreis
      crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kopf
      crc2.fill();
      crc2.closePath();

      // Auge der Ente als Kreis
      crc2.beginPath();
      crc2.arc(22, 20, 2, 0, Math.PI * 2); // Auge als Kreis
      crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
      crc2.fill();
      crc2.closePath();

      // Schnabel der Ente
      crc2.beginPath();
      crc2.moveTo(20, 23);
      crc2.lineTo(25, 28);
      crc2.lineTo(20, 26);
      crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
      crc2.stroke();
      crc2.closePath();

      // Rechter Flügel der Ente als schmale Ellipse
      crc2.beginPath();
      crc2.ellipse(-4, -7, 15, 7, 10, 0, Math.PI * 2); // Rechter Flügel als Ellipse
      crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
      crc2.fill();
      crc2.closePath();

      // Beine der Ente
      crc2.beginPath();
      crc2.moveTo(0, 7); // Startpunkt des Beins
      crc2.lineTo(0, 15); // Obere Linie des Beins
      crc2.lineTo(-3, 15); // Schräge Linie des Beins
      crc2.lineTo(-3, 7); // Untere Linie des Beins
      crc2.strokeStyle = "brown"; // Braune Farbe für die Beine
      crc2.stroke();
      crc2.closePath();

      // Wiederherstellen des ursprünglichen Zustands des Canvas
      crc2.restore();
    }
  }
}
