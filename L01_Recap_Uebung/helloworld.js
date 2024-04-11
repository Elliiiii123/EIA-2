"use strict";
var L02_BlackmailerCompanion;
(function (L02_BlackmailerCompanion) {
    let choosenCharacter = "A";
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let mail = document.querySelector("div#mail");
        mail.addEventListener("click", placeLetter);
        document.addEventListener("keydown", chooseCharacter);
    }
    function placeLetter(_event) {
        let x = _event.offsetX;
        let y = _event.offsetY;
        let mail = _event.target;
        let Letter = document.createElement("span");
        mail.appendChild(Letter);
        Letter.textContent = choosenCharacter;
        Letter.style.left = x + "px";
        Letter.style.top = y + "px";
        Letter.addEventListener("click", deleteLetter);
    }
    function chooseCharacter(_event) {
        choosenCharacter = _event.key;
    }
    function deleteLetter(_event) {
        let target = _event.target;
        let parent = target.parentNode;
        parent.removeChild(target);
    }
})(L02_BlackmailerCompanion || (L02_BlackmailerCompanion = {}));
//# sourceMappingURL=helloworld.js.map