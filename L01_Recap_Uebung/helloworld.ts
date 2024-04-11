namespace L02_BlackmailerCompanion {

    let choosenCharacter:string = "A";
    window.addEventListener("load", handleLoad);

    function handleLoad(_event:Event):void{
        let mail : HTMLElement = <HTMLElement>document.querySelector("div#mail");
        mail.addEventListener("click", placeLetter);
        document.addEventListener("keydown", chooseCharacter);
    }

    function placeLetter(_event: MouseEvent ): void{
        let x:number = _event.offsetX;
        let y:number = _event.offsetY;

        let mail: HTMLElement = <HTMLElement>_event.target;
        let Letter: HTMLSpanElement = document.createElement ("span");
        mail.appendChild(Letter);

        Letter.textContent = choosenCharacter;
        Letter.style.left = x + "px";
        Letter.style.top = y + "px";

        Letter.addEventListener("click", deleteLetter);
    }

    function chooseCharacter(_event:KeyboardEvent):void{
        choosenCharacter = _event.key;
    }

    function deleteLetter(_event:MouseEvent):void{
        let target: Node = <Node> _event.target;
        let parent: Node = <Node> target.parentNode;
        parent.removeChild(target)
    }
}