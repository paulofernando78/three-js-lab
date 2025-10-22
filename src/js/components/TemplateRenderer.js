class xxxRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const dataRenderer = document.createElement("wc-data-renderer");

    //! Tables
    const tables = [
      {
        link: "#",
        label: "",
      },
    ];

    //! Contents
    const contents = [
      {
        title: "",
        code: `
  
          `,
        component: "wc-",
      },
    ];

    dataRenderer.setAttribute("tables", JSON.stringify(tables));
    dataRenderer.setAttribute("contents", JSON.stringify(contents));

    this.shadowRoot.appendChild(dataRenderer);
  }
}

export default xxxRenderer;
