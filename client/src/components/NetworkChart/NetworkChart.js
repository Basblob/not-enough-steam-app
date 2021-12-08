import React, { Component } from "react";
import axios from "axios";
import { ForceGraph3D } from "react-force-graph";
import initData from "../../data/CounterStrikeData.json";
// import SearchDropdown from "../SearchDropdown/SearchDropdown";
import Select from "react-select";
import allGamesData from "../../data/allGamesData.json";

export default class NetworkChart extends Component {
  state = {
    data: initData,
    searchTerm: "",
    allGames: allGamesData,
  };

  componentDidMount() {
    axios.get("http://localhost:8080/game/1172470").then((r) => {
      console.log(r.data);
      this.setState({ data: r.data });
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    let targetGame = e.target.children[0].firstChild.lastChild.firstChild.firstChild.innerHTML;
    e.target.children[0].firstChild.lastChild.firstChild.firstChild.innerHTML = 'Select...';
    let targetAppID = this.state.allGames.find(game => game.label === targetGame).appid;
    

  };

  render() {
    return (
      <figure className="chart">
        <form
          className="chart__form"
          onSubmit={(e) => {
            this.handleFormSubmit(e);
          }}
        >
          <div className="chart__form__search">
            <Select
              className="chart__form__search__input"
              options={this.state.allGames}
            />
          </div>
          <button className="chart__form__submit">SEARCH</button>
        </form>
        <ForceGraph3D
          graphData={this.state.data}
          nodeLabel={(node) => {
            return node.name;
          }}
          backgroundColor={"rgb(27, 40, 56)"}
          width={this.state.displayWidth}
        />
      </figure>
    );
  }
}
