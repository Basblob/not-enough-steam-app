import React, { Component } from "react";

export default class NetworkChart extends Component {
  state = {
    data: this.props.newData,
    isModalOpen: false,
  };


  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.data);
  }

  render() {
    if (Object.keys(this.state.data).length === 0) {
      return <div>Loading...</div>;
    }
    return <div></div>;
  }
}
