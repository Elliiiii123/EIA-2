namespace EntenteichClasses {
    export class Moveable extends Drawable{
        direction: Vector;
        color: string;
        size: number;

        constructor (_x: number, _y: number,_size: number, _direction: Vector, _color: string){
            //console.log("Duck Constructor")
            super(_x, _y);
            this.size = _size;
            this.direction = _direction;
            this.color = _color;
            if (_color === "yellow" || _color === "gold") {
                this.color = _color;
            } else {
                this.color = "brown"; // Wenn nicht, ist die Ente braun
            }
        }
    
        move():void {
            console.log("moveable move");
        }

        draw(): void {
            super.draw(); // Aufruf der draw-Methode der Superklasse
        }
    }
}