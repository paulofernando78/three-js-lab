import cssSectionPath from "/src/css/components/section.css?inline";

class Section extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = cssSectionPath;
    this.shadowRoot.appendChild(style);

    const section = this.getAttribute("title")

    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = section
    this.shadowRoot.appendChild(sectionTitle);
  }
}

export default Section;