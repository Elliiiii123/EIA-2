namespace canvas {

    document.addEventListener("DOMContentLoaded", function() {

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");

    crc2.fillStyle = "#D30309";
    crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 100);

    gradient.addColorStop(0, "black");
    gradient.addColorStop(.5, "red");
    gradient.addColorStop(1, "gold");

    crc2.fillStyle = gradient;
    crc2.fillRect(0, 0, 200, 100);
    crc2.beginPath();
    //crc2.arc(120, 80, 60, 0, 1.5 * Math.PI);
    // crc2.ellipse(120, 80, 80, 40, 0, 0, 2 * Math.PI);
    crc2.lineTo (175,8)
    crc2.lineTo (230,70)
    crc2.lineTo (120,70)
    crc2.closePath();
    crc2.stroke();
    })

}