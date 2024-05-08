"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    //Eventlistener für handleLoad Funktion
    window.addEventListener("load", handleLoad);
    //Definiton der crc2 Variable als den HTML Canvas
    let crc2;
    function handleLoad(_event) {
        //query selector um auf den canvas zuzugreifen und überprüfen ob er da ist
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        drawBackground();
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createRadialGradient(400, 300, 50, 400, 300, 800);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.2, "turquoise");
        gradient.addColorStop(1, "blue");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, 800, 600);
    }
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=EntenteichClasses.js.map