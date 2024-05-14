namespace EntenteichClasses {

    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad)
    //Definiton der crc2 Variable als den HTML Canvas
    export let crc2: CanvasRenderingContext2D;

    let clouds:Cloud[] = [];
    let trees:Tree[] = [];

    
    function handleLoad(_event:Event):void{
        //query selector um auf den canvas zuzugreifen und überprüfen ob er da ist
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        for (let i:number = 0;i<5;i++){
            //neue Wolke wird an zufälliger Position erzeugt
            let cloud: Cloud = new Cloud(Math.random() * 400, Math.random() * 150);
            //Wolken werden an des Array angehängt
            clouds.push(cloud);
        }

        let tree: Tree = new Tree(389, 320);
        console.log(tree);
        tree.draw();
        trees.push(tree);

        drawBackground();
        setInterval(animate, 40);

        let duck: Duck = new Duck;
        console.log (duck)
    }

    function animate(): void{
        console.log("animate");
        drawBackground();
        for (let i:number = 0; i<5; i++){
            clouds[i].move();
            clouds [i].draw();
        }
        for (let i:number = 0; i<1; i++){
            trees [i].draw();
        }
    }

    function drawBackground():void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0.1, "#2980b9");
        gradient.addColorStop(0.27, "orangered"); // Adjusted the position to 0.4 to match the desired position
        gradient.addColorStop(0.27, "hsl(120, 60%, 30%)");
    
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        drawSun();
        drawMountain();
        drawForrest();
        drawHouse();
        drawLake();
        drawDuck(200,400);
        drawStandingDuck(300, 500,-0);
        drawDuckTail(170,370);
        drawFlower(200,563, "pink");
        drawFlowers();
        drawBush();

    }

    function drawSun():void {
        //Zentrum und Radius des Gradienten für die Sonne
        var centerX = crc2.canvas.width / 2;
        var centerY = 180; // Die y-Koordinate, wo die grüne Fläche endet
        var sunRadius = Math.min(crc2.canvas.width, crc2.canvas.height) / 10;
    
        //Erstelle den radialen Gradienten für die Sonne
        var gradient = crc2.createRadialGradient(centerX, centerY, sunRadius, centerX, centerY, sunRadius * 3);
        gradient.addColorStop(0, "#ffb624"); // Anfang des Gradienten
        gradient.addColorStop(0.9, "rgba(255, 165, 0, 0.2)"); // Ende des Gradienten
        gradient.addColorStop(1, "rgba(255, 165, 0, 0.05)"); // Ende des Gradienten
    
        //Zeichne den Gradienten um die Sonne herum
        crc2.save();
        crc2.fillStyle = gradient;
        crc2.beginPath();
        crc2.arc(centerX, centerY, sunRadius * 3, 0, Math.PI * 2);
        crc2.fill();
        crc2.restore();
        crc2.save();
        crc2.beginPath();
    }

    function drawMountain(): void {
        console.log("Mountain");
    
        let color: string = "#aaaaaa"; 

        crc2.save();
        crc2.beginPath();
        crc2.translate(0,280);
        crc2.fillStyle = color;
        crc2.beginPath();
        crc2.moveTo(0, 0); 
        crc2.lineTo(390, 0);
        crc2.lineTo(390, -50); 
        crc2.lineTo(300, -80); 
        crc2.lineTo(190, -55);
        crc2.lineTo(130, -80);
        crc2.lineTo(70, -60);
        crc2.lineTo(0, -65);
        crc2.closePath();
        crc2.fill();
        crc2.restore();

        crc2.save();
        crc2.beginPath();
        crc2.translate(0,290);
        crc2.fillStyle = "grey";
        crc2.beginPath();
        crc2.moveTo(0, 0); 
        crc2.lineTo(390, 0);
        crc2.lineTo(390, -60); 
        crc2.lineTo(330, -30); 
        crc2.lineTo(240, -55);
        crc2.lineTo(170, -35);
        crc2.lineTo(100, -65);
        crc2.lineTo(50, -40);
        crc2.lineTo(0, -60);
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    }
    
    function pseudoRandom(seed: number): () => number {
        let value = seed;
        return function() {
            value = (value * 9301 + 49297) % 233280;
            return value / 233280;
        };
    }

    function drawForrest (): void {
        console.log("Forrest");

        let numberOfParticles: number = 170; // Anzahl der Partikel im Büschel
        let forrestHeight: number = 20; // Höhe des Büschels
        let yPosition: number = 270; // Y-Position der Horizontlinie
        let random = pseudoRandom(42);

        for (let i = 0; i < numberOfParticles; i++) {
            let x = random() * crc2.canvas.width; // Zufällige X-Position im Canvas
            let y = yPosition + random() * forrestHeight; // Zufällige Y-Position in der Nähe der Horizontlinie
            drawForrestParticle(x, y); // Partikel zeichnen
        }
    }

    function drawForrestParticle(x: number, y: number): void {
        crc2.save();
        crc2.beginPath();
        crc2.arc(x, y, 7, 0, Math.PI * 2); // Kreispartikel zeichnen
        crc2.fillStyle = "darkgreen"; // Grün für Büsche
        crc2.fill();
        crc2.restore();    
    }

    function drawHouse(): void {
        console.log("House")

        crc2.save();
        crc2.beginPath();
        crc2.translate(10,340);
        crc2.fillStyle = "#a0522d";
        crc2.strokeStyle = "#4a2f1b";
        crc2.beginPath();
        crc2.moveTo(0, 0); 
        crc2.lineTo(50, 0);
        crc2.lineTo(50, -50); 
        crc2.lineTo(0, -50);
        crc2.lineTo(0, 0);
        crc2.moveTo(0, -50);
        crc2.lineTo(20, -75);
        crc2.lineTo(70, -75);
        crc2.lineTo(50, -50);
        crc2.moveTo(50, -50);
        crc2.lineTo(80, -60);
        crc2.lineTo(70, -75);
        crc2.moveTo(80, -60);
        crc2.lineTo(80, -20);
        crc2.lineTo(50, 0);
        crc2.lineTo(50, -50);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();

        crc2.save();
        crc2.beginPath();
        crc2.translate(75,330);
        crc2.fillStyle = "#a0522d";
        crc2.strokeStyle = "#4a2f1b";
        crc2.moveTo(0, 0); 
        crc2.lineTo(10, -6);
        crc2.lineTo(10, -40); 
        crc2.lineTo(0, -35);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();
    }


    
    let lake: Lake = new Lake();
    console.log(Lake);
    lake.draw();

    function drawLake():void{

        let centerX = 220; // X-Koordinate des Mittelpunkts des Sees
        let centerY = 390; // Y-Koordinate des Mittelpunkts des Sees
        let radiusX = 190; // Horizontaler Radius des Sees
        let radiusY = 70; // Vertikaler Radius des Sees
        
        crc2.save();
        crc2.beginPath();
        crc2.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fillStyle = "blue";
        crc2.fill();
        crc2.restore();
    }

    function drawDuck(x:number, y:number):void{

        crc2.save();

        // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
        crc2.translate(x, y);
    
        // Körper der Ente als Ellipse
        let bodyRadiusX = 15; // Horizontaler Radius des Körpers
        let bodyRadiusY = 10; // Vertikaler Radius des Körpers
        crc2.beginPath();
        crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
        crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
        crc2.fill();
        crc2.closePath();
    
        // Kopf der Ente als Kreis
        crc2.beginPath();
        crc2.arc(20, -5, 5, 0, Math.PI * 2); // Kopf als Kreis
        crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kopf
        crc2.fill();
        crc2.closePath();
    
        // Auge der Ente als Kreis
        crc2.beginPath();
        crc2.arc(22, -5, 2, 0, Math.PI * 2); // Auge als Kreis
        crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
        crc2.fill();
        crc2.closePath();
    
        // Schnabel der Ente
        crc2.beginPath();
        crc2.moveTo(25, -5);
        crc2.lineTo(30, -3);
        crc2.lineTo(25, -1);
        crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
        crc2.stroke();
        crc2.closePath();
    
        // Linker Flügel der Ente als schmale Ellipse
        crc2.beginPath();
        crc2.ellipse(-4, -2, 15, 7, -0.2, 0, Math.PI * 2); // Linker Flügel als Ellipse
        crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
        crc2.fill();
        crc2.closePath();
    
        // Wiederherstellen des ursprünglichen Zustands des Canvas
        crc2.restore();
    }

    function drawStandingDuck(x: number, y: number, headRotation: number): void {
        crc2.save();

        // Verschieben des Ursprungs des Koordinatensystems zur Position der Ente
        crc2.translate(x, y);
        crc2.scale(-1, 1);
    
        // Körper der Ente als Ellipse
        let bodyRadiusX = 15; // Horizontaler Radius des Körpers
        let bodyRadiusY = 10; // Vertikaler Radius des Körpers
        crc2.beginPath();
        crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2); // Körper als Ellipse
        crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
        crc2.fill();
        crc2.closePath();
    
        // Kopf der Ente als Kreis mit variabler Rotation
        crc2.rotate(headRotation); // Rotation des Kopfes
        crc2.beginPath();
        crc2.arc(20, -5, 5, 0, Math.PI * 2); // Kopf als Kreis
        crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kopf
        crc2.fill();
        crc2.closePath();
    
        // Auge der Ente als Kreis
        crc2.beginPath();
        crc2.arc(22, -5, 2, 0, Math.PI * 2); // Auge als Kreis
        crc2.fillStyle = "black"; // Schwarze Farbe für das Auge
        crc2.fill();
        crc2.closePath();
    
        // Schnabel der Ente
        crc2.beginPath();
        crc2.moveTo(25, -5);
        crc2.lineTo(30, -3);
        crc2.lineTo(25, -1);
        crc2.strokeStyle = "orange"; // Orangefarbener Schnabel
        crc2.stroke();
        crc2.closePath();
    
        // Rechter Flügel der Ente als schmale Ellipse
        crc2.beginPath();
        crc2.ellipse(-4, -2, 15, 7, -0.2, 0, Math.PI * 2); // Rechter Flügel als Ellipse
        crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
        crc2.fill();
        crc2.closePath();
    
        // Beine der Ente 
        crc2.beginPath();
        crc2.moveTo(0, 7); // Startpunkt des Beins
        crc2.lineTo(0, 15); // Obere Linie des Beins
        crc2.lineTo(-3, 15); // Schräge Linie des Beins
        crc2.lineTo(-3, 7); // Untere Linie des Beins
        crc2.strokeStyle = "brown"; // Braune Farbe für die Beine
        crc2.stroke();
        crc2.closePath();
    
        // Wiederherstellen des ursprünglichen Zustands des Canvas
        crc2.restore();
    
    }

    let duck: Duck = new Duck();
    console.log(Duck);
    duck.draw();

    function drawDuckTail(x: number, y: number): void {
        crc2.save();
    
        // Verschieben des Ursprungs des Koordinatensystems zur Position des Entenschwanzes
        crc2.translate(x, y);
    
        // Körper der Ente als halbe Ellipse
        let bodyRadiusX = 7; // Horizontaler Radius des Körpers
        let bodyRadiusY = 10; // Vertikaler Radius des Körpers
        crc2.beginPath();
        crc2.ellipse(0, 0, bodyRadiusX, bodyRadiusY, Math.PI, 0, Math.PI); // Körper als halbe Ellipse
        crc2.fillStyle = "yellow"; // Gelbe Farbe für den Körper
        crc2.fill();
        crc2.closePath();
    
        // Linker Flügel der Ente als halbe Ellipse
        crc2.beginPath();
        crc2.ellipse(-3, 0, 6, 14, 0,Math.PI, 0); // Linker Flügel als halbe Ellipse
        crc2.fillStyle = "brown"; // Braune Farbe für den Flügel
        crc2.fill();
        crc2.closePath();
    
        // Wiederherstellen des ursprünglichen Zustands des Canvas
        crc2.restore();
    }

    function drawFlower(x: number, y: number, color: string): void {
        crc2.save();
    
        // Verschieben des Ursprungs des Koordinatensystems zur Position der Blume
        crc2.translate(x, y);
        crc2.scale(0.5, 0.5);
    
        // Zeichnen des Kreises in der Mitte
        crc2.beginPath();
        crc2.arc(0, 0, 8, 0, Math.PI * 2); // Kreis in der Mitte
        crc2.fillStyle = "yellow"; // Gelbe Farbe für den Kreis
        crc2.fill();
    
        // Zeichnen der Blütenblätter drumherum
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
            let petalX = Math.cos(angle) * 14; // Größere Blütenblätter
            let petalY = Math.sin(angle) * 14; // Größere Blütenblätter
            crc2.save(); // Zustand speichern, um die Transformation für jedes Blütenblatt einzeln anzuwenden
            crc2.translate(petalX, petalY); // Blütenblatt an die gewünschte Position verschieben
            crc2.rotate(angle); // Blütenblatt drehen, um um den Kreis herum zu rotieren
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.quadraticCurveTo(10, -10, 17, 0); // Größere Blütenblätter
            crc2.quadraticCurveTo(10, 10, -5, 5); // Größere Blütenblätter
            crc2.fillStyle = color; // Verwenden der übergebenen Farbe
            crc2.fill();
            crc2.restore(); // Zustand wiederherstellen, um mit dem nächsten Blütenblatt fortzufahren
        }
    
        // Wiederherstellen des ursprünglichen Zustands des Canvas
        crc2.restore();
    }

    function drawFlowers(): void {
        // Anzahl der Blumen, die du zeichnen möchtest
        let numFlowers = 15;
    
        // Bereich, in dem die Blumen auf der Wiese verteilt werden sollen
        let minX = 50; // Mindestwert für die X-Position
        let maxX = crc2.canvas.width - 50; // Maximale Breite des Canvas minus 50 (um Platz für die Blumen zu lassen)
        let minY = 470; // Untere Hälfte des Canvas
        let random = pseudoRandom(15)
    
        for (let i = 0; i < numFlowers; i++) {
            // Zufällige Position innerhalb des definierten Bereichs generieren
            let randomX = minX + random() * (maxX - minX);
            let randomY = minY + random() * (crc2.canvas.height - minY);
    
            // Zufällige Farbe für die Blume auswählen
            let randomColor = ["red", "blue", "purple", "orange"][Math.floor(random() * 4)]; // Beispiel für Farben, du kannst weitere hinzufügen
    
            // Blume an der zufälligen Position zeichnen
            drawFlower(randomX, randomY, randomColor);
        }
    }

    function drawBush (): void {
        console.log("Forrest");

        let numberOfParticles: number = 50; // Anzahl der Partikel in der Wolke
        let cloudWidth: number = 80; // Breite der Wolke
        let cloudHeight: number = 70; // Höhe der Wolke
        let xPosition: number = 310; // Feste X-Position der Wolke
        let yPosition: number = 580; // Y-Position der Wolke
        let random = pseudoRandom(42)
    
        for (let i = 0; i < numberOfParticles; i++) {
            let x = xPosition + (i * (cloudWidth / numberOfParticles)); // Feste X-Position für jeden Partikel, abhängig von der Wolkenbreite
            let y = yPosition + (random() * cloudHeight); // Zufällige Y-Position innerhalb der Wolke
            drawBushParticle(x, y); // Partikel zeichnen
        }
    }

    function drawBushParticle(x: number, y: number): void {
  
        crc2.save();
        crc2.beginPath();
        crc2.arc(x, y, 15, 0, Math.PI * 2); // Kreispartikel zeichnen
        crc2.fillStyle = "#006400"; 
        crc2.fill();
        crc2.restore();    
    }
  
}

