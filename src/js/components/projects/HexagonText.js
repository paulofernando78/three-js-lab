import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import cssimports from "/src/css/imports.css?inline";
import cssCube from "/src/css/components/cube.css?inline";

class HexagonText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssimports, cssCube].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });
  }

  connectedCallback() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 3, 5);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.shadowRoot.appendChild(this.renderer.domElement);

    this.renderer.setClearColor(0x222222, 1);

    const parent = this.shadowRoot.host.parentElement;
    const { width, height } = parent.getBoundingClientRect();
    this.renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();


    this.resizeObserver = new ResizeObserver(() => {
      const parent = this.shadowRoot.host.parentElement;
      const { width, height } = parent.getBoundingClientRect();
      this.renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    this.resizeObserver.observe(this.shadowRoot.host.parentElement);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.VSMShadowMap;

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
      "do",
    ];
    const cube3PhraseList = [
      "apples",
      "water",
      "English",
      "Math",
      "homework",
      "books",
    ];
    const cube4PhraseList = [
      "in the morning.",
      "in the afternoon.",
      "in the evening.",
      "at night.",
      "today",
      "at ???.",
    ];

    function makeTextCube(phrases, baseColor = 0xffffff) {
      const geometry = new THREE.CylinderGeometry(2, 2, 1, 6);
      const materials = phrases.map(
        (word) =>
          new THREE.MeshStandardMaterial({
            color: baseColor,
            map: makeTextTexture(word),
          })
      );
      return new THREE.Mesh(geometry, materials);
    }

    const cubeData = [
      { list: cube1PhraseList, color: 0xffaaaa },
      { list: cube2PhraseList, color: 0xffaaaa },
      { list: cube3PhraseList, color: 0xffaaaa },
      { list: cube4PhraseList, color: 0xffaaaa },
    ];

    const cubes = [];
    const spacing = 4;

    cubeData.forEach((data, i) => {
      const cube = makeTextCube(data.list, data.color);
      cube.position.set(i * spacing, 0.1, 0);
      cube.castShadow = true;
      scene.add(cube);
      cubes.push(cube); // ✅ salva o cube no array
    });

    let [cube1, cube2, cube3, cube4] = cubes;

    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    // const planeMaterial = new THREE.ShadowMaterial({opacity: 0.3 });

    // Text Loader
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load(
      "https://threejs.org/examples/textures/hardwood2_diffuse.jpg"
    );
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(15, 15);

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

    // Camera Position
    camera.position.z = 5;

    let isAnimatingCube1 = true;
    let isAnimatingCube2 = true;
    let isAnimatingCube3 = true;
    let isAnimatingCube4 = true;

    const animate = () => {
      if (isAnimatingCube1) {
        cube1.rotation.y += 0.02;
      }
      if (isAnimatingCube2) {
        cube2.rotation.y += 0.02;
      }
      if (isAnimatingCube3) {
        cube3.rotation.y += 0.02;
      }
      if (isAnimatingCube4) {
        cube4.rotation.y += 0.02;
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
      const intersects = raycaster.intersectObjects([
        cube1,
        cube2,
        cube3,
        cube4,
      ]);

      if (intersects.length > 0) {
        const clickedCube = intersects[0].object;

        if (clickedCube === cube1) {
          isAnimatingCube1 = !isAnimatingCube1;
        } else if (clickedCube === cube2) {
          isAnimatingCube2 = !isAnimatingCube2;
        } else if (clickedCube === cube3) {
          isAnimatingCube3 = !isAnimatingCube3;
        } else if (clickedCube === cube4) {
          isAnimatingCube4 = !isAnimatingCube4;
        }
      }
    });

    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.enableDamping = true; // suaviza o movimento
    controls.dampingFactor = 0.5;
    controls.enablePan = true; // permite mover lateralmente
    controls.enableZoom = true; // permite zoom (scroll)
    controls.target.set(0, 0.5, 0); // o ponto que a câmera "orbita"
    controls.update();

    // 🔥 evita passar por baixo do chão
    controls.minPolarAngle = 0; // ângulo mínimo (não deixa olhar de baixo pra cima)
    controls.maxPolarAngle = Math.PI / 1.8; // limita o olhar até o horizonte (um pouco acima do chão)

    controls.minDistance = 2; // distância mínima da câmera ao alvo
    controls.maxDistance = 30; // distância máxima
  }

  disconnectedCallback() {
    this.renderer.dispose();
  }
}

export default HexagonText;
