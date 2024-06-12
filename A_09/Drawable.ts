namespace EntenteichClasses {
    export abstract class Drawable {
        protected x:number;
        protected y:number;

        constructor (_x:number, _y:number){
            this.x = _x;
            this.y = _y;
        }

        protected abstract draw() :void 
           
        

        public update(): void {
            this.draw();
        }
    }
}