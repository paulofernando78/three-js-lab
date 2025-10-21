import styleImports from "/src/css/styles.css?inline";
// import styleContainer from "/src/css/components/text-two-d/container.css?inline";

class TextTwoDDisplayContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });

    const textTwoD = document.createElement("wc-text-two-d");
    this.shadowRoot.appendChild(textTwoD);

    const textTwoDAngle = document.createElement("wc-text-two-d-angle");
    this.shadowRoot.appendChild(textTwoDAngle);
  }
}

export default TextTwoDDisplayContainer;
