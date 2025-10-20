import styleImports from "/src/css/imports.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { setupResizeObserver } from "../../utils/resize";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class HexagonText extends HTMLElement {
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

    this.scene = new THREE.Scene();

    const fov = 45;
    const aspect = w / h;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 10;
    camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.shadowRoot.appendChild(this.renderer.domElement);

    this.renderer.setSize(w, h);

    const appContainer = this.shadowRoot.host.parentElement;
    this.resizeObserver = setupResizeObserver(
      this.renderer,
      camera,
      appContainer
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 1;
    this.scene.add(directionalLight);
    const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
    this.scene.add(lightHelper);

    const geometry = new THREE.CylinderGeometry(2, 2, 1, 6);
    const material = new THREE.MeshStandardMaterial({ color: 0xd3d3d3 });
    const hexagon = new THREE.Mesh(geometry, material);
    this.scene.add(hexagon);

    const plane = new THREE.PlaneGeometry(1, 1, 1);
    
    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.enableDamping = true; // adds smooth motion
    controls.dampingFactor = 0.5; // amount of damping (inertia)
    controls.enablePan = true; // allow dragging sideways
    controls.enableZoom = true; // allow zooming with mouse wheel

    // Define the point where that the camera orbits around
    controls.target.x = 0; // o ponto que a câmera "orbita"
    controls.target.y = 0.5;
    controls.target.z = 0;
    controls.update();

    // Limit the up/down rotation angle (prevent going underground)
    controls.minPolarAngle = 0; // minimum vertical angle
    controls.maxPolarAngle = Math.PI / 1.8; // maximum vertical angle (~100°)

    controls.minDistance = 2; // minimum zoom distance
    controls.maxDistance = 30; // maximum zom distance

    const animate = () => {
      hexagon.rotation.y += 0.01;
      controls.update();
      this.renderer.render(this.scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.renderer?.dispose();
  }
}

export default HexagonText;
