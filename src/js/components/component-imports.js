
//! GENERAL

import FourOhFour from "./FourOhFour";
import Notes from "./Notes";
import Section from "./Section";


//! TEXTS

// 2D
import TextTwoD from "./text/TextTwoD.js";
import TextTwoDContainer from "./text/TextTwoDContainer";
import TextTwoDAngle from "./text/TextTwoDAngle";
// 3D
import TextThreeD from "./text/TextThreeD";

//! TYPES OF GEOMETRIES

// Planes
import Plane from "./geomatries/Plane";

// Cube
import Cube from "./geomatries/Cube";
import CubeColors from "./modified/CubeColors";

// Cylinder
import Sphere from "./geomatries/Sphere";
import SphereColors from "./geomatries/SphereColor.js";

// Cylinder
import Cylinder from "./geomatries/Cylinder";

// Hexagon
import Hexagon from "./geomatries/Hexagon";

//! PROJECTS
import HexagonText from "./projects/HexagonText";

// --------------------


//! GENERAL

customElements.define("wc-four-oh-four", FourOhFour);
customElements.define("wc-notes", Notes);
customElements.define("wc-section", Section);

//! TEXT

// 2D
customElements.define("wc-text-two-d-container", TextTwoDContainer);
customElements.define("wc-text-two-d", TextTwoD);
customElements.define("wc-text-two-d-angle", TextTwoDAngle);
// 3D
customElements.define("wc-text-three-d", TextThreeD);

//! GEOMETRIES

// Planes
customElements.define("wc-plane", Plane);

// Cubes
customElements.define("wc-cube", Cube);
customElements.define("wc-cube-colors", CubeColors);

// Spheres
customElements.define("wc-sphere", Sphere);
customElements.define("wc-sphere-colors", SphereColors);

// Cylinders
customElements.define("wc-cylinder", Cylinder);

// Hexagons
customElements.define("wc-hexagon", Hexagon);

//! PROJECTS

customElements.define("wc-hexagon-text", HexagonText);
