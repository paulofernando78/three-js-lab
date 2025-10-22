import styleImports from "/src/css/styles.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { setupResizeObserver } from "../../../utils/resize";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class TextTwoDBorder extends HTMLElement {
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
    const { width, height } = this.getBoundingClientRect();
    const w = width || 400;
    const h = height || 400;

    // Scene + Camera + Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

    // Camera Position
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3;
    camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.shadowRoot.appendChild(this.renderer.domElement);

    // Size
    this.renderer.setSize(w, h);

    // Resize (targetElement = #app)
    const appContainer = document.querySelector("#app");
    this.resizeObserver = setupResizeObserver(
      this.renderer,
      camera,
      appContainer
    );

    // Ambient Light + Directional Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.position.x = 1;
    ambientLight.position.y = 1;
    ambientLight.position.z = 1;
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 1;
    scene.add(ambientLight, directionalLight);

    // Text (Canvas)
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    context.font = "100px Arial";
    context.fillStyle = "white";
    context.strokeStyle = "red";
    context.lineWidth = 10;

    // Border
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
    const material = new THREE.MeshStandardMaterial({
      map: texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Orbit Controls
    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.update();

    // Animation
    const animate = () => {
      this.renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    this.renderer.render(scene, camera);
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect;
    this.renderer?.dispose();
  }
}

export default TextTwoDBorder;
