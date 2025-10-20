const routes = {
  "/": "wc-notes",

  //! TEXTS
  "/text-2D-container": "wc-text-two-d-container",
  "/text-3D-container": "wc-text-three-d",

  //! TYPE OF GEOMETRIES
  
  // Plane
  "/plane": "wc-plane",
  
  // Cube
  "/cube": "wc-cube",
  "/cube-colors": "wc-cube-colors",
  
  // Sphere
  "/sphere": "wc-sphere",
  "/sphere-colors": "wc-sphere-colors",
  
  // Cylinder
  "/cylinder": "wc-cylinder",
  
  // Hexagon
  "/hexagon": "wc-hexagon",

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
