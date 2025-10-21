const routes = {
  "/": "wc-notes",

  //! TEXTS
  "/text-2D": "wc-display-container",
  "/text-3D": "wc-d-display-container",

  //! TYPE OF GEOMETRIES
  
  // Plane
  "/plane": "wc-plane-renderer",
  
  // Cube
  "/cube": "wc-cube-renderer",
  
  // Sphere
  "/sphere": "wc-sphere-renderer",
  
  // Cylinder
  "/cylinder": "wc-cylinder-renderer",
  
  // Hexagon
  "/hexagon": "wc-hexagon-renderer",

  //! PROJECTS
  "/hexagon-text": "wc-english-lesson",
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
