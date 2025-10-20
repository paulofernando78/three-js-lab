import styleImports from "/src/css/imports.css?inline";
import Prism from "prismjs";
import prismTheme from "prismjs/themes/prism-tomorrow.css?inline";

class PlaneDisplayContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, prismTheme].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });
  }

  connectedCallback() {
    const wrapper = document.createElement("div");
    wrapper.className = "display-container";

    // Plane Code
    const planePre = document.createElement("pre");
    // planePre.className = "code-snippet";
    const planeCode = document.createElement("code");
    planeCode.className = "language-js";
    planeCode.textContent = `
const geometry = new THREE.PlaneGeometry(3, 3);
const material = new THREE.MeshStandardMaterial({color: 0xeeffee,});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
    `;
    planePre.appendChild(planeCode);
    wrapper.appendChild(planePre);

    // Plane
    const plane = document.createElement("wc-plane");
    wrapper.appendChild(plane);

    this.shadowRoot.append(wrapper);

    Prism.highlightAllUnder(this.shadowRoot);
  }
}

export default PlaneDisplayContainer;
