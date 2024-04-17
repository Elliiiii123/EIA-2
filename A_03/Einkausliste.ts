namespace Einkaufsliste{
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Start");
        let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");

        form.addEventListener("change", handleChange);
    }

    function handleChange(_event: Event): void {
        console.log(_event);
        //let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        let input: HTMLInputElement = <HTMLInputElement>_event.target;
        console.log(input.value);
    }


    // function addFields() {
    // }
    
    // const addFieldsBtn = document.getElementById('addFieldsBtn');
    // if (addFieldsBtn) {
    //     addFieldsBtn.addEventListener('click', addFields);
    // }
}