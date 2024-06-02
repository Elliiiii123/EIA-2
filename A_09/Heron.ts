namespace EntenteichClasses {
    
    export class Heron extends Moveable{

        constructor (_x:number, _y:number, _size: number, _direction: Vector, _color: string){
            //console.log("Duck Constructor")
            super(_x, _y, _size, _direction, _color);
        }

        move ():void{
            let randomX = (Math.random() * 10 - 1) * 10;

            if (randomX < 0) {
                randomX *= -1; // Umdrehen der X-Komponente, um sicherzustellen, dass sie positiv ist
            }

            // Bewegung basierend auf der Richtung
            //this.xFlying -= this.direction.x;
            //this.yFlying -= this.direction.y;
            this.x += this.direction.x;
            this.y += this.direction.y;

            // Wenn der Kranich den Canvas verlässt, erscheint er auf der gegenüberliegenden Seite
            if (this.x > crc2.canvas.width) {
                this.x = 0;
            } else if (this.x < 0) {
                this.x = crc2.canvas.width;
            }

            //if (this.xFlying >= 300 || this.xFlying <= 50) {
            //     this.direction.x *= -1;
            // }
        }
    }
}