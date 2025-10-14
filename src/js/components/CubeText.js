import * as THREE from "three";
import cssCube from "/src/css/components/cube.css?inline";

class CubeText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = cssCube;
    this.shadowRoot.appendChild(style);

    this.container = document.createElement("div");
    this.container.className = "container";
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x222222, 1);

    // Espera um ciclo de renderização antes de medir o tamanho real
    requestAnimationFrame(() => {
      const width = this.container.clientWidth || this.offsetWidth;
      const height = this.container.clientHeight || this.offsetHeight || 500;

      this.renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    // Responsiveness
    const resizeObserver = new ResizeObserver(() => {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    resizeObserver.observe(this.container);

    this.container.appendChild(this.renderer.domElement);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.VSMShadowMap;

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    function makeTextTexture(text) {
      const canvas = document.createElement("canvas");
      const size = 256;
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);

      // Text
      ctx.fillStyle = "black";
      ctx.font = "bold 50px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, size / 2, size / 2);

      return new THREE.CanvasTexture(canvas);
    }

    const cube1PhraseList = ["I", "you", "He", "She", "We", "They"];
    const cube2PhraseList = [
      "go",
      "eat",
      "drink",
      "watch",
      "study",
      "read",
      "sleep",
    ];
    const cube3PhraseList = [
      "apples",
      "water",
      "English",
      "in the morning",
      "in the evening",
      "at night",
    ];

    function makeTextCube(phrases, baseColor = 0xffffff) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const materials = phrases.map(
        (word) =>
          new THREE.MeshStandardMaterial({
            color: baseColor,
            map: makeTextTexture(word),
          })
      );
      return new THREE.Mesh(geometry, materials);
    }

    const cube1 = makeTextCube(cube1PhraseList, 0xffaaaa);
    cube1.position.y = 0.1;
    cube1.position.x = -1.7;
    cube1.castShadow = true;
    scene.add(cube1);

    const cube2 = makeTextCube(cube2PhraseList, 0xaaffaa);
    cube2.position.y = 0.1;
    cube2.position.x = 0;
    cube2.castShadow = true;
    scene.add(cube2);

    const cube3 = makeTextCube(cube3PhraseList, 0xaaaaff);
    cube3.position.y = 0.1;
    cube3.position.x = 1.7;
    cube3.castShadow = true;
    scene.add(cube3);

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    // const planeMaterial = new THREE.ShadowMaterial({opacity: 0.3 });

    // Text Loader
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load(
      "https://threejs.org/examples/textures/hardwood2_diffuse.jpg"
    );
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);

    const planeMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.7,
      metalness: 0.2,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);

    // Ambient light and directional
    const ambient = new THREE.AmbientLight(0xffffff, 0.1);

    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(2, 2, 3);
    directional.castShadow = true;
    // directional.shadow.mapSize.width = 1024;
    // directional.shadow.mapSize.height = 1024;
    directional.shadow.mapSize.set(1024, 1024);
    directional.shadow.camera.near = 1;
    directional.shadow.camera.far = 10;
    directional.shadow.camera.left = -2;
    directional.shadow.camera.right = 2;
    directional.shadow.camera.top = 2;
    directional.shadow.camera.bottom = -2;
    directional.shadow.radius = 15;
    directional.shadow.blurSamples = 16;

    scene.add(ambient, directional);

    // Light Helper
    // const lightHelper = new THREE.DirectionalLightHelper(
    //   directional,
    //   0.3,
    //   0xff0000
    // );
    // scene.add(lightHelper);

    // const shadowCameraHelper = new THREE.CameraHelper(
    //   directional.shadow.camera
    // );
    // scene.add(shadowCameraHelper);

    camera.position.z = 2.5;

    let isAnimatingCube1 = true;
    let isAnimatingCube2 = true;
    let isAnimatingCube3 = true;

    const animate = () => {
      if (isAnimatingCube1) {
        cube1.rotation.x += 0.02;
        cube1.rotation.y -= 0.008;
      }
      if (isAnimatingCube2) {
        cube2.rotation.x -= 0.02;
        cube2.rotation.y += 0.007;
      }
      if (isAnimatingCube3) {
        cube3.rotation.x += 0.009;
        cube3.rotation.y += 0.02;
      }
      this.renderer.render(scene, camera);
    };

    this.renderer.setAnimationLoop(animate);

    // Função para detectar clique em cada cubo
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    this.renderer.domElement.addEventListener("click", (event) => {
      // Normalia a posição do clique no espaço da tela (-1 a + 1)
      const rect = this.renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Projeta o clique na cena 3D
      raycaster.setFromCamera(mouse, camera);

      // Verifica interseções com os cubos
      const intersects = raycaster.intersectObjects([cube1, cube2, cube3]);

      if (intersects.length > 0) {
        const clickedCube = intersects[0].object;

        if (clickedCube === cube1) {
          isAnimatingCube1 = !isAnimatingCube1;
        } else if (clickedCube === cube2) {
          isAnimatingCube2 = !isAnimatingCube2;
        } else if (clickedCube === cube3) {
          isAnimatingCube3 = !isAnimatingCube3;
        }
      }
    });
  }

  disconnectedCallback() {
    this.renderer.dispose();
    this.container.innerHTML = "";
  }
}

export default CubeText;
