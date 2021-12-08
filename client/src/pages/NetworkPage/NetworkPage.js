import React, { Component } from "react";
// import NetworkChart from "../../components/NetworkChart/NetworkChart";
import Select from "react-select";
import allGamesData from "../../data/allGamesData.json";
import initData from "../../data/CounterStrikeData.json";
import axios from "axios";
import { ForceGraph3D } from "react-force-graph";


export default class NetworkPage extends Component {
  state = {
    data: initData,
    // currentGame: 20,
    allGames: allGamesData,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevState.currentGame !== this.state.currentGame) {
  //     this.setState({currentGame: this.state.currentGame})
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.data)
  }

  handleChange = (selection) => {
    // this.setState({ currentGame: selection.appid });
    axios.get(`http://localhost:8080/game/${selection.appid}`).then((r) => {
      this.setState({ data: r.data });
      // console.log(r.data)
      console.log(this.state.data)
    });
  };

  // getCurrentGame = () => {
  //   return this.state.currentGame;
  // };

  render() {
    return (
      <article>
        <Select
          className="chart__form__search__input"
          options={this.state.allGames}
          onChange={this.handleChange}
        />
        {/* <NetworkChart
          // currentGame={this.state.currentGame}
          newData={this.state.data}
        /> */}
        <ForceGraph3D
          graphData={this.state.data}
          nodeLabel={(node) => {
            console.log(node);
          }}
          backgroundColor={"rgb(27, 40, 56)"}
        />
        ;
      </article>
    );
  }
}
