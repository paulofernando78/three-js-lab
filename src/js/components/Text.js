import styleImports from "/src/css/imports.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { OrbitControls, FontLoader } from "three/examples/jsm/Addons.js";

class Component extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, styleComponent].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });
  }

  connectedCallback() {
    // Base Setup
    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.Perspective(75, w / h, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    this.shadowRoot.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 5
    light.position.y = 10
    light.position.z = 5
    // Possible to use "position.set(5, 10, 5)"
    scene.add(light);

    // Load font e text creation
    const loader = new { FontLoader}
    
  }
}

export default Component;
