namespace EntenteichClasses {
    
    export class Bee {
        x: number;
        y: number;
        size: number;
        direction: Vector;

        constructor(_x: number, _y: number, _size: number, _direction: Vector) {
            this.x = _x;
            this.y = _y;
            this.size = _size;
            this.direction = _direction;
        }

        move(): void {
            let randomX = (Math.random() * 10 - 1) * 10; // Zufällige Zahl zwischen -1 und 1 für die x-Richtung
            
            if (randomX < 0) {
                randomX *= -1; // Umdrehen der X-Komponente, um sicherzustellen, dass sie positiv ist
            }
        
        
            // Bewegung basierend auf der Richtung
            this.x += this.direction.x;
            this.y += this.direction.y;

            // Wenn die Biene den Canvas verlässt, erscheint sie auf der gegenüberliegenden Seite
            if (this.x > crc2.canvas.width) {
                this.x = 0;
            } else if (this.x < 0) {
                this.x = crc2.canvas.width;
            }

            if (this.y > crc2.canvas.height) {
                this.y = 0;
            } else if (this.y < 0) {
                this.y = crc2.canvas.height;
            }
        }

        draw(): void {
            crc2.save();
            crc2.beginPath();
            crc2.translate(this.x, this.y);
            crc2.scale(this.size, this.size);

            if (this.direction.x < 0) {
                crc2.scale(-1, 1);
            }

            crc2.beginPath();
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.ellipse(0, 0, 16, 8, 0, 0, 2 * Math.PI);
            crc2.fillStyle = "#FFD700";
            crc2.fill();
            crc2.closePath();

            // Schwarze Streifen auf dem Körper der Biene
            crc2.beginPath();
            crc2.moveTo(-8, -8);
            crc2.lineTo(-8, 8);
            crc2.moveTo(-4, -8);
            crc2.lineTo(-4, 8);
            crc2.moveTo(0, -8);
            crc2.lineTo(0, 8);
            crc2.moveTo(4, -8);
            crc2.lineTo(4, 8);
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();

            // Auge der Biene
            crc2.beginPath();
            crc2.arc(9, -1, 2, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            // Flügel der Biene (weiße Ellipsen)
            crc2.beginPath();
            crc2.ellipse(-6, -10, 8, 4, 0, 0, 2 * Math.PI);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();

            crc2.beginPath();
            crc2.ellipse(-6, -12, 8, 4, 0.5, 0, 2 * Math.PI);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.closePath();

            crc2.restore();
        }

    }
}