import { injectShadowStyles } from "../../../utils/injectShadowStyles";
import Prism from "prismjs";
import PrismCustom from "/src/css/styles.css?inline";
import PrismTheme from "prismjs/themes/prism-tomorrow.css?inline";
import Imports from "/src/css/utilities/prism-custom.css?inline";

class PlaneRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    injectShadowStyles(this.shadowRoot, PrismCustom, PrismTheme, Imports);

    const wrapper = document.createElement("div");

    const pageRenderer = document.createElement("wc-page-renderer");

    //! Tables
    const tables = [
      {
        link: "#basic",
        label: "Basic",
      },
      {
        link: "#front-back-colors",
        label: "Adding Front / Back Colors",
      },
    ];

    //! Contents
    const contents = [
      {
        title: "Basic",
        code: `
  const geometry = new THREE.PlaneGeometry(3, 3);
  const material = new THREE.MeshStandardMaterial({color: 0xeeffee,});
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
          `,
        component: "wc-plane",
      },
      {
        title: "Adding colors front / back",
        code: `
  const geometry = new THREE.PlaneGeometry(3, 3);
  const material = new THREE.MeshStandardMaterial({color: 0xeeffee,});
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
          `,
        component: "wc-plane-front-back-colors",
      },
    ];

    pageRenderer.setAttribute("tables", JSON.stringify(tables));
    pageRenderer.setAttribute("contents", JSON.stringify(contents));

    this.shadowRoot.appendChild(pageRenderer);
    Prism.highlightAllUnder(this.shadowRoot);
  }
}

export default PlaneRenderer;
