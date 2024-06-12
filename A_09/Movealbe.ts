namespace EntenteichClasses {
    export abstract class Moveable extends Drawable{
        protected direction: Vector;
        protected color: string;
        protected size: number;

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
    
        protected abstract move():void 

        protected abstract draw(): void 

        public update(): void {
            this.draw();
            this.move();
        }
    }
}