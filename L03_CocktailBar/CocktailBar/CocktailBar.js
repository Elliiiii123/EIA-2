"use strict";
var L03_CocktailBar;
(function (L03_CocktailBar) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start");
        let form = document.querySelector("div#form");
        let slider = document.querySelector("input#amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        console.log(_event);
        let drink = document.querySelector("select");
        console.log(drink.value);
        let inputs = document.querySelectorAll("input");
        console.log(inputs);
        let order = document.querySelector("div#order");
        //es wird nach Div mit ID "order" angelegt und in Varianle order gespeichert
        order.innerHTML = "";
        //Wird nach jeder änderung gelöscht
        let formData = new FormData(document.forms[0]);
        //Form Data nimmt aus dem Dokument das nullte Formular raus und dadurch das eine neue FormData Variable angelegt wird, wird das Formular ausgewertet
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            //Wo ist der Wert? Wert daus dem Formular (price) mwird mit dem Eintrag an der Stelle 1 (die stelle an dem die Drinks sind, an stelle null ist die überschrift Drinks) zusammengeführt
            let price = Number(item.getAttribute("price"));
            //Es wird nach Eintrag price gesucht
            order.innerHTML += item.name + "  € " + price;
        }
    }
    function displayAmount(_event) {
        let progress = document.querySelector("progress");
        let amount = _event.target.value;
        progress.value = parseFloat(amount);
    }
})(L03_CocktailBar || (L03_CocktailBar = {}));
//# sourceMappingURL=CocktailBar.js.map