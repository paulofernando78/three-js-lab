// General 
import Notes from "./components/Notes";
import Text from "./components/Text";
import Section from "./components/Section";

// Geomatries
import Plane from "./components/geomatries/plane";
import Cube from "./components/geomatries/Cube";
import Sphere from "./components/geomatries/Sphere";
import Cylinder from "./components/geomatries/Cylinder";

// Projects
import HexagonText from "./components/projects/HexagonText"

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

// Projects
customElements.define("wc-hexagon-text", HexagonText)