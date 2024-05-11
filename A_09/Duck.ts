namespace EntenteichClasses {
    
    export class Duck{
    position: Vector;
    color: string;
    size: number;
    type: string;
    direction: Vector;
    activity: string;

    constructor (){
        console.log("Duck Constructor")
    }

    move ():void{
        console.log("Duck move")
    }

    draw():void{
        console.log("Duck draw")
        
    }

    }
}