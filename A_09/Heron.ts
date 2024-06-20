namespace EntenteichClasses {
  export class Heron extends Moveable {
    private state: HeronState;
    private isClicked: boolean = false;
    private clickCounter: number = 0;
    private previousState: HeronState; //vorheriger Zustand des Kranich

    constructor(
      _x: number,
      _y: number,
      _size: number,
      _direction: Vector,
      _color: string,
      _state: HeronState
    ) {
      //console.log("Duck Constructor")
      super(_x, _y, _size, _direction, _color);
      this.state = _state;
      this.previousState = _state;
    }

    protected move(): void {
      //console.log("Duck move")

      this.x += this.direction.x;
      this.y += this.direction.y;
      switch (this.state) {
        case HeronState.Swim:
          if (
            (this.x >= 350 && this.direction.x > 0) ||
            (this.x <= 80 && this.direction.x < 0)
          ) {
            this.direction.x *= -1;
          }
          break;
        case HeronState.Shock:
          //Wenn der Kranich angeklickt wird
          if (this.isClicked) {
            this.clickCounter++;
            if (this.clickCounter >= 7) {
              //Kranich verändert sieben Frames lang seinen zustand
              this.clickCounter = 0;
              this.isClicked = false; // Setze den Klickzustand zurück
              this.state = this.previousState; // Kranich wird in seinen vorherigen Zustand gesetzt
            }
          }
        default: // assuming "standing" is the default state
          if (this.x > crc2.canvas.width) {
            this.x = 0;
          } else if (this.x < 0) {
            this.x = crc2.canvas.width;
          }
      }
    }

    public checkHit(_x: number, _y: number): boolean {
      //console.log(_x, _y);
      const minX = _x - 20 * this.size;
      const maxX = _x + 20 * this.size;
      const minY = _y - 40 * this.size;
      const maxY = _y + 70 * this.size; // Grenzen um die Ente Festlegen
      // Überprüfen, ob das Klickereignis innerhalb des Rechtecks liegt

      if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
        this.click(); // Aufruf der click Methode
        // break Schleife verlassen, wenn die Ente gefunden wurde
        return true; //true zurückgeben wenn Ente nicht getroffen wird
      } else {
        return false; //false zurückgeben wenn Ente nicht getroffen wird
      }
    }

    public click(): void {
      //console.log("heron is clicked");
      if (!this.isClicked) {
        //Ente ist nicht schon angeklickt
        this.isClicked = true; //Ente ist geklickt
        this.previousState = this.state; //Aktuellen zustand der Ente speichern
        this.state = HeronState.Shock; //ENten zustand zu Shock Zustand ändern
      }
    }

    protected draw(): void {
      if (this.isClicked) {
        this.drawShock();
      } else {
        switch (this.state) {
          case HeronState.Swim:
            this.drawSwimming();
            break;
          default:
            this.drawStanding();
        }
      }
    }

    private drawSwimming(): void {
      crc2.save();
      crc2.translate(this.x, this.y);
      crc2.scale(this.size, this.size);
      if (this.direction.x > 0) {
        crc2.scale(-1, 1); // Spiegeln in der x-Richtung
      }

      // Körper zeichnen
      crc2.beginPath();
      crc2.ellipse(20, -45, 50, 15, 0 * Math.PI, 0, 2 * Math.PI);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.closePath();

      // Hals zeichnen
      crc2.beginPath();
      crc2.moveTo(-26, -40);
      crc2.lineTo(-26, -70);
      crc2.lineTo(-16, -70);
      crc2.lineTo(-16, -40);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.closePath();

      // Kopf zeichnen
      crc2.beginPath();
      crc2.arc(-26, -80, 14, 0, 2 * Math.PI);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.closePath();

      // Auge zeichnen
      crc2.beginPath();
      crc2.arc(-30, -85, 3, 0, 2 * Math.PI);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.strokeStyle = "black";
      crc2.stroke();
      crc2.closePath();

      crc2.beginPath();
      crc2.arc(-30, -85, 2, 0, 2 * Math.PI);
      crc2.fillStyle = "black";
      crc2.fill();
      crc2.stroke();
      crc2.closePath();

      // Schnabel zeichnen
      crc2.beginPath();
      crc2.moveTo(-38, -85);
      crc2.lineTo(-60, -80);
      crc2.lineTo(-38, -75);
      crc2.fillStyle = "orange";
      crc2.fill();
      crc2.closePath();

      // Flügel zeichnen
      crc2.beginPath();
      crc2.ellipse(25, -50, 50, 13, 0, 0, Math.PI * 2);
      crc2.fillStyle = "grey";
      crc2.fill();
      crc2.closePath();

      crc2.restore();
    }

    private drawStanding(): void {
      crc2.save();
      crc2.translate(this.x, this.y);
      crc2.scale(this.size, this.size);
      if (this.direction.x > 0) {
        crc2.scale(-1, 1); // Spiegeln in der x-Richtung
      }

      // Körper zeichnen
      crc2.beginPath();
      crc2.ellipse(0, 0, 50, 15, 0.3 * Math.PI, 0, 2 * Math.PI);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.closePath();

      // Hals zeichnen
      crc2.beginPath();
      crc2.moveTo(-26, -40);
      crc2.lineTo(-26, -70);
      crc2.lineTo(-16, -70);
      crc2.lineTo(-16, -40);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.closePath();

      // Kopf zeichnen
      crc2.beginPath();
      crc2.arc(-26, -80, 14, 0, 2 * Math.PI);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.closePath();

      // Auge zeichnen
      crc2.beginPath();
      crc2.arc(-30, -85, 3, 0, 2 * Math.PI);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.strokeStyle = "black";
      crc2.stroke();
      crc2.closePath();

      crc2.beginPath();
      crc2.arc(-30, -85, 2, 0, 2 * Math.PI);
      crc2.fillStyle = "black";
      crc2.fill();
      crc2.stroke();
      crc2.closePath();

      // Schnabel zeichnen
      crc2.beginPath();
      crc2.moveTo(-38, -85);
      crc2.lineTo(-60, -80);
      crc2.lineTo(-38, -75);
      crc2.fillStyle = "orange";
      crc2.fill();
      crc2.closePath();

      // Beine zeichnen
      crc2.beginPath();
      crc2.moveTo(-10, 10); // Adjust the y-coordinate to start higher up
      crc2.lineTo(-10, 60);
      crc2.lineTo(-20, 60);
      crc2.moveTo(0, 8); // Adjust the y-coordinate to start higher up
      crc2.lineTo(0, 60);
      crc2.lineTo(-10, 60);
      crc2.strokeStyle = "orange";
      crc2.stroke();
      crc2.closePath();

      // Flügel zeichnen
      crc2.beginPath();
      crc2.ellipse(10, 0, 50, 10, 0.9, 0, Math.PI * 2);
      crc2.fillStyle = "grey";
      crc2.fill();
      crc2.closePath();

      crc2.restore();
    }

    drawShock(): void {
      crc2.save();
      crc2.translate(this.x, this.y);
      crc2.scale(this.size, this.size);
      if (this.direction.x > 0) {
        crc2.scale(-1, 1); // Spiegeln in der x-Richtung
      }

      // Körper zeichnen
      crc2.beginPath();
      crc2.ellipse(-20, -40, 15, 40, 0 * Math.PI, 0, 2 * Math.PI);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.closePath();

      // Hals zeichnen
      crc2.beginPath();
      crc2.moveTo(-26, -40);
      crc2.lineTo(-26, -70);
      crc2.lineTo(-16, -70);
      crc2.lineTo(-16, -40);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.closePath();

      // Kopf zeichnen
      crc2.beginPath();
      crc2.arc(-20, -80, 14, 0, 2 * Math.PI);
      crc2.fillStyle = "white";
      crc2.fill();
      crc2.closePath();

      // Auge zeichnen
      crc2.beginPath();
      crc2.arc(-15, -85, 3, 0, 2 * Math.PI);
      crc2.fillStyle = "black";
      crc2.fill();
      crc2.stroke();
      crc2.closePath();

      crc2.beginPath();
      crc2.arc(-25, -85, 3, 0, 2 * Math.PI);
      crc2.fillStyle = "black";
      crc2.fill();
      crc2.stroke();
      crc2.closePath();

      // Schnabel zeichnen
      crc2.beginPath();
      crc2.moveTo(-28, -75);
      crc2.lineTo(-20, -60);
      crc2.lineTo(-12, -75);
      crc2.fillStyle = "orange";
      crc2.fill();
      crc2.closePath();

      // Flügel zeichnen
      crc2.beginPath();
      crc2.ellipse(5, -60, 13, 35, -6, 0, Math.PI * 2);
      crc2.fillStyle = "grey";
      crc2.fill();
      crc2.closePath();

      // Flügel zeichnen
      crc2.beginPath();
      crc2.ellipse(-40, -60, 13, 35, 6, 0, Math.PI * 2);
      crc2.fillStyle = "grey";
      crc2.fill();
      crc2.closePath();

      crc2.restore();
    }
  }
}
