"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        //query selector um auf den canvas zuzugreifen und überprüfen ob er da ist
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        EntenteichClasses.crc2 = canvas.getContext("2d");
        drawBackground();
        drawSun();
        let duck = new EntenteichClasses.Duck;
        console.log(duck);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = EntenteichClasses.crc2.createLinearGradient(0, 0, 0, EntenteichClasses.crc2.canvas.height);
        gradient.addColorStop(0.1, "#2980b9");
        gradient.addColorStop(0.3, "orangered"); // Adjusted the position to 0.4 to match the desired position
        gradient.addColorStop(0.3, "hsl(120, 60%, 30%)");
        EntenteichClasses.crc2.fillStyle = gradient;
        EntenteichClasses.crc2.fillRect(0, 0, EntenteichClasses.crc2.canvas.width, EntenteichClasses.crc2.canvas.height);
    }
    function drawSun() {
        // Zentrum und Radius des Gradienten für die Sonne
        var centerX = EntenteichClasses.crc2.canvas.width / 2;
        var centerY = 200; // Die y-Koordinate, wo die grüne Fläche endet
        var sunRadius = Math.min(EntenteichClasses.crc2.canvas.width, EntenteichClasses.crc2.canvas.height) / 10;
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.fillStyle = "orange";
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.restore();
        // Erstelle den radialen Gradienten für die Sonne
        var gradient = EntenteichClasses.crc2.createRadialGradient(centerX, centerY, sunRadius, centerX, centerY, sunRadius * 3);
        gradient.addColorStop(0, "orange"); // Anfang des Gradienten
        gradient.addColorStop(0.9, "rgba(255, 165, 0, 0.2)"); // Ende des Gradienten
        gradient.addColorStop(1, "rgba(255, 165, 0, 0.05)"); // Ende des Gradienten
        // Zeichne den Gradienten um die Sonne herum
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.fillStyle = gradient;
        EntenteichClasses.crc2.beginPath();
        EntenteichClasses.crc2.arc(centerX, centerY, sunRadius * 3, 0, Math.PI * 2);
        EntenteichClasses.crc2.fill();
        EntenteichClasses.crc2.restore();
        EntenteichClasses.crc2.save();
        EntenteichClasses.crc2.beginPath();
    }
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=EntenteichClasses.js.map