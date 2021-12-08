import React, { Component } from "react";
import axios from "axios";
import { ForceGraph3D } from "react-force-graph";

export default class NetworkChart extends Component {
  state = {
    data: this.props.newData,
    currentGame: this.props.currentGame,
  };

  componentDidMount() {
    axios.get(`http://localhost:8080/game/${this.props.currentGame}`).then((r) => {
      this.setState({ data: r.data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentGame !== this.props.currentGame) {

      axios
        .get(`http://localhost:8080/game/${this.state.currentGame}`)
        .then((r) => {
          this.setState({ data: r.data });
        });
    }
  }


  render() {
    if (Object.keys(this.state.data).length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <ForceGraph3D
        graphData={this.state.data}
        nodeLabel={(node) => {
          return node.name;
        }}
        backgroundColor={"rgb(27, 40, 56)"}
      />
    );
  }
}
