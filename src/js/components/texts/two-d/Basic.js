import styleImports from "@css/styles.css?inline";
import * as THREE from "three";
import { setupResizeObserver } from "@utils/resize";

class TextTwoDBasic extends HTMLElement {
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

    // Text (Canvas)
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    context.font = "100px Arial";

    context.fillStyle = "white";

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

    // Animation
    const animate = () => {
      this.renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    this.renderer.render(scene, camera);
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.renderer?.dispose();
  }
}

export default TextTwoDBasic;
