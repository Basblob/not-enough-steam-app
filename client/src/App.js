import "./App.scss";
import React, { Component } from "react";
import initData from "./data/CounterStrikeData.json";
import { ForceGraph3D } from "react-force-graph";
import axios from "axios";

class App extends Component {
  state = {
    data: initData,
  };
  // let graphData = axios.get("https://localhost:8080/game/359550").then((r) => {
  //   return r.data;
  // });
  // console.log(await graphData)
  componentDidMount() {
    axios.get("http://localhost:8080/game/1172470").then((r) => {
      console.log(r.data);
      this.setState({ data: r.data });
    });
  }

  render() {
    if (Object.keys(this.state.data).length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ForceGraph3D
          graphData={this.state.data}
          nodeLabel={(node) => {
            return node.name;
          }}
        />
      </div>
    );
  }
}

export default App;
