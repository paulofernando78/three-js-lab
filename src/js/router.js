const routes = {
  "/": "wc-notes",
  "/text": "wc-text",

  // Geomatries
  "/plane": "wc-plane",
  "/cube": "wc-cube",
  "/sphere": "wc-sphere",
  "/cylinder": "wc-cylinder",
  "/hexagon": "wc-hexagon",

  // Projects
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
    app.innerHTML = `<h1>404 - Page not found</h1>`;
  }
  setActiveLink();
}

export function navigateTo(url) {
  history.pushState(null, null, url);

  router();
}
