import styleImports from "/src/css/styles.css?inline";
import styleButton from "/src/css/components/button.css?inline";
import { menuBtn, lightbulb1, lightbulb2 } from "../utils/svg-imports";

class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, styleButton].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });
  }

  connectedCallback() {
    const iconName = this.getAttribute("icon");

    const icons = {
      menuBtn: menuBtn,
      lightbulb1: lightbulb1,
      lightbulb2: lightbulb2,
    };

    const iconHTML = icons[iconName];

    const btn = document.createElement("button");
    btn.innerHTML = iconHTML;
    this.shadowRoot.appendChild(btn);

    btn.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("button-click", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

export default Button;
