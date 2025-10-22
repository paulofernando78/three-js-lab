class TextTwoDRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const dataRenderer = document.createElement("wc-data-renderer");

    //! Tables
    const tables = [
      {
        link: "#basic",
        label: "Basic",
      },
      {
        link: "#basic",
        label: "+ Border",
      },
    ];

    //! Contents
    const contents = [

      //! Basic
      {
        title: "Basic",
        code: `
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
  `,
        component: "wc-text-two-d-basic",
      },

      //! + Border
      {
        title: "+ Border",
        code: `
// Text (Canvas)
const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  context.font = "100px Arial";
  context.fillStyle = "white";
  context.strokeStyle = "red";
  context.lineWidth = 10;

// Board
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
  transparent: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
        `,
        component: "wc-text-two-d-border"
      },
    ];

    dataRenderer.setAttribute("tables", JSON.stringify(tables));
    dataRenderer.setAttribute("contents", JSON.stringify(contents));

    this.shadowRoot.appendChild(dataRenderer);
  }
}

export default TextTwoDRenderer;
