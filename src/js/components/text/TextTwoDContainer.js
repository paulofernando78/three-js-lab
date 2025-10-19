import styleImports from "/src/css/imports.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { setupResizeObserver } from "../../utils/resize";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class TextTwoDContainer extends HTMLElement {
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
    // Get current window width and height
    const w = window.innerWidth;
    const h = window.innerHeight;

    // CREATE SCENE
    this.scene = new THREE.Scene();

    // CREATE CAMERA
    const fov = 45;
    const aspect = w / h;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // Set initial camera position
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;
    // Make the camera look at the center of the scene
    camera.lookAt(0, 0, 0);

    // CREATE RENDERER
    // The renderer drawas everything on a <canvas> element
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.shadowRoot.appendChild(this.renderer.domElement);

    // SETUP ORBIT CONTROLS
    // Enables mouse control for rotation, zoom and pan
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
    // Limit how close or far the camera can zoom
    controls.minDistance = 2; // minimum zoom distance
    controls.maxDistance = 30; // maximum zom distance

    // RENDERER SIZE
    this.renderer.setSize(w, h);

    // SETUP RESIZE OBSERVER
    // Adjusts the renderer and camera when the container changes size
    const appContainer = this.shadowRoot.host.parentElement;
    this.resizeObserver = setupResizeObserver(
      this.renderer,
      camera,
      appContainer // (targetElement = #app)
    );

    // ADD LIGHT
    // Ambiet Light (global soft light, no direction)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1) // (color, intensity)
    this.scene.add(ambientLight)
    // Directional Light (acts like sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
    directionalLight.position.x = 1
    directionalLight.position.y = 1
    directionalLight.position.z = 1
    this.scene.add(directionalLight)
    // Helper to visualize the direction and the origin of the light
    const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
    this.scene.add(lightHelper)

    // GEOMETRIES GOES HERE (GEOMETRY + MATERIAL + MESH)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    // ANIMATION LOOP
    // This function runs every frame (˜60fps)
    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      controls.update(); // Update control (required for damping effect)
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

export default TextTwoDContainer;
