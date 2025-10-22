class PlaneRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const pageRenderer = document.createElement("wc-page-renderer");

    //! Tables
    const tables = [
      {
        link: "#basic",
        label: "Basic",
      },
      {
        link: "#front-back-colors",
        label: "Adding Front / Back Colors",
      },
    ];

    //! Contents
    const contents = [
      {
        title: "Basic",
        code: `
  // Texture + Geometry + Material + Mesh
  const geometry = new THREE.PlaneGeometry(3, 3);
  const material = new THREE.MeshStandardMaterial({color: 0xeeffee,});
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
          `,
        component: "wc-plane",
      },
      {
        title: "Adding colors front / back",
        code: `
  const geometry = new THREE.PlaneGeometry(3, 3);
  const material = new THREE.MeshStandardMaterial({color: 0xeeffee,});
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
          `,
        component: "wc-plane-front-back-colors",
      },
    ];

    pageRenderer.setAttribute("tables", JSON.stringify(tables));
    pageRenderer.setAttribute("contents", JSON.stringify(contents));

    this.shadowRoot.appendChild(pageRenderer);
    Prism.highlightAllUnder(this.shadowRoot);
  }
}

export default PlaneRenderer;
