import React, { Component } from "react";
import NetworkChart from "../../components/NetworkChart/NetworkChart";
import Select from "react-select";
import allGamesData from "../../data/allGamesData.json";
import initData from "../../data/CounterStrikeData.json";

export default class NetworkPage extends Component {
  state = {
    data: initData,
    currentGame: 20,
    allGames: allGamesData,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevState.currentGame !== this.state.currentGame) {
  //     this.setState({currentGame: this.state.currentGame})
  //   }
  // }

  handleChange = (selection) => {
    this.setState({ currentGame: selection.appid });
  };

  getCurrentGame = () => {
    return this.state.currentGame;
  };

  render() {
    return (
      <article>
        <Select
          className="chart__form__search__input"
          options={this.state.allGames}
          onChange={this.handleChange}
        />
        <NetworkChart
          currentGame={this.getCurrentGame()}
          newData={this.state.data}
        />
        ;
      </article>
    );
  }
}
