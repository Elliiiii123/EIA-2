namespace EventInspector {
  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void {
    let divElement0: HTMLDivElement = <HTMLDivElement>(
      document.querySelector("#div0")
    );
    let divElement1: HTMLDivElement = <HTMLDivElement>(
      document.querySelector("#div1")
    );
    let body: HTMLBodyElement = <HTMLBodyElement>document.querySelector("body");
    let button: HTMLButtonElement = <HTMLButtonElement>(
      document.querySelector("button")
    );
    button.addEventListener("click", createCustomEvent);
    document.addEventListener("customEvent", logEvent);
    document.addEventListener("mousemove", setInfoBox);
    document.addEventListener("keyup", logInfo);
    document.addEventListener("click", logInfo);
    divElement0.addEventListener("keyup", logInfo);
    divElement0.addEventListener("click", logInfo);
    divElement1.addEventListener("keyup", logInfo);
    divElement1.addEventListener("click", logInfo);
    body.addEventListener("keyup", logInfo);
    body.addEventListener("click", logInfo);
  }

  function setInfoBox(_event: MouseEvent): void {
    let span: HTMLSpanElement = <HTMLSpanElement>document.querySelector("span");
    const x: Number = _event.pageX;
    const y: Number = _event.pageY;

    const target: HTMLElement = <HTMLElement>_event.target;
    const targetType: String = <String>target.nodeName;

    span.innerHTML =
      "Mouse position x:" +
      " " +
      x +
      "<br />" +
      "Mouse position y:" +
      y +
      "<br />" +
      "Event Target:" +
      " " +
      targetType;

    span.style.left = x.toString() + "px";
    span.style.top = y.toString() + "px";
    span.style.marginLeft = "10px";
    span.style.marginTop = "10px";
  }

  function logInfo(_event: Event): void {
    console.log(_event, _event.type);
    console.log(_event.type);
    console.log(_event.target);
    console.log(_event.currentTarget);
  }

  function createCustomEvent(_event: Event): void {
    const customEvent = new CustomEvent("customEvent");
    setTimeout(() => {
      document.dispatchEvent(customEvent);
    }, 0);
  }

  function logEvent(_event: Event): void {
    console.log("Custom Event Ausgelöst", _event);
  }
}
