namespace Einkaufsliste {
  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void {
    console.log("Start");

    let form: HTMLDivElement = <HTMLDivElement>(
      document.querySelector("div#form")
    );
    let addButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("addButton")
    );

    addButton.addEventListener("click", addDiv);
    form.addEventListener("change", handleChange);
  }

  function handleChange(_event: Event): void {
    console.log(_event);
    //let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
    let input: HTMLInputElement = <HTMLInputElement>_event.target;
    console.log(input.value);
  }

  function addDiv() {
    const eintärgeDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("Einträge")
    );

    const eintragId: string = "Eintrag_" + Date.now();
    console.log(eintragId);

    const neuerEintrag: string = `
            <div class="Eintrag" id=${eintragId}>
            <span class="product">Tomate</span>
            <div class="quantityBoxDiv">
                <label for="quantityBox${eintragId}">Quantity:</label>
                <input type="number" name="Quantity" id="quantityBox${eintragId}" list="numbers" class="smallerInput">
            </div>
            <div class="lastBoughtDiv">
                <span> last bought on the:</span>
                <span id="lastBought${eintragId}">07.04.24</span>
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

    eintärgeDiv.insertAdjacentHTML("beforeend", neuerEintrag);
    let neuerEintragButton: HTMLButtonElement = <HTMLButtonElement>(
      document.querySelector("#deleteButton" + eintragId)
    );
    console.log(neuerEintragButton);

    function deleteEintrag(_event: MouseEvent): void {
        let neuerEintrag:HTMLDivElement = <HTMLDivElement> document.querySelector("#"+eintragId)
        neuerEintrag.remove()
    }

    neuerEintragButton.addEventListener("click",deleteEintrag);


    }

  
}
