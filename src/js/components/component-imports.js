//! GENERAL

import Button from "./Button";
import FourOhFour from "./FourOhFour";
import Notes from "./Notes";
import Section from "./Section";
import PageRenderer from "./PageRenderer.js";

//! TEXTS

// 2D
import TextTwoD from "./texts/TextTwoD.js";
import TextTwoDDisplayContainer from "./texts/TextTwoDDisplayContainer.js";
import TextTwoDAngle from "./texts/TextTwoDAngle";
// 3D
import TextThreeD from "./texts/TextThreeD";

//! TYPES OF GEOMETRIES

// Plane
import PlaneRenderer from "./geometries/plane/PlaneRenderer.js";
import Plane from "./geometries/plane/Plane";
import PlaneFrontBackColors from "./geometries/plane/PlaneFrontBackColors.js";

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

//! GENERAL

customElements.define("wc-button", Button);
customElements.define("wc-four-oh-four", FourOhFour);
customElements.define("wc-notes", Notes);
customElements.define("wc-section", Section);
customElements.define("wc-page-renderer", PageRenderer);

//! TEXT

// 2D
customElements.define("wc-text-two-d-display-container",TextTwoDDisplayContainer);
customElements.define("wc-text-two-d", TextTwoD);
customElements.define("wc-text-two-d-angle", TextTwoDAngle);
// 3D
customElements.define("wc-text-three-d", TextThreeD);

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
