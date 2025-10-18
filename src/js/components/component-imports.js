// General 
import Notes from "./Notes";
import Text from "./Text";
import Section from "./Section";

// Geomatries
import Plane from "./geomatries/plane";
import Cube from "./geomatries/Cube";
import Sphere from "./geomatries/Sphere";
import Cylinder from "./geomatries/Cylinder";
import Hexagon from "./geomatries/Hexagon";

// Projects
import HexagonText from "./projects/HexagonText"

// --------------------

// General
customElements.define("wc-notes", Notes)
customElements.define("wc-text", Text)
customElements.define("wc-section", Section)

// Geomatries
customElements.define("wc-plane", Plane)
customElements.define("wc-cube", Cube)
customElements.define("wc-sphere", Sphere)
customElements.define("wc-cylinder", Cylinder)
customElements.define("wc-hexagon", Hexagon)

// Projects
customElements.define("wc-hexagon-text", HexagonText)