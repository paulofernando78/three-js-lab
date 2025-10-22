class TextThreeDRenderer extends HTMLElement {
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
    ];

    //! Contents
    const contents = [
      {
        title: "Basic",
        code: `
  
          `,
        component: "wc-text-three-d-basic",
      },
    ];

    dataRenderer.setAttribute("tables", JSON.stringify(tables));
    dataRenderer.setAttribute("contents", JSON.stringify(contents));

    this.shadowRoot.appendChild(dataRenderer);
  }
}

export default TextThreeDRenderer;
