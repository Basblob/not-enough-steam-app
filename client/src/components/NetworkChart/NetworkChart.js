import React, { Component } from "react";
import axios from "axios";
import { ForceGraph3D } from "react-force-graph";
import initData from "../../data/CounterStrikeData.json";

export default class NetworkChart extends Component {
  state = {
    data: initData,
  };

  componentDidMount() {
    axios.get("http://localhost:8080/game/1172470").then((r) => {
      console.log(r.data);
      this.setState({ data: r.data });
    });
  }

  render() {
    return (
      <figure class="chart">
        <form action="">
          <input type="text" />
          <button>button</button>
        </form>
        <ForceGraph3D
          graphData={this.state.data}
          nodeLabel={(node) => {
            return node.name;
          }}
          backgroundColor={'rgb(27, 40, 56)'}
          
        />
      </figure>
    );
  }
}
