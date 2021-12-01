import "./App.scss";
import data from "./data/graph.json";
import { ForceGraph2D } from "react-force-graph";

function App() {
  return (
    <div>
      <ForceGraph2D graphData={data} />
    </div>
  );
}

export default App;
