"use strict";
var RandomPoem;
(function (RandomPoem) {
    let subject = ["Affen", "Orangen", "Senioren", "Drachen", "Vegetarier"];
    let predicat = ["lieben", "brauchen", "wollen", "vergöttern", "bezwingen"];
    let object = ["Waffen", "Kaugummi", "Ohren", "Bluwurst", "Erde"];
    //console.log(subject);
    //console.log(predicat);
    //console.log(object);
    for (let i = subject.length; i >= 1; i--) {
        console.log(getVerse(subject, predicat, object));
    }
    function getVerse(_subject, _predicat, _object) {
        //console.log(_subject);
        let vers = "";
        let randomNumberSubject = Math.random() * _subject.length;
        vers += _subject.splice(randomNumberSubject, 1) + " ";
        let randomNumberPredicat = Math.random() * _predicat.length;
        vers += _predicat.splice(randomNumberPredicat, 1) + " ";
        let randomNumberObject = Math.random() * _object.length;
        vers += _object.splice(randomNumberObject, 1) + " ";
        randomNumberSubject = Math.floor(randomNumberSubject);
        //console.log (randomNumberSubject)
        randomNumberPredicat = Math.floor(randomNumberPredicat);
        randomNumberObject = Math.floor(randomNumberObject);
        return vers;
    }
})(RandomPoem || (RandomPoem = {}));
//# sourceMappingURL=RandomPoem.js.map