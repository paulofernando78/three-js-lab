export function injectShadowStyles(shadow, ...cssModules) {
  cssModules.forEach((css) => {
    const style = document.createElement("style");
    style.textContent = css
    shadow.appendChild(style);
  })
}