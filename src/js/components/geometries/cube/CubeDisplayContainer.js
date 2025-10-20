import styleImports from "/src/css/imports.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

class CubeDisplayContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });
  }

  connectedCallBack() {
    const displayContainer = document.createElement("wc-display-container");
    this.shadowRoot.appendChild(displayContainer);

    const cube = document.createElement("wc-cube");
    displayContainer.appendChild(cube);
    
    const cubeColors = document.createElement("wc-cube-colors");
    displayContainer.appendChild(cubeColors);
  }
}

export default CubeDisplayContainer;