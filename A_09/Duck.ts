namespace EntenteichClasses {
    
    export class Duck{
        x:number;
        y:number;
        xStanding: number;
        yStanding: number;
        xTail: number;
        yTail: number;
        direction: number;
        standingDirection: number;
        color: string;
        size: number;
        state: string;

        constructor (_x:number, _y:number, _color: string, _state:string){
            //console.log("Duck Constructor")
            this.x = _x;
            this.y = _y;
            this.state = _state;
            // this.xStanding= _xStanding;
            // this.yStanding= _yStanding;
            // this.xTail= _xTail;
            // this.yTail= _yTail;
            this.direction = this.getRandomDirection();
            this.standingDirection = this.getRandomDirection();
            this.color = _color;
            if (_color === "yellow" || _color === "gold") {
                this.color = _color;
            } else {
                this.color = "brown"; // Wenn nicht, ist die Ente braun
            }
        }

        move ():void{
            //console.log("Duck move")
            this.x += this.direction;
            this.xStanding -= this.standingDirection;
            this.xTail -= this.direction* 0.5;;

            if (this.x >= 300 || this.x <= 50) {
                this.direction *= -1;
            }

            if (this.xTail >= 300 || this.xTail <= 50) {
                this.direction *= -1;
            }

            if (this.xStanding >= 400) {
                this.xStanding = 0; // Ente erscheint auf der linken Seite
            } else if (this.xStanding <= 0) {
                this.xStanding = 400; // Ente erscheint auf der rechten Seite
            }
        }

        getRandomDirection(): number {
            let rand = Math.random();
            if (rand < 0.33) {
                return -1; // Links
            } else if (rand < 0.66) {
                return 1; // Rechts
            } else {
                return 0; // Keine Bewegung
            }
        }

        draw():void {

            switch (this.state) {
                case "swim":
                    this.drawSwimming();
                    break;
                case "dive":
                this.drawTail;
                break;
            default:
                this.drawStanding();
            }
        }

        drawSwimming():void{
            //console.log("Duck draw")
            crc2.save();

            // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
            crc2.translate(this.x, this.y);
            crc2.scale(this.direction, 1);
    
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

        drawStanding(): void {
            crc2.save();
    
            // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
            crc2.translate(this.x, this.y);
            crc2.scale(-this.standingDirection, 1);
        
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

        drawTail(): void {
            crc2.save();
        
            // Verschieben des Ursprungs des Koordinatensystems zur Position des Entenschwanzes
            crc2.translate(this.x, this.y);
            crc2.scale(this.direction, 1);
        
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
            crc2.ellipse(-3, 0, 6, 14, 0,Math.PI, 0); // Linker Flügel als halbe Ellipse
            crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
            crc2.fill();
            crc2.closePath();
        
            // Wiederherstellen des ursprünglichen Zustands des Canvas
            crc2.restore();
        }  

    }
}