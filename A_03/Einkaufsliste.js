"use strict";
var Einkaufsliste;
(function (Einkaufsliste) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log(document.getElementById("delete"));
        // console.log("Start");
        let deleteButton = document.getElementById("delete");
        if (!deleteButton) {
            console.error("Button nicht gefunden!");
            return;
        }
        else {
            console.log("button gefunden");
        }
        let form = document.querySelector("div#form");
        deleteButton.addEventListener("click", DeleteButton);
        form.addEventListener("change", handleChange);
    }
    function handleChange(_event) {
        console.log(_event);
        //let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        let input = _event.target;
        console.log(input.value);
    }
    function DeleteButton(_event) {
        console.log("Das Div 'Einträge' wurde gelöscht.");
        const eintraegeDiv = document.querySelector("div#Einträge");
        if (eintraegeDiv) {
            eintraegeDiv.remove();
        }
        else {
            console.log("Einträge Div nicht gefunden.");
        }
    }
    // function addFields() {
    // }
    // const addFieldsBtn = document.getElementById('addFieldsBtn');
    // if (addFieldsBtn) {
    //     addFieldsBtn.addEventListener('click', addFields);
    // }
})(Einkaufsliste || (Einkaufsliste = {}));
//# sourceMappingURL=Einkaufsliste.js.map