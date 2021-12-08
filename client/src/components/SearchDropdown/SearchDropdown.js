import React, { Component } from "react";
import "./SearchDropdown.scss";


export default class SearchDropdown extends Component {
  render() {
    return (
      <div className="dropdown">
        {/* {allGamesData.filter(val => {
          if (this.props.searchTerm === '') {
            return val;
          } else if(val.name.toLowerCase().includes(this.props.searchTerm.toLowerCase())) {
            return val;
          }
        }).map((game) => {
          return <p key={game.appid}>{game.name}</p>;
        })} */}
      </div>
    );
  }
}
