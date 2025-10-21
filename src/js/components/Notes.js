import styleImports from "/src/css/styles.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

class Notes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });

    const p = document.createElement("p");
    p.textContent = " Study Purposes";
    this.shadowRoot.appendChild(p);
  }
}

export default Notes;
