namespace Einkaufsliste{
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Start");
        let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");
        let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("div#delete");

        deleteButton.addEventListener("click", DeleteButton);
        form.addEventListener("change", handleChange);
    }

    function handleChange(_event: Event): void {
        console.log(_event);
        //let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        let input: HTMLInputElement = <HTMLInputElement>_event.target;
        console.log(input.value);
    }

    function DeleteButton(_event: MouseEvent): void {
        console.log("Das Div 'Einträge' wurde gelöscht.");
        const eintraegeDiv: HTMLDivElement = <HTMLDivElement>document.querySelector("div#Einträge");
        if (eintraegeDiv) {
            eintraegeDiv.remove();
        } else {
            console.log("Einträge Div nicht gefunden.");
        }
    }
        

    // function addFields() {
    // }
    
    // const addFieldsBtn = document.getElementById('addFieldsBtn');
    // if (addFieldsBtn) {
    //     addFieldsBtn.addEventListener('click', addFields);
    // }
}