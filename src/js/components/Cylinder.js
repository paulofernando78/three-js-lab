import cssImportsPath from "/src/css/imports.css?inline";
import cssComponentPath from "/src/css/components/.css?inline";

class Cylinder extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, cssComponentPath].forEach((imports) => {
    const style = document.createElement("style");
    style.textContent = imports;
    this.shadowRoot.appendChild(style);
    });
  }
}

export default Cylinder;