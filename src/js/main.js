import "./app";
import "/src/js/components/component-imports.js";
import "/src/css/styles.css";

customElements.whenDefined("wc-button").then(() => {
  const menuBtn = document.querySelector("wc-button[icon='menuBtn']");
  const navBar = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav li a");

  // Customized and only affects what's inside <wc-button>
  if (menuBtn) {
    menuBtn.addEventListener("button-click", (e) => {
      console.log(e.detail)
      navBar.classList.toggle("visible");
    });
  }

  // Normal click from nav, hence it's "click", not "button-click"
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navBar.classList.remove("visible");
    });
  });
});
