"use strict";
var GenerativeKunst;
(function (GenerativeKunst) {
    window.addEventListener("load", handleLoad);
    let crc2;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        drawBackground();
        drawArc({ x: 400, y: 300 }, { x: 50, y: 75 });
        drawDiamond({ x: 300, y: 300 });
        // drawDiamonds();
        drawEllipse({ x: 400, y: 300 });
        drawBubbles({ x: 200, y: 200 });
        drawCurve();
        drawText();
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
    function drawArc(_position, _size) {
        console.log("Arc");
        let r1 = 30;
        let r2 = 150;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.5, "blue");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, 50, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawDiamond(_position) {
        console.log("Diamond");
        let sizeX = 40; // Breite des Diamanten
        let sizeY = 60;
        let color = "darkviolet";
        crc2.save();
        crc2.translate(_position.x, _position.y);
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
    // function drawDiamonds(): void {
    //     console.log("Drawing diamonds...");
    //     let nDiamonds: number = 9;
    //     let size: number = 30;
    //     let startX: number = 50;
    //     let startY: number = 50;
    //     let spacingX: number = 60;
    //     let spacingY: number = 60;
    //     for (let i = 0; i < nDiamonds; i++) {
    //         let posX = startX + i * spacingX;
    //         for (let j = 0; j < nDiamonds; j++) {
    //             let posY = startY + j * spacingY;
    //             drawDiamond({x: posX, y: posY});
    //         }
    //     }
    // }
    function drawEllipse(_position) {
        console.log("Ellipse");
        let radiusX = 170;
        let radiusY = 100;
        let color = "violet";
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.strokeStyle = color;
        crc2.beginPath();
        crc2.ellipse(0, 0, radiusX, radiusY, 0, 0, 2 * Math.PI);
        crc2.stroke();
        crc2.restore();
    }
    function drawBubbles(_position) {
        console.log("Bubbles");
        // crc2.save();
        // crc2.translate (_position.x, _position.y);
        // crc2.fillStyle = "light blue";
        // crc2.arc(0, 0, 20, 0, 2 * Math.PI);
        // crc2.fill();
        // crc2.restore();
    }
    function drawCurve() {
        console.log("Curve");
        crc2.save();
        crc2.beginPath();
        crc2.bezierCurveTo(0, 10, 10, 0, 10, 0);
        crc2.restore();
    }
    function drawText() {
        console.log("Text");
    }
})(GenerativeKunst || (GenerativeKunst = {}));
//# sourceMappingURL=generativeKunst.js.map