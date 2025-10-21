import { injectShadowStyles } from "../utils/injectShadowStyles";
import Prism from "prismjs";
import PrismCustom from "/src/css/styles.css?inline";
import PrismTheme from "prismjs/themes/prism-tomorrow.css?inline";
import Imports from "/src/css/utilities/prism-custom.css?inline";

class PageRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    injectShadowStyles(this.shadowRoot, PrismCustom, PrismTheme, Imports);

    const wrapper = document.createElement("div");
    wrapper.className = "display-container";

    const tables = JSON.parse(this.getAttribute("tables") || "[]");
    const contents = JSON.parse(this.getAttribute("contents") || "[]");

    //! Table of Contents
    const tableOfContents = document.createElement("h2");
    tableOfContents.textContent = "Table of Content";
    wrapper.appendChild(tableOfContents);

    //! Table of Contents Container
    const tableContainer = document.createElement("div");
    wrapper.appendChild(tableContainer);

    //! Contents
    const ul = document.createElement("ul");
    tableContainer.appendChild(ul);
    tables.forEach((t) => {
      const li = document.createElement("li");
      ul.appendChild(li);
      const link = document.createElement("a");
      link.href = t.link;
      link.textContent = t.label;
      li.appendChild(link);

      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = this.shadowRoot.querySelector(t.link);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });

    //! Contents
    contents.forEach((c) => {
      const planeTitle = document.createElement("h3");
      planeTitle.className = "display-container-title";
      planeTitle.textContent = c.title;
      wrapper.appendChild(planeTitle);

      const planePre = document.createElement("pre");
      const planeCode = document.createElement("code");
      planeCode.className = "language-js";
      planeCode.textContent = c.code;
      planePre.appendChild(planeCode);
      wrapper.appendChild(planePre);

      const components = document.createElement(c.component);
      wrapper.appendChild(components);
    });

    this.shadowRoot.append(wrapper);

    Prism.highlightAllUnder(this.shadowRoot);
  }
}

export default PageRenderer;
