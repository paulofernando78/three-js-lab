import styleImports from "/src/css/styles.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { setupResizeObserver } from "../../../utils/resize";

class SphereColors extends HTMLElement {
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

    // Resize (targeting #app)
    this.resizeObserver = new ResizeObserver(() => {
      const appContainer = this.shadowRoot.host.parentElement;
      const { width, height } = appContainer.getBoundingClientRect();
      this.renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    this.resizeObserver.observe(this.shadowRoot.host.parentElement);

    // Ambient Light + Directional Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    ambientLight.position.set(5, 10, 5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 3);
    scene.add(ambientLight, directionalLight);

    // Geometry + Material (Mesh)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < geometry.attributes.position.count; i++) {
      color.setHSL(i / geometry.attributes.position.count, 1.0, 0.5);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      this.renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    this.renderer.render(scene, camera);
  }
}

export default SphereColors;
