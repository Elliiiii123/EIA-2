"use strict";
var EntenteichClasses;
(function (EntenteichClasses) {
    class Tree {
        position;
        color;
        size;
        constructor() {
            console.log("Tree Constructor");
        }
        draw() {
            console.log("Tree draw");
        }
    }
    EntenteichClasses.Tree = Tree;
})(EntenteichClasses || (EntenteichClasses = {}));
//# sourceMappingURL=Tree.js.map