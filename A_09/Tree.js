"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Tree {
        x;
        y;
        constructor(_x, _y) {
            //console.log("Tree Constructor");
            this.x = _x;
            this.y = _y;
        }
        draw() {
            //console.log("Tree draw");
            EntenteichClasses.crc2.save();
            EntenteichClasses.crc2.translate(this.x, this.y);
            EntenteichClasses.crc2.fillStyle = "brown";
            EntenteichClasses.crc2.beginPath();
            EntenteichClasses.crc2.moveTo(0, 0);
            EntenteichClasses.crc2.lineTo(-60, 0);
            EntenteichClasses.crc2.lineTo(-48, -20);
            EntenteichClasses.crc2.lineTo(-45, -50);
            EntenteichClasses.crc2.lineTo(-40, -100);
            EntenteichClasses.crc2.lineTo(-90, -120);
            EntenteichClasses.crc2.lineTo(-100, -130);
            EntenteichClasses.crc2.lineTo(-90, -125);
            EntenteichClasses.crc2.lineTo(-50, -120);
            EntenteichClasses.crc2.lineTo(-60, -150);
            EntenteichClasses.crc2.lineTo(-100, -170);
            EntenteichClasses.crc2.lineTo(-140, -170);
            EntenteichClasses.crc2.lineTo(-100, -180);
            EntenteichClasses.crc2.lineTo(-140, -190);
            EntenteichClasses.crc2.lineTo(-90, -185);
            EntenteichClasses.crc2.lineTo(-55, -170);
            EntenteichClasses.crc2.lineTo(-30, -140);
            EntenteichClasses.crc2.lineTo(-30, -180);
            EntenteichClasses.crc2.lineTo(-70, -200);
            EntenteichClasses.crc2.lineTo(-90, -220);
            EntenteichClasses.crc2.lineTo(-30, -190);
            EntenteichClasses.crc2.lineTo(0, -230);
            EntenteichClasses.crc2.lineTo(0, -200);
            EntenteichClasses.crc2.lineTo(-5, -150);
            EntenteichClasses.crc2.lineTo(0, -160);
            EntenteichClasses.crc2.lineTo(0, -130);
            EntenteichClasses.crc2.lineTo(-5, -100);
            EntenteichClasses.crc2.fill();
            EntenteichClasses.crc2.restore();
        }
    }
    EntenteichClasses.Tree = Tree;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Tree.js.map