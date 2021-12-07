import "./App.scss";
import data from "./data/graph.json";
import testData from "./data/test.json";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";

function App() {
  return (
    <div>
      <ForceGraph3D
        graphData={testData}
        nodeLabel={(node) => {
          return node.id;
        }}
        // width={300}
        // height={300}
        backgroundColor="#161920"
      />
    </div>
  );
}

export default App;
