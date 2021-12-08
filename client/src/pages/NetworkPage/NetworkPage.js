import React, { Component } from "react";
import Select from "react-select";
import allGamesData from "../../data/allGamesData.json";
import initData from "../../data/CounterStrikeData.json";
import axios from "axios";
import { ForceGraph3D } from "react-force-graph";

export default class NetworkPage extends Component {
  state = {
    data: initData,
    allGames: allGamesData,
  };

  handleChange = (selection) => {
    axios.get(`http://localhost:8080/game/${selection.appid}`).then((r) => {
      this.setState({ data: r.data });
      console.log(this.state.data);
    });
  };

  render() {
    return (
      <article>
        <Select
          className="chart__form__search__input"
          options={this.state.allGames}
          onChange={this.handleChange}
        />
        <ForceGraph3D
          graphData={this.state.data}
          nodeLabel={(node) => {
            return `${node.name} --- Frequency: ${node.radius * 3}`
          }}
          backgroundColor={"rgb(27, 40, 56)"}
        />
      </article>
    );
  }
}
