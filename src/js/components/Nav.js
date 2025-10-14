import styleImports from "/src/css/imports.css?inline";
import styleComponent from "/src/css/components/.css?inline";

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, styleComponent].forEach((imports) => {
    const style = document.createElement("style");
    style.textContent = imports;
    this.shadowRoot.appendChild(style);
    });
  }
}

export default NavBar;