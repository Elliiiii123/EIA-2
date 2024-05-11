namespace EntenteichClasses {
    export class Lake{
        position: Vector;
        color: string;
        size: number;
    
        constructor (){
            console.log("Lake Constructor")
        }
    
        draw():void{
            console.log("Lake draw")

            // let centerX:Vector = this.position; // X-Koordinate des Mittelpunkts des Sees
            // let centerY:Vector = this.position; // Y-Koordinate des Mittelpunkts des Sees
            // let radiusX:number = this.size; // Horizontaler Radius des Sees
            // let radiusY:number = this.size; // Vertikaler Radius des Sees
    
            // crc2.beginPath();
            // crc2.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            // crc2.closePath();
    
            // // Fülle den See mit blauer Farbe
            // crc2.fillStyle = "blue";
            // crc2.fill();
        }
    }
            
}