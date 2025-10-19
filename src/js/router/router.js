const routes = {
  "/": "wc-notes",
  "/text-2D-container": "wc-text-two-d-container",
  "/text-3D-container": "wc-text-three-d",

  // Geomatries
  "/plane": "wc-plane",
  "/cube": "wc-cube",
  "/sphere": "wc-sphere",
  "/cylinder": "wc-cylinder",
  "/hexagon": "wc-hexagon",

  // Projects
  "/cube-colors": "wc-cube-colors",
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
