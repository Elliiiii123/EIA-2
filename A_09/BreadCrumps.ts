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
            let random = pseudoRandom(42)
        
            for (let i = 0; i < numberOfParticles; i++) {
                let x = this.x + (i * (breadWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
                let y = this.y + (random() * breadHeight); // Zufällige Y-Position innerhalb der Wolke
                this.drawBreadParticle(x, y); // Partikel zeichnen
            }
        }
    
        private drawBreadParticle(_x: number, _y: number): void {
      
            crc2.save();
            crc2.beginPath();
            crc2.arc(_x, _y, 4, 0, Math.PI * 2); // Kreispartikel zeichnen
            crc2.fillStyle = "brown"; 
            crc2.fill();
            crc2.restore();    
        }
    }
}    