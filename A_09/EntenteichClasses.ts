namespace EntenteichClasses {
  //Eventlistener für handleLoad Funktion
  window.addEventListener("load", handleLoad);
  //Definiton der crc2 Variable als den HTML Canvas
  export let crc2: CanvasRenderingContext2D;
  export let allObjects: Drawable[] = [];
  let Button: HTMLButtonElement;

  function handleLoad(_event: Event): void {
    //query selector um auf den canvas zuzugreifen und überprüfen ob er da ist
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas) return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    canvas.addEventListener("click", handleCanvasClick);
    //Funktioniert nicht
    Button = <HTMLButtonElement>document.querySelector("#Button");
    Button.addEventListener("click", clickToCreateDuck);

    for (let i: number = 0; i < 7; i++) {
      //neue Wolke wird an zufälliger Position erzeugt
      let cloud: Cloud = new Cloud(
        Math.random() * 200,
        Math.random() * 150,
        0,
        new Vector(0, 0),
        "white"
      );
      //Wolken werden an des Array angehängt
      allObjects.push(cloud);
    }

    let tree: Tree = new Tree(389, 320);
    console.log(tree);
    allObjects.push(tree);

    for (let i: number = 0; i < 7; i++) {
      allObjects.push(createDuck());
    }

    for (let i: number = 0; i < 4; i++) {
      allObjects.push(createHeron());
    }

    let bush: Bush = new Bush(200, 200);
    console.log(bush);
    allObjects.push(bush);

    for (let i: number = 0; i < 8; i++) {
      //neue Biene wird an zufälliger Position erzeugt
      let randomX = Math.random() * 2 - 1; // Zufällige Zahl zwischen -1 und 1 für die x-Richtung
      let randomY = Math.random() * 2 - 1; // Zufällige Zahl zwischen -1 und 1 für die y-Richtung
      let bee: Bee = new Bee(
        Math.random() * 500,
        Math.random() * 500,
        0.5,
        new Vector(randomX, randomY)
      );
      //Bienen werden an des Array angehängt
      allObjects.push(bee);
    }

    drawBackground();
    setInterval(animate, 40);
  }

  function createDuck(): Duck {
    let r: number = Math.random();
    let state: DuckState = DuckState.Swim;

    let x: number = 100 + Math.random() * 200;
    let y: number = 340 + Math.random() * 70;

    if (r < 0.3) {
      state = DuckState.Stand;
      x = 200 + Math.random() * 300;
      y = 450 + Math.random() * 80;
    } else if (r > 0.8) {
      state = DuckState.Dive;
      x = 70 + Math.random() * 70;
      y = 350 + Math.random() * 100;
    }

    let color: string = Math.random() < 0.5 ? "yellow" : "brown"; // Zufällige Farbe (gelb oder braun)
    let duck: Duck = new Duck(x, y, 10, 5, new Vector(1, 0), color, state);
    return duck;
  }

  function clickToCreateDuck(): void {
    for (let i: number = 0; i < 1; i++) {
      allObjects.push(createDuck());
    }
  }

  function createHeron(): Heron {
    let r: number = Math.random();
    let state: HeronState = HeronState.Swim;

    let x: number; //Math.random() * 50 - 1;
    if (r < 0.5) {
      state = HeronState.Swim;
      x = 70 + Math.random() * 200; // x-Koordinate für den stehenden Kranich
    } else {
      // x-Koordinate für den schwimmenden Kranich zwischen 50 und 350
      x = 70 + Math.random() * 300;
    }
    let y: number = 370 + Math.random() * 100;

    if (r < 0.5) {
      state = HeronState.Stand;
      x = 70 + Math.random() * 200;
      y = 450 + Math.random() * 80;
    }

    let color: string = Math.random() < 0.5 ? "yellow" : "brown"; // Zufällige Farbe (gelb oder braun)
    let herons: Heron = new Heron(x, y, 0.6, new Vector(1, 0), color, state);
    return herons;
  }

  function animate(): void {
    console.log("animate");
    drawBackground();

    for (let object of allObjects) {
      object.update();
    }
  }

  function drawBackground(): void {
    //console.log("Background");

    let gradient: CanvasGradient = crc2.createLinearGradient(
      0,
      0,
      0,
      crc2.canvas.height
    );
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
    drawFlower(200, 563, "pink");
    drawFlowers();
  }

  //Funktioniert noch nicht
  function handleCanvasClick(_event: MouseEvent): void {
    console.log("canvas is clicked");
    // Mausposition im Canvas-Koordinatensystem erhalten
    const canvasRect = (_event.target as HTMLCanvasElement).getBoundingClientRect();
    const x = _event.clientX - canvasRect.left;
    const y = _event.clientY - canvasRect.top; //Berechnung der Klick Koordinaten
    // console.log (x,y)

    let duckClicked = false; //Variable für  zur verfolgung des Klicks

    //Checken ob Ente geklickt wurde
    for (const object of allObjects) {
      if (object instanceof Duck) {
        // Wenn das Objekt eine Ente ist
        const duck = object as Duck;
        if (duck.checkHit(x, y)) {
          // Überprüfe, ob die Ente getroffen wurde mit checkHit in der Entenklasse
          duckClicked = true;
          break; // Wenn eine Ente getroffen wurde, beende die Schleife
        }
      }
    }

    // Nur Breadcrumbs erstellen, wenn keine Ente geklickt wurde
    if (!duckClicked) {
      let bread: BreadCrumps = new BreadCrumps(x - 25, y - 50); //Neus Brot an der geklickten stelle erzeugen
      //console.log(bread);
      allObjects.push(bread); //neues Brotobjekt in den allObjects Array pushen

      let closestDuck: Duck | null = null; // Variable, um die nächste Ente zu speichern
      let closestDistance: number = Infinity; // Variable, um die kürzeste Distanz zu speichern

      // Finden der nächsten Ente zur Klickposition
      for (const object of allObjects) {
        if (object instanceof Duck) {
          // Wenn das Objekt eine Ente ist
          const duck = object as Duck;
          const distance = Math.sqrt((duck.x - x) ** 2 + (duck.y - y) ** 2); // Berechnung der Distanz zur Ente
          if (distance < closestDistance) {
            // Wenn die Distanz kürzer ist als die bisher kürzeste
            closestDistance = distance;
            closestDuck = duck; // Speichere diese Ente als nächste Ente
          }
        }
      }

      if (closestDuck) {
        //closestDuck.moveTo(x, y);
        closestDuck.setTarget(x, y); // Setze das Ziel der Ente auf die Klickposition
      }
    }
  }

  export function removeBreadCrumpsAt(_x: number, _y: number, _size: number): void {
    allObjects = allObjects.filter((object) => {
        if (object instanceof BreadCrumps) {
        // Wenn das Objekt ein Brotkrumen ist
        const breadCrumps = object as BreadCrumps;
        const distance = Math.sqrt((breadCrumps.x - _x) ** 2 + (breadCrumps.y - _y) ** 2); // Berechnung der Distanz zum Brotkrumen
        if (distance <= _size + 50) {
          // Wenn der Brotkrumen nah an einer Ente ist
          return false; // Entfernt dieses Objekt aus dem Array
        }
      }
      return true; // Behalte alle anderen Objekte im Array
    });
  }

  function drawSun(): void {
    //Zentrum und Radius des Gradienten für die Sonne
    var centerX = crc2.canvas.width / 2;
    var centerY = 180; // Die y-Koordinate, wo die grüne Fläche endet
    var sunRadius = Math.min(crc2.canvas.width, crc2.canvas.height) / 10;

    //Erstelle den radialen Gradienten für die Sonne
    var gradient = crc2.createRadialGradient(
      centerX,
      centerY,
      sunRadius,
      centerX,
      centerY,
      sunRadius * 3
    );
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
    //console.log("Mountain");

    let color: string = "#aaaaaa";

    crc2.save();
    crc2.beginPath();
    crc2.translate(0, 280);
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
    crc2.translate(0, 290);
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

  export function pseudoRandom(seed: number): () => number {
    let value = seed;
    return function () {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  }

  function drawForrest(): void {
    //console.log("Forrest");

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
    //console.log("House")

    crc2.save();
    crc2.beginPath();
    crc2.translate(10, 340);
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
    crc2.translate(75, 330);
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

  function drawLake(): void {
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
    let random = pseudoRandom(15);

    for (let i = 0; i < numFlowers; i++) {
      // Zufällige Position innerhalb des definierten Bereichs generieren
      let randomX = minX + random() * (maxX - minX);
      let randomY = minY + random() * (crc2.canvas.height - minY);

      // Zufällige Farbe für die Blume auswählen
      let randomColor = ["red", "blue", "purple", "orange"][
        Math.floor(random() * 4)
      ]; // Beispiel für Farben, du kannst weitere hinzufügen

      // Blume an der zufälligen Position zeichnen
      drawFlower(randomX, randomY, randomColor);
    }
  }
}
