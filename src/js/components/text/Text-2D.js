import styleImports from "/src/css/imports.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { setupResizeObserver } from "../../utils/resize";

class Text2D extends HTMLElement {
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

    // Text (Canvas)
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    context.font = "100px Arial";

    context.fillStyle = "white";

    context.strokeStyle = "red";
    context.lineWidth = 10;
    // context.strokeRect(0, 0, canvas.width, canvas.height)

    const radius = 50;
    context.beginPath();
    context.roundRect(0, 0, canvas.width, canvas.height, radius);
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Three JS", canvas.width / 2, canvas.height / 2);

    // Texture + Geometry + Material + Mesh
    const texture = new THREE.CanvasTexture(canvas);
    const geometry = new THREE.PlaneGeometry(3, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
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

export default Text2D;
