import * as THREE from "three";
import cssCube from "/src/css/components/cube.css?inline";

class Cube extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = cssCube;
    this.shadowRoot.appendChild(style);

    this.container = document.createElement("div");
    this.container.className = "container";
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 4;

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      this.renderer.render(scene, camera);
    };

    this.renderer.setAnimationLoop(animate);
  }

  disconnectedCallback() {
    this.renderer.dispose();
    this.container.innerHTML = "";
  }
}

export default Cube;
