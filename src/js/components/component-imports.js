import FourOhFour from "./FourOhFour";

// General
import Notes from "./Notes";
import Section from "./Section";

// Plain
import Text2D from "./text/Text-2D";
import Text3D from "./text/Text-3D";

// Geomatries
import Plane from "./geomatries/plane";
import Cube from "./geomatries/Cube";
import Sphere from "./geomatries/Sphere";
import Cylinder from "./geomatries/Cylinder";
import Hexagon from "./geomatries/Hexagon";

// Projects
import CubeColors from "./modified/CubeColors";

// Projects
import HexagonText from "./projects/HexagonText";

// --------------------

customElements.define("wc-four-oh-four", FourOhFour);

// General
customElements.define("wc-notes", Notes);
customElements.define("wc-section", Section);

// Plain
customElements.define("wc-text-two-d", Text2D);
customElements.define("wc-text-three-d", Text3D);

// Geomatries
customElements.define("wc-plane", Plane);
customElements.define("wc-cube", Cube);
customElements.define("wc-sphere", Sphere);
customElements.define("wc-cylinder", Cylinder);
customElements.define("wc-hexagon", Hexagon);

// Projects
customElements.define("wc-cube-colors", CubeColors);
customElements.define("wc-hexagon-text", HexagonText);
