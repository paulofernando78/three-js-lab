import styleImports from "/src/css/imports.css?inline";
import styleText from "/src/css/components/text.css?inline";

import * as THREE from "three";

class Text extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, styleText].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });

    const scene = new THREE.scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.bodya.appendChild(renderer.domElement);
  }
}

export default Text;
