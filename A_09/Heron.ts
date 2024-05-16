namespace EntenteichClasses {
    
    export class Heron{
        x:number;
        y:number;
        xFlying: number;
        yFlying: number;
        direction: Vector;
        size: number;

        constructor (_x:number, _y:number, _xFlying:number, _yFlying:number, _size: number, _direction: Vector){
            //console.log("Duck Constructor")
            this.x = _x;
            this.y = _y;
            this.xFlying= _xFlying;
            this.yFlying= _yFlying;
            this.size = _size;
            this.direction = _direction;
        }

        move ():void{
            let randomX = (Math.random() * 10 - 1) * 10;

            if (randomX < 0) {
                randomX *= -1; // Umdrehen der X-Komponente, um sicherzustellen, dass sie positiv ist
            }

            // Bewegung basierend auf der Richtung
            this.xFlying -= this.direction.x;
            this.yFlying -= this.direction.y;
            this.x += this.direction.x;
            this.y += this.direction.y;

            // Wenn der Kranich den Canvas verlässt, erscheint er auf der gegenüberliegenden Seite
            if (this.x > crc2.canvas.width) {
                this.x = 0;
            } else if (this.x < 0) {
                this.x = crc2.canvas.width;
            }

            if (this.xFlying >= 300 || this.xFlying <= 50) {
                this.direction.x *= -1;
            }


        }

        draw ():void{

            crc2.save();
            crc2.translate(this.x, this.y);
            crc2.scale(this.size, this.size);
            if (this.direction.x > 0) {
                crc2.scale(-1, 1); // Spiegeln in der x-Richtung
            }

            // Körper zeichnen
            crc2.beginPath();
            crc2.ellipse(0, 0, 50, 15, 0.3 * Math.PI, 0, 2 * Math.PI);
            crc2.fillStyle = 'white';
            crc2.fill();
            crc2.closePath();

            // Hals zeichnen
            crc2.beginPath();
            crc2.moveTo(-26, -40);
            crc2.lineTo(-26, -70);
            crc2.lineTo(-16, -70);
            crc2.lineTo(-16, -40);
            crc2.fillStyle = 'white';
            crc2.fill();
            crc2.closePath();

            // Kopf zeichnen
            crc2.beginPath();
            crc2.arc(-26, -80, 14, 0, 2 * Math.PI);
            crc2.fillStyle = 'white';
            crc2.fill();
            crc2.closePath();

            // Auge zeichnen
            crc2.beginPath();
            crc2.arc(-30, -85, 3, 0, 2 * Math.PI);
            crc2.fillStyle = 'white';
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();

            crc2.beginPath();
            crc2.arc(-30, -85, 2, 0, 2 * Math.PI);
            crc2.fillStyle = 'black';
            crc2.fill();
            crc2.stroke();
            crc2.closePath();

            // Schnabel zeichnen
            crc2.beginPath();
            crc2.moveTo(-38, -85);
            crc2.lineTo(-60, -80);
            crc2.lineTo(-38, -75);
            crc2.fillStyle = 'orange';
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
            crc2.strokeStyle = 'orange';
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

        drawFlying():void{

            crc2.save();
            crc2.translate(this.xFlying, this.yFlying);
            crc2.scale(this.size, this.size);
            if (this.direction.x < 0) {
                crc2.scale(-1, 1); // Spiegeln in der x-Richtung
            }

            // Körper zeichnen
            crc2.beginPath();
            crc2.ellipse(20, -45, 50, 15, 0 * Math.PI, 0, 2 * Math.PI);
            crc2.fillStyle = 'white';
            crc2.fill();
            crc2.closePath();

            // Hals zeichnen
            crc2.beginPath();
            crc2.moveTo(-26, -40);
            crc2.lineTo(-26, -70);
            crc2.lineTo(-16, -70);
            crc2.lineTo(-16, -40);
            crc2.fillStyle = 'white';
            crc2.fill();
            crc2.closePath();

            // Kopf zeichnen
            crc2.beginPath();
            crc2.arc(-26, -80, 14, 0, 2 * Math.PI);
            crc2.fillStyle = 'white';
            crc2.fill();
            crc2.closePath();

            // Auge zeichnen
            crc2.beginPath();
            crc2.arc(-30, -85, 3, 0, 2 * Math.PI);
            crc2.fillStyle = 'white';
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();

            crc2.beginPath();
            crc2.arc(-30, -85, 2, 0, 2 * Math.PI);
            crc2.fillStyle = 'black';
            crc2.fill();
            crc2.stroke();
            crc2.closePath();

            // Schnabel zeichnen
            crc2.beginPath();
            crc2.moveTo(-38, -85);
            crc2.lineTo(-60, -80);
            crc2.lineTo(-38, -75);
            crc2.fillStyle = 'orange';
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
        
    }
}