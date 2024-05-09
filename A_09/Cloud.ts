namespace EntenteichClasses {
    export class Cloud{
        position: Vector;
        color: string;
        size: Vector;
    
        constructor (){
            console.log("Cloud Constructor")
        }
    
        move ():void{
            console.log("Cloud move")
        }
    
        draw():void{
            console.log("Clous draw")
        }
    
        }
}