namespace EntenteichClasses {
    export class BreadCrumps extends Drawable {

        constructor (_x:number, _y:number){
            //console.log("BreadCrumps Constructor")
            super(_x,_y)
        }

        public checkHit ():void {
            this.draw();
          }
    
        protected draw():void{
            //console.log("BreadCrumps draw")
            let numberOfParticles: number = 7; // Anzahl der Partikel in der Wolke
            let breadWidth: number = 80; // Breite der Wolke
            let breadHeight: number = 70; // Höhe der Wolke
            let xPosition: number = 310; // Feste X-Position der Wolke
            let yPosition: number = 580; // Y-Position der Wolke
            let random = pseudoRandom(42)
        
            for (let i = 0; i < numberOfParticles; i++) {
                let x = xPosition + (i * (breadWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
                let y = yPosition + (random() * breadHeight); // Zufällige Y-Position innerhalb der Wolke
                this.drawBreadParticle(x, y); // Partikel zeichnen
            }
        }
    
        private drawBreadParticle(x: number, y: number): void {
      
            crc2.save();
            crc2.beginPath();
            crc2.arc(x, y, 5, 0, Math.PI * 2); // Kreispartikel zeichnen
            crc2.fillStyle = "brown"; 
            crc2.fill();
            crc2.restore();    
        }
    }
}    