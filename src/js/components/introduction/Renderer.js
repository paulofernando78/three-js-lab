class IntroductionRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const dataRenderer = document.createElement("wc-data-renderer");

    //! Tables
    const tables = [
      {
        link: "#import",
        label: "Import",
      },
      {
        link: "#scene",
        label: "Scene",
      },
      {
        link: "#camera",
        label: "Camera",
      },
      {
        link: "#renderer",
        label: "Renderer",
      },
      {
        link: "#geo-mat-mesh",
        label: "Geometry + Material + Mesh",
      },
      {
        link: "#animate",
        label: "Animate [loop]",
      },
    ];

    //! Contents
    const contents = [
      {
        title: "Import",
        code: `
import * as THREE from 'three';
        `,
      },
      {
        title: "Scene",
        code: `
const scene = new THREE.Scene();
        `,
      },
      {
        title: "Camera",
        code: `
const camera = new THREE.PerspectiveCamera(
75, // fov
window.innerWidth / window.innerHeight, //aspect
0.1, // near
100 // far
);
// Set initial camera position
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
// Make the camera look at the center of the scene
camera.lookAt(0, 0, 0);
        `,
      },
      {
        title: "Renderer",
        code: `
// The renderer draws everything on a <canvas> element
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
        `,
      },
      {
        title: "Geometry + Material + Mesh",
        code: `
const geometry = new THREE.???(???); // PlaneGeometry, BoxGeometry, CylinderGeometry, etc.
const material = new THREE.MeshBasicMaterial( { color: 0x???});
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh )
        `,
      },
      {
        title: "Animate",
        code: `
function animate() {
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
        `,
      },
    ];

    dataRenderer.setAttribute("tables", JSON.stringify(tables));
    dataRenderer.setAttribute("contents", JSON.stringify(contents));

    this.shadowRoot.appendChild(dataRenderer);
  }
}

export default IntroductionRenderer;
