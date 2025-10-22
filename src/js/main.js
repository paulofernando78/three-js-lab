import "./app";
import "/src/js/components/component-imports.js";
import "/src/css/styles.css";

const menuBtn = document.querySelector("wc-button[label='open']");
const navBar = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav li a");

menuBtn.addEventListener("click", () => {
  navBar.classList.toggle("visible");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navBar.classList.remove("visible");
  });
});
