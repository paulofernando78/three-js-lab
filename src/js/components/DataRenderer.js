import { injectShadowStyles } from "../utils/injectShadowStyles";
import Imports from "/src/css/styles.css?inline";
import hljs from "highlight.js/lib/common";
import hiljsCustom from "/src/css/theme/highlight-js-custom.css?inline"
import hljsTheme from "highlight.js/styles/vs2015.css?inline";

class DataRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // injectShadowStyles(this.shadowRoot, PrismCustom, PrismTheme, Imports);
    injectShadowStyles(this.shadowRoot, Imports, hljsTheme, hiljsCustom);

    const wrapper = document.createElement("div");
    wrapper.className = "renderer";

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
      link.href = t.link; // scrollIntoView Target
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
      const contentContainer = document.createElement("div");
      contentContainer.className = "renderer-content"
      wrapper.appendChild(contentContainer);

      const planeTitle = document.createElement("h3");
      planeTitle.className = "renderer-content-title";
      planeTitle.textContent = c.title;
      contentContainer.appendChild(planeTitle);

      const planePre = document.createElement("pre");
      const planeCode = document.createElement("code");
      planeCode.className = "language-js";
      planeCode.textContent = c.code;
      planePre.appendChild(planeCode);
      contentContainer.appendChild(planePre);

      const components = document.createElement(c.component);
      contentContainer.appendChild(components);
    });

    this.shadowRoot.append(wrapper);

    this.shadowRoot.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }
}

export default DataRenderer;
