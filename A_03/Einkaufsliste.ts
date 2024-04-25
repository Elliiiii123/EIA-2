namespace Einkaufsliste {
  //Eventlistener der beim Laden der seite installiert wird und die handleLoad funktion aufruft
  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void {
    //Start signalisiert in der Konsole den Start der handleLoad Funktion
    console.log("Start");

    //die generate Content Funktion wird aufgerufen 
    generateContent(data)
    //die add Entry Funktion wird aufgerufen mit dem ersten Eintrag aus data
    // addEntry(data[0])

    //die Variable form kriegt den Wert des form divs aus der HTML
    let form: HTMLDivElement = <HTMLDivElement>(
      document.querySelector("div#form")
    );
    // die Variable addButton erhält den Wert des add Buttons aus der HTML
    // let addButton: HTMLButtonElement = <HTMLButtonElement>(
    //   document.getElementById("addButton")
    // );
    //ein EventListener wird auf den addButton installiert und löst bei einem click die Funktion addEntry aus   
    //addButton.addEventListener("click", addEntry);
    //ein Eventlistener wird auf das form installiert und löst bei einer änderung des Formulars die handleChange Funktion aus
    form.addEventListener("change", handleChange);

    
  }

  //Funktion die durch änderung am Formular aufgrufen wird
  function handleChange(_event: Event): void {
    //Event wird in der Konsole ausgegeben
    console.log(_event);
    //der Variable wird der Wert des geänderten Inputs gegeben
    let input: HTMLInputElement = <HTMLInputElement>_event.target;
    //der Input Wert wird in der Konsoe ausgegeben
    console.log(input.value);
  }

  //Funktion zum generieren des Inhalts aus den Data interfaces
  function generateContent(_data:Product[]) {
    // Füge für jedes Produkt einen Eintrag hinzu
    for (let entry of _data){
        addEntry(entry)                   
    }
}

   //Funktion die durch den add Button Click aufgerufen wird 
  export function addEntry(_product:Product) {
    //console.log(_product.wasBought)
    // die Variable entryDiv wird dem Div Einträge zugeordnet
    const entryDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("Einträge")
    );

    //Eine Einmalige ID für jeden neuen Eintrag wird mit dem aktuellen Daten erstellt
    const eintragId: string = "Eintrag_" + Date.now();
    //console.log(eintragId);

    //HTML Schnipsel für neuen Eintrag mit immer neuer ID und dynamischen Dataen aus Data.ts
    const newEntry: string = `
            <div class="Eintrag" id=${eintragId}>
            <span class="product">${_product.name}</span>
            <div class="quantityBoxDiv">
                <label for="quantityBox${eintragId}">Quantity:</label>
                <input type="number" name="Quantity" id="quantityBox${eintragId}" list="numbers" class="smallerInput" value="${_product.quantity}">
            </div>
            <div class="lastBoughtDiv">
                <span> last bought on the:</span>
                <span id="lastBought${eintragId}">${_product.lastBought}</span>
            </div>
            <div class="commentBoxDiv">
                <label for="commentBox${eintragId}">Comment:</label>
                <input type="textarea" name="comment" id="commentBox${eintragId}" value="${_product.comment}">
            </div>
            <div class="checkboxDiv">
                <label for="checkbox${eintragId}">bought?</label>
                <input type="checkbox" name="bought" id=" checkbox${eintragId}" ${_product.wasBought ? "checked": ""}>
            </div>
            <button type="button" class="delete" id="deleteButton${eintragId}">-</button>
            </div>
            `;
    
    //Der neue Eintrag wird in den Einträge Div eingefügt        
    entryDiv.insertAdjacentHTML("beforeend", newEntry);

    //die Variable newEntryButton erhält den neu erstellte deleteButton 
    let newEntryButton: HTMLButtonElement = <HTMLButtonElement>(
      document.querySelector("#deleteButton" + eintragId)
    );
    console.log(newEntryButton);

    //Funktion zum Löschen des Div Elements auf dem der neue deleteButton liegt
    function deleteEntry(_event: MouseEvent): void {
      //die Variable neuer Eintrag erhältden neu erstellten Eintrag auf dem der Button liegt  
      let newEntry: HTMLDivElement = <HTMLDivElement>(
        document.querySelector("#" + eintragId)
      );
      //newEntry wird gelöscht
      newEntry.remove();
    }

    //Eventlistener für den click auf den neu erstellten delte Button wird installirt und ruft bei click auf den button die delteButton Funktion auf
    newEntryButton.addEventListener("click", deleteEntry);
  }
}
