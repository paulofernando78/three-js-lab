import styleImports from "/src/css/imports.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { setupResizeObserver } from "../utils/resize";

class Cube extends HTMLElement {
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

    // Text (Canvas)
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "60px Arial";
    context.fillStyle = "white";
    context.fillText("Three JS", 10, 50);

    // Texture + Geometry + Material + Mesh
    const texture = new THREE.CanvasTexture(canvas);
    const geometry = new THREE.PlaneGeometry(3, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      this.renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    this.renderer.render(scene, camera);
  }
}

export default Cube;
