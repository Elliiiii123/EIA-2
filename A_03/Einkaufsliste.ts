namespace Einkaufsliste {
  //Eventlistener der beim Laden der seite installiert wird und die handleLoad funktion aufruft
  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void {
    //Start signalisiert in der Konsole den Start der handleLoad Funktion
    console.log("Start");

    generateContent(data)

    //die Variable form kriegt den Wert des form divs aus der HTML
    let form: HTMLDivElement = <HTMLDivElement>(
      document.querySelector("div#form")
    );
    // die Variable addButton erhält den Wert des add Buttons aus der HTML
    let addButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("addButton")
    );
    //ein EventListener wird auf den addButton installiert und löst bei einem click die Funktion addDiv aus   
    addButton.addEventListener("click", addDiv);
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

   //Funktion die durch den add Button Click aufgerufen wird 
  function addDiv() {
    // die Variable einträgeDiv wird dem Div Einträge zugeordnet
    const eintärgeDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("Einträge")
    );

    //Eine Einmalige ID für jeden neuen Eintrag wird mit dem aktuellen Daten erstellt
    const eintragId: string = "Eintrag_" + Date.now();
    console.log(eintragId);

    //HTML Schnipsel für neuen Eintrag mit immer neuer ID
    const neuerEintrag: string = `
            <div class="Eintrag" id=${eintragId}>
            <span class="product">Product</span>
            <div class="quantityBoxDiv">
                <label for="quantityBox${eintragId}">Quantity:</label>
                <input type="number" name="Quantity" id="quantityBox${eintragId}" list="numbers" class="smallerInput">
            </div>
            <div class="lastBoughtDiv">
                <span> last bought on the:</span>
                <span id="lastBought${eintragId}">00.00.00</span>
            </div>
            <div class="commentBoxDiv">
                <label for="commentBox${eintragId}">Comment:</label>
                <input type="textarea" name="comment" id="commentBox${eintragId}">
            </div>
            <div class="checkboxDiv">
                <label for="checkbox${eintragId}">bought?</label>
                <input type="checkbox" name="bought" id="checkbox${eintragId}">
            </div>
            <button type="button" class="delete" id="deleteButton${eintragId}">-</button>
            </div>
            `;
    
    //Der neue Eintrag wird in den Einträge Div eingefügt        
    eintärgeDiv.insertAdjacentHTML("beforeend", neuerEintrag);

    //die Variable neuerEintragButton erhält den neu erstellte deleteButton 
    let neuerEintragButton: HTMLButtonElement = <HTMLButtonElement>(
      document.querySelector("#deleteButton" + eintragId)
    );
    console.log(neuerEintragButton);

    //Funktion zum Löschen des Div Elements auf dem der neue deleteButton liegt
    function deleteEintrag(_event: MouseEvent): void {
      //die Variable neuer Eintrag erhältden neu erstellten Eintrag auf dem der Button liegt  
      let neuerEintrag: HTMLDivElement = <HTMLDivElement>(
        document.querySelector("#" + eintragId)
      );
      //neuerEintrag wird gelöscht
      neuerEintrag.remove();
    }

    //Eventlistener für den click auf den neu erstellten delte Button wird installirt und ruft bei click auf den button die delteButton Funktion auf
    neuerEintragButton.addEventListener("click", deleteEintrag);
  }
}
