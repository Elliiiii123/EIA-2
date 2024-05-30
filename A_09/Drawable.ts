namespace EntenteichClasses {
    export class Drawable {
        x:number;
        y:number;

        constructor (_x:number, _y:number){
            this.x = _x;
            this.y = _y;
        }

        draw() :void {
            console.log("draw Movable")
        }
    }
}