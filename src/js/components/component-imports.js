//! GENERAL
import Button from "./Button";
import FourOhFour from "./FourOhFour";
import Notes from "./Notes";
import DataRenderer from "./DataRenderer.js";

// Introduction
import IntroductionRenderer from "./introduction/Renderer.js";

//! TEXTS
// 2D
import TextTwoDRenderer from "./texts/two-d/Renderer.js";
import TextTwoDBasic from "./texts/two-d/Basic.js";
import TextTwoDBorder from "./texts/two-d/Border.js";
// 3D
import TextThreeDRenderer from "./texts/three-d/Renderer.js";
import TextThreeDBasic from "./texts/three-d/Basic.js";

//! TYPES OF GEOMETRIES
// Plane
import PlaneRenderer from "./geometries/plane/Renderer.js";
import Plane from "./geometries/plane/Basic.js";
import PlaneFrontBackColors from "./geometries/plane/FrontBackColors.js";
// Cube
import Cube from "./geometries/cube/Cube";
import CubeColors from "./geometries/Cube/CubeColors";
// Cylinder
import Sphere from "./geometries/sphere/Sphere.js";
import SphereColors from "./geometries/sphere/SphereColor";
// Cylinder
import Cylinder from "./geometries/cylinder/Cylinder";
// Hexagon
import Hexagon from "./geometries/hexagon/Hexagon";

//! PROJECTS
import HexagonText from "./projects/HexagonText";

// --------------------

// Introduction
customElements.define("wc-introduction-renderer", IntroductionRenderer);

//! GENERAL
customElements.define("wc-button", Button);
customElements.define("wc-four-oh-four", FourOhFour);
customElements.define("wc-notes", Notes);
customElements.define("wc-data-renderer", DataRenderer);

//! TEXT
// 2D
customElements.define("wc-text-two-d-renderer", TextTwoDRenderer);
customElements.define("wc-text-two-d-basic", TextTwoDBasic);
customElements.define("wc-text-two-d-border", TextTwoDBorder);
// 3D
customElements.define("wc-text-three-d-renderer", TextThreeDRenderer);
customElements.define("wc-text-three-d-basic", TextThreeDBasic);

//! GEOMETRIES
// Plane
customElements.define("wc-plane-renderer", PlaneRenderer);
customElements.define("wc-plane", Plane);
customElements.define("wc-plane-front-back-colors", PlaneFrontBackColors);
// Cube
customElements.define("wc-cube", Cube);
customElements.define("wc-cube-colors", CubeColors);
// Sphere
customElements.define("wc-sphere", Sphere);
customElements.define("wc-sphere-colors", SphereColors);
// Cylinder
customElements.define("wc-cylinder", Cylinder);
// Hexagon
customElements.define("wc-hexagon", Hexagon);

//! PROJECTS
customElements.define("wc-hexagon-text", HexagonText);
