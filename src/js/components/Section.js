import cssImports from "/src/css/styles.css?inline";
import cssSection from "/src/css/components/section.css?inline";

class Section extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImports, cssSection].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });

    const section = this.getAttribute("title");

    const sectionTitle = document.createElement("h2");
    sectionTitle.className = "card";
    sectionTitle.textContent = section;
    this.shadowRoot.appendChild(sectionTitle);
  }
}

export default Section;
