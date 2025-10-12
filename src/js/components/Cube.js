// import cssImportsPath from "/src/css/imports.css?inline";
// import cssComponentPath from "/src/css/components/.css?inline";

import * as THREE from "three";

class Cube extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // [cssImportsPath, cssComponentPath].forEach((css) => {
    //   const style = document.createElement("style");
    //   style.textContent = css;
    //   this.shadowRoot.appendChild(style);
    // });

    this.container = document.createElement("div");
    this.container.style.width = "300px";
    this.container.style.height = "300px";
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(
      this.container.clientWidth || 300,
      this.container.clientHeight || 300
    );
    this.container.appendChild(this.renderer.domElement);
    
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.VSMShadowMap;
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 0.1;
    cube.castShadow = true;
    scene.add(cube);

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);

    // Ambient light and directional
    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(2, 2, 3);
    directional.castShadow = true;
    // directional.shadow.mapSize.width = 1024;
    // directional.shadow.mapSize.height = 1024;
    directional.shadow.mapSize.set(1024, 1024)
    directional.shadow.camera.near = 1;
    directional.shadow.camera.far = 10;
    directional.shadow.camera.left = -2;
    directional.shadow.camera.right = 2;
    directional.shadow.camera.top = 2;
    directional.shadow.camera.bottom = -2;
    directional.shadow.radius = 15;
    directional.shadow.blurSamples = 16;

    scene.add(ambient, directional);

    camera.position.z = 1.5;

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      this.renderer.render(scene, camera);
    }

    this.renderer.setAnimationLoop(animate);
  }

  disconnectedCallback() {
    this.renderer.dispose();
    this.container.innerHTML = "";
  }
}

export default Cube;
