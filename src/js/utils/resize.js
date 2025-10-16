export function setupResizeObserver(renderer, camera, targetElement) {
  const resizeObserver = new ResizeObserver(() => {
    const { width, height } = targetElement.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  resizeObserver.observe(targetElement);
  return resizeObserver; // caso queira parar depois com .disconnect()
}
