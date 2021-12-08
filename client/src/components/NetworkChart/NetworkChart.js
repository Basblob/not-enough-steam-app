import React, { Component } from "react";
import axios from "axios";
import { ForceGraph3D } from "react-force-graph";

export default class NetworkChart extends Component {
  state = {
    data: this.props.newData,
    isModalOpen: false,
  };

  // componentDidMount() {
  //   axios
  //     .get(`http://localhost:8080/game/${this.props.currentGame}`)
  //     .then((r) => {
  //       this.setState({ data: r.data });
  //     });
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.data)
  }

  render() {
    if (Object.keys(this.state.data).length === 0) {
      return <div>Loading...</div>;
    }
    return (

        <ForceGraph3D
          graphData={this.state.data}
          nodeLabel={(node) => {
            console.log(node)
          }}
          backgroundColor={"rgb(27, 40, 56)"}
        />

    );
  }
}
