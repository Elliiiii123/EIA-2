namespace GenerativeKunst {

    //Interface für Vector erstellen
    interface Vector {
        x:number
        y:number
    }

    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad)
    //Definiton der crc2 Variable als den HTML Canvas
    let crc2: CanvasRenderingContext2D;

    //Fuktion die beim Laden aufgerufen wird
    function handleLoad(_event:Event):void{
        //query selector um auf den canvas zuzugreifen und überprüfen ob er da ist
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2= <CanvasRenderingContext2D>canvas.getContext("2d");

        //Aufruf aller Funktionen um die Elemente auf den Canvas zu zeichnen samt den weiterzugebenden werten
        drawBackground();
        drawEllipse({x:400, y:300});
        drawArc({x:400, y:300}, {x:50,y:75});
        drawDiamond({x:-1000, y:-1000}, 0);
        drawDiamondInCircle({ x: 400, y: 300 }, 80, 8);
        drawBubbles({x:-1000, y:-100},40);
        drawBubblesInCircle({ x: 400, y: 300 }, 200, 12,30,20);
        drawRandomShapes(100, -40);

    }

    //Funktion um den Hintergrund mit einem Gradienten zu bemalen
    function drawBackground():void {
        console.log("Background");

        let gradient:CanvasGradient = crc2.createRadialGradient(400, 300, 50, 400, 300, 800)
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.2, "turquoise")
        gradient.addColorStop(1, "blue");      

        crc2.fillStyle = gradient;
        crc2.fillRect (0, 0, 800, 600);
    }

    //Funktion um den Mittleren Kreis mit einem Gradienten zu zeichnen
    function drawArc(_position:Vector, _size:Vector):void {
        console.log("Arc");

        let r1: number = 30;
        let r2: number = 150;
        let gradient1: CanvasGradient = crc2. createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient1.addColorStop(0, "white"); 
        gradient1.addColorStop(0.5, "blue");

        crc2.save();
        crc2.beginPath();
        crc2.translate (_position.x, _position.y);
        crc2.fillStyle = gradient1;
        crc2.arc(0, 0, 50, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    //Funktion um die Diamantform zu zeichnen, welche dann in der drawDiamond in Circle Funktion verwendet wird
    function drawDiamond(_position:Vector, _rotation:number):void {
        console.log("Diamond");

        let sizeX: number = 40;
        let sizeY: number = 60; 
        let color: string = "darkviolet"; 

        crc2.save();
        crc2.beginPath();
        crc2.translate(_position.x, _position.y);
        crc2.rotate(_rotation);
        crc2.fillStyle = color;
        crc2.beginPath();
        crc2.moveTo(0, -sizeY / 2); 
        crc2.lineTo(sizeX / 2, 0);
        crc2.lineTo(0, sizeY / 2); 
        crc2.lineTo(-sizeX / 2, 0); 
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    }

    //Funktion zum wiederholten Zeichnens der Diamanten um den Kreis herum
    function drawDiamondInCircle(center: Vector, radius: number, numDiamonds: number): void {

        //Schleife zur erzeugung mehrer Diamanten im Kreis und zur random Winkelgebung jedes Diamanten
        for (let i = 0; i < numDiamonds; i++) {
            let angle = (i / numDiamonds) * Math.PI * 2; 
            let posX = center.x + Math.cos(angle) * radius; 
            let posY = center.y + Math.sin(angle) * radius; 
            let _rotation = Math.random() * Math.PI * 2; 

            //Aufruf der Funktion zum Zeichnen der einzelnen Diamanten
            drawDiamond({ x: posX, y: posY }, _rotation); 
        }

    }

    //Funktion zum dreimaligen Zeichnen der Ellipse in einem Random Winkel
    function drawEllipse(_position: Vector): void {
        console.log("Ellipse");
    
        let radiusX: number = 170;
        let radiusY: number = 120;
        let color = "violet";

        //Schleife um alle drei Ellipsen zu zeichnen und sie in einem random winkel zu positionieren
        for (let i = 0; i < 3; i++) {
            let randomAngle = Math.random() * Math.PI * 2; 

            //Funktions aufruf um die einzelnen Elippsen zu zeichnen
            drawSingleEllipse(_position, color, radiusX, radiusY, randomAngle);
        }
    }
    
    //Funktion zum zeichnen einer Ellipse
    function drawSingleEllipse(_position: Vector, color: string, radiusX: number, radiusY: number, rotation: number): void {
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.strokeStyle = color;
        crc2.beginPath();
        crc2.rotate(rotation);
        crc2.ellipse(0, 0, radiusX, radiusY, 0, 0, 2 * Math.PI);
        crc2.stroke();
        crc2.restore();
    }

    //Funktion um Kreis mit gradient zu zeichnen
    function drawBubbles(_position:Vector, _size:number):void {
        console.log("Bubbles");
        let r1: number = 1;
        let r2: number = 20;

        let gradient2: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient2.addColorStop(0, "#FFFFFF"); // Weiß für den inneren Farbverlauf
        gradient2.addColorStop(0.5, "#B3E0F2"); // Hellblau für den mittleren Farbverlauf
        gradient2.addColorStop(1, "#5b94f0"); // Helleres Blau für den äußeren Farbverlauf
    

        crc2.save();
        crc2.beginPath();
        crc2.translate (_position.x, _position.y);
        crc2.fillStyle = gradient2;
        crc2.arc(0, 0, _size, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    //Funktion um viele Kreise zu erstellen und sie in mehreren Reihen in random größen zu positionieren
   function drawBubblesInCircle (center: Vector, radius: number, numDiamonds: number,outerSize: number, innerSize: number): void {
    let numRows = 3;
    let horizontalSpacing = 20;
    let maxOffset = 70;

    //Schleife um Kugeln in drei Reihen übereinander in random shapes zu erzeugen
    for (let row = 0; row < numRows; row++) {
        //Bestimmt den größenunterschied der inneren Reihe und den zwei folgenden
        let currentSize = row === 1 ? innerSize : outerSize;
        //Schleife in der Schleife um 12 Kugeln in den drei Reihen zu erzeugen
        for (let i = 0; i < numDiamonds; i++) {
            let angle = (i / numDiamonds) * Math.PI * 2;
            let offset = (Math.random() - 0.5) * 2 *  maxOffset; 
            let posX = center.x + Math.cos(angle) * (radius - 30 + row * horizontalSpacing) + offset;
            let posY = center.y + Math.sin(angle) * (radius - 30 + row * horizontalSpacing); 

        let size = Math.random() * currentSize; 

        //Funktion um Kugeln zu malen
        drawBubbles({ x: posX, y: posY }, size); 
        }}
    }

    //Funktion zum zeichnen von Kreisen und Vierecken in random größen und Farben
    function drawRandomShapes(numShapes: number, _offset: number): void {
        let canvasWidth = crc2.canvas.width;
        let canvasHeight = crc2.canvas.height;
        let offset = _offset
    
        for (let i = 0; i < numShapes; i++) {
            let shapeSize = Math.random() * 50 + 20; 
            //Aufruf für die Funktion welche die random Color an die Variable Color liefert
            let color = getRandomColor();
            let x, y;
            let edge = Math.floor(Math.random() * 4);
    
            // Position basierend auf dem ausgewählten Rand berechnen mit etwas offset zum rand, damit die Formen nicht dierekt auf dem Canvas rand liegen
            switch (edge) {
                case 0: // Oben
                    x = Math.random() * (canvasWidth - shapeSize) + offset;
                    y = -offset;
                    break;
                case 1: // Rechts
                    x = canvasWidth + offset;
                    y = Math.random() * (canvasHeight - shapeSize) + offset;
                    break;
                case 2: // Unten
                    x = Math.random() * (canvasWidth - shapeSize) + offset;
                    y = canvasHeight + offset;
                    break;
                case 3: // Links
                    x = -offset;
                    y = Math.random() * (canvasHeight - shapeSize) + offset;
                    break;
            }
    
            // zufallberechnung ob Kreis oder Rechteck gezeichnet wird
            let shapeType = Math.random() < 0.5 ? "circle" : "rectangle";
    
            // Überprüfen ob x und y definiert sind, bevor die Funktionen aufgerufen werden
            if (typeof x !== "undefined" && typeof y !== "undefined") {
                // Aufruf der Funktionen welche die Formen malen mit Abfrage ob es sich um Kreis oder Rechteck handelt
                if (shapeType === "circle") {
                    drawCircle({ x, y }, shapeSize / 2, color);
                } else {
                    drawRectangle({ x, y }, shapeSize, shapeSize, color);
                }
            }
        }
    }

    function getRandomColor(): string {
        // Random HEX Farvbe wird generiert
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    
    // Funktion um die random Kreise zu zeichen
    function drawCircle(position: Vector, radius: number, color: string): void {
        crc2.fillStyle = color;
        crc2.beginPath();
        crc2.arc(position.x, position.y, radius, 0, Math.PI * 2);
        crc2.fill();
    }

    // Funktion um die Random Rechtecke zu zeichnen
    function drawRectangle(position: Vector, width: number, height: number, color: string): void {
        crc2.fillStyle = color;
        crc2.fillRect(position.x - width / 2, position.y - height / 2, width, height);
    }

}