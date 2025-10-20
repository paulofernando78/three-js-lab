const routes = {
  "/": "wc-notes",

  //! TEXTS
  "/text-2D": "wc-text-two-d-display-container",
  "/text-3D": "wc-text-three-d-display-container",

  //! TYPE OF GEOMETRIES
  
  // Plane
  "/plane": "wc-plane-display-container",
  
  // Cube
  "/cube": "wc-cube-display-container",
  
  // Sphere
  "/sphere": "wc-sphere-display-container",
  
  // Cylinder
  "/cylinder": "wc-cylinder-display-container",
  
  // Hexagon
  "/hexagon": "wc-hexagon-display-container",

  //! PROJECTS
  "/hexagon-text": "wc-hexagon-text",
};

function setActiveLink() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const isActive = link.getAttribute("href") === window.location.pathname;
    link.classList.toggle("active", isActive);
  });
}

export function router() {
  const path = window.location.pathname;
  const page = routes[path];
  const app = document.getElementById("app");

  app.innerHTML = "";

  if (page) {
    const el = document.createElement(page);
    app.appendChild(el);
  } else {
    app.innerHTML = `<wc-four-oh-four>`;
  }
  setActiveLink();
}

export function navigateTo(url) {
  history.pushState(null, null, url);

  router();
}
