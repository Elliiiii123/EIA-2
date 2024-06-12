namespace EntenteichClasses {
    export class Bush extends Drawable{

        constructor (_x:number, _y:number){
            //console.log("Bush Constructor")
            super(_x,_y)
        }
    
        protected draw():void{
            //console.log("Bush draw")
            let numberOfParticles: number = 50; // Anzahl der Partikel in der Wolke
            let cloudWidth: number = 80; // Breite der Wolke
            let cloudHeight: number = 70; // Höhe der Wolke
            let xPosition: number = 310; // Feste X-Position der Wolke
            let yPosition: number = 580; // Y-Position der Wolke
            let random = pseudoRandom(42)
        
            for (let i = 0; i < numberOfParticles; i++) {
                let x = xPosition + (i * (cloudWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
                let y = yPosition + (random() * cloudHeight); // Zufällige Y-Position innerhalb der Wolke
                this.drawBushParticle(x, y); // Partikel zeichnen
            }
        }
    
        private drawBushParticle(x: number, y: number): void {
      
            crc2.save();
            crc2.beginPath();
            crc2.arc(x, y, 15, 0, Math.PI * 2); // Kreispartikel zeichnen
            crc2.fillStyle = "#006400"; 
            crc2.fill();
            crc2.restore();    
        }
    }
    
    
}