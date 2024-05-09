namespace EntenteichClasses {

    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad)
    //Definiton der crc2 Variable als den HTML Canvas
    export let crc2: CanvasRenderingContext2D;

    function handleLoad(_event:Event):void{
        //query selector um auf den canvas zuzugreifen und überprüfen ob er da ist
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2= <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        drawSun();

        let duck: Duck = new Duck;
        console.log (duck)
    }

    function drawBackground():void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0.1, "#2980b9");
        gradient.addColorStop(0.3, "orangered"); // Adjusted the position to 0.4 to match the desired position
        gradient.addColorStop(0.3, "hsl(120, 60%, 30%)");
    
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    }

    function drawSun():void {
        // Zentrum und Radius des Gradienten für die Sonne
        var centerX = crc2.canvas.width / 2;
        var centerY = 200; // Die y-Koordinate, wo die grüne Fläche endet
        var sunRadius = Math.min(crc2.canvas.width, crc2.canvas.height) / 10;

        crc2.save();
        crc2.fillStyle = "orange";
        crc2.beginPath();
        crc2.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
        crc2.fill();
        crc2.restore();
    
        // Erstelle den radialen Gradienten für die Sonne
        var gradient = crc2.createRadialGradient(centerX, centerY, sunRadius, centerX, centerY, sunRadius * 3);
        gradient.addColorStop(0, "orange"); // Anfang des Gradienten
        gradient.addColorStop(0.9, "rgba(255, 165, 0, 0.2)"); // Ende des Gradienten
        gradient.addColorStop(1, "rgba(255, 165, 0, 0.05)"); // Ende des Gradienten
    
        // Zeichne den Gradienten um die Sonne herum
        crc2.save();
        crc2.fillStyle = gradient;
        crc2.beginPath();
        crc2.arc(centerX, centerY, sunRadius * 3, 0, Math.PI * 2);
        crc2.fill();
        crc2.restore();
        crc2.save();
        crc2.beginPath();
    


    }

}