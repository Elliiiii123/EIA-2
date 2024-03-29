namespace RandomPoem {

    let subject: string[] = ["Affen", "Orangen", "Senioren", "Drachen", "Vegetarier"];
    let predicat: string[] = ["lieben", "brauchen", "wollen", "vergöttern", "bezwingen"];
    let object: string[] = ["Waffen", "Kaugummi", "Ohren", "Blutwurst", "Erde"];
    debugger;
    //console.log(subject);
    //console.log(predicat);
    //console.log(object);

    for (let i:number = subject.length; i >= 1; i--) {
        console.log(getVerse(subject, predicat, object))
    }

    function getVerse(_subject: string[], _predicat: string[], _object: string[]): string {
        //console.log(_subject);
        let vers: string = "";
        let randomNumberSubject:number = Math.random() * _subject.length; 
        vers += _subject.splice(randomNumberSubject, 1) + " ";
        let randomNumberPredicat:number = Math.random() * _predicat.length
        vers += _predicat.splice(randomNumberPredicat, 1) + " ";
        let randomNumberObject:number = Math.random() * _object.length
        vers += _object.splice(randomNumberObject, 1) + " ";

        randomNumberSubject = Math.floor(randomNumberSubject);
        //console.log (randomNumberSubject)
        randomNumberPredicat = Math.floor(randomNumberPredicat);
        randomNumberObject = Math.floor(randomNumberObject);
        return vers;
    }

}