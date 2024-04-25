namespace Einkaufsliste {
    export interface Product {
        name: string;
        quantity: number;
        lastBought: string;
        wasBought: boolean;
        comment: string;
    }

    export let data:Product[] = [
        
            {name: "Tomate", quantity: 2, lastBought: "07.10.2023", wasBought: true, comment: "Bio"}
        ,
        
            {name: "Klopapier", quantity: 6, lastBought: "09.04.2024", wasBought: false, comment: "3-lagig"}
        ,
        
            {name: "Spüli", quantity: 1, lastBought: "23.04.2024", wasBought: true, comment: "große Packung"}
        ]
    ;
}