import styleImports from "/src/css/styles.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { setupResizeObserver } from "../../../utils/resize";

class PlaneFrontBackColors extends HTMLElement {
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
    camera.lookAt(0, 0, 0);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.shadowRoot.appendChild(this.renderer.domElement);

    // Size
    this.renderer.setSize(w, h);

    // Resize (targetElement = #app)
    const appContainer = this.closest("wc-plane-display-container") || this;
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

    // Geometry + Material (Mesh)
    const geometry = new THREE.PlaneGeometry(3, 3);
    const frontMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      side: THREE.FrontSide,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      side: THREE.BackSide,
    });

    const frontPlane = new THREE.Mesh(geometry, frontMaterial);
    const backPlane = new THREE.Mesh(geometry, backMaterial);
    backPlane.position.z = -0.001;

    const planeGroup = new THREE.Group();
    planeGroup.add(frontPlane, backPlane);
    scene.add(planeGroup);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      planeGroup.rotation.x += 0.01;
      planeGroup.rotation.y += 0.01;
      this.renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    this.renderer.render(scene, camera);
  }
}

export default PlaneFrontBackColors;
