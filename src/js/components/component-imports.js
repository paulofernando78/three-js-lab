import FourOhFour from "./FourOhFour";

// General
import Notes from "./Notes";
import Section from "./Section";

import TextTwoDContainer from "./text/TextTwoDContainer";

// Text
import TextTwoD from "./text/TextTwoD.js";
import TextTwoDAngle from "./text/TextTwoDAngle";
import TextThreeD from "./text/TextThreeD";

// Geomatries
import Plane from "./geomatries/Plane";
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

// Text
customElements.define("wc-text-two-d-container", TextTwoDContainer);
customElements.define("wc-text-two-d", TextTwoD);
customElements.define("wc-text-two-d-angle", TextTwoDAngle);
customElements.define("wc-text-three-d", TextThreeD);

// Geomatries
customElements.define("wc-plane", Plane);
customElements.define("wc-cube", Cube);
customElements.define("wc-sphere", Sphere);
customElements.define("wc-cylinder", Cylinder);
customElements.define("wc-hexagon", Hexagon);

// Projects
customElements.define("wc-cube-colors", CubeColors);
customElements.define("wc-hexagon-text", HexagonText);
