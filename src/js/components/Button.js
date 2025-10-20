import styleImports from "/src/css/imports.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });
  }
  connectedCallback() {
    const label = this.getAttribute("label")

    const btn = document.createElement("button");
    btn.textContent = label
    this.shadowRoot.appendChild(btn);
  }
}

export default Button;
