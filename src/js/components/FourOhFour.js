import styleImports from "/src/css/styles.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { setupResizeObserver } from "../utils/resize";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

class FourOhFour extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });
  }

  connectedCallback() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Scene + Camera + Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.shadowRoot.appendChild(this.renderer.domElement);

    // Size
    this.renderer.setSize(w, h);

    // Resize (targetElement = #app)
    const appContainer = this.shadowRoot.host.parentElement;
    this.resizeObserver = setupResizeObserver(
      this.renderer,
      camera,
      appContainer
    );

    // Ambient Light + Directional Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    ambientLight.position.set(5, 10, 5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 3);
    scene.add(ambientLight, directionalLight);

    const loader = new FontLoader();
    loader.load("/fonts/BBHSansBartle_Regular.json", (font) => {
      // Geometry
      const geometry = new TextGeometry("404", {
        font: font,
        size: 0.4,
        depth: 0.3,
      });

      geometry.center();

      // Material + Mesh
      const material = new THREE.MeshStandardMaterial();
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      camera.position.z = 5;

      // Animation
      const rate = 0.001;
      const animate = (timeStep) => {
        mesh.rotation.x += Math.sin(timeStep * rate) * 0.05;
        mesh.rotation.y += Math.cos(timeStep * rate) * 0.01;
        this.renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);

      this.renderer.render(scene, camera);
    });
  }
}

export default FourOhFour;
