namespace EntenteichClasses {
    export class Cloud extends Moveable{

        constructor (_x:number, _y:number, _size: number, _direction: Vector, _color: string){
            //console.log("Cloud Constructor")
            super(_x,_y,_size,_direction,_color)
        }
    
        move ():void{
            //console.log("Cloud move");
            this.x +=1;

            if (this.x > crc2.canvas.width) {
                this.x = -50;
            }
        }
    
        draw():void{
            //console.log("Cloud draw")
            let numberOfParticles: number = 50; // Anzahl der Partikel in der Wolke
            let cloudWidth: number = 120; // Breite der Wolke
            let cloudHeight: number = 40; // Höhe der Wolke

            let random = this.pseudoRandom(42)

            crc2.save();
            crc2.translate(this.x,this.y);
            crc2.restore();
        
            for (let i = 0; i < numberOfParticles; i++) {
                let x = this.x + (i * (cloudWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
                let y = this.y + (random() * cloudHeight); // Zufällige Y-Position innerhalb der Wolke
                this.drawCloudParticle(x, y); // Partikel zeichnen
            }
        }

        drawCloudParticle(x: number, y: number): void {
            let gradient = crc2.createRadialGradient(x, y, 0, x, y, 15);
    
            // Farben für den Gradienten festlegen
            gradient.addColorStop(0, "white"); // Der Innenbereich des Partikels ist undurchsichtig (weiß)
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Der äußere Bereich des Partikels wird transparent
        
            // Stelle den Gradienten als Füllfarbe für das Partikel ein
            
            crc2.save();
            crc2.beginPath();
            crc2.arc(x, y, 15, 0, Math.PI * 2); // Kreispartikel zeichnen
            crc2.fillStyle = gradient; // Gradient für Wolke
            crc2.fill();
            crc2.restore();    
        }

        pseudoRandom(seed: number): () => number {
            let value = seed;
            return function() {
                value = (value * 9301 + 49297) % 233280;
                return value / 233280;
            };
        }

    }
}