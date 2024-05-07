"use strict";
var classes;
(function (classes) {
    debugger;
    class Vector {
        x;
        y;
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
    }
    let v1 = new Vector();
    v1.scale(2);
    console.log(v1);
})(classes || (classes = {}));
//# sourceMappingURL=classes.js.map