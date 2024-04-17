"use strict";
var Einkaufsliste;
(function (Einkaufsliste) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start");
        let form = document.querySelector("div#form");
        form.addEventListener("change", handleChange);
    }
    function handleChange(_event) {
        console.log(_event);
        //let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        let input = _event.target;
        console.log(input.value);
    }
    // function addFields() {
    // }
    // const addFieldsBtn = document.getElementById('addFieldsBtn');
    // if (addFieldsBtn) {
    //     addFieldsBtn.addEventListener('click', addFields);
    // }
})(Einkaufsliste || (Einkaufsliste = {}));
//# sourceMappingURL=Einkausliste.js.map