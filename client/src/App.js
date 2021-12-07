import "./App.scss";
import data from "./data/graph.json";
import testData from "./data/test.json";
import { ForceGraph2D } from "react-force-graph";

function App() {
  return (
    <div>
      <ForceGraph2D graphData={testData} />
    </div>
  );
}

export default App;
