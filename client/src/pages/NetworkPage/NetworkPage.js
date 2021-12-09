import React, { Component } from "react";
import Select from "react-select";
import allGamesData from "../../data/gamesDropdown.json";
import initData from "../../data/CounterStrikeData.json";
import axios from "axios";
import { ForceGraph3D } from "react-force-graph";
import ReactModal from "react-modal";
import "./NetworkPage.scss";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import gear from "../../assets/loading-gear.svg";
const API = "http://localhost:8080";

export default class NetworkPage extends Component {
  state = {
    data: initData,
    allGames: allGamesData,
    isLoading: false,
    showModal: false,
    currentParent: "Counter Strike: Global Offensive",
    name: "Loading...",
    desc: "Loading...",
    banner: "Loading...",
    developer: "Loading...",
    publisher: "Loading...",
    website: "https://store.steampowered.com/app/730",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.setState({
        currentParent: this.state.data.nodes.find(
          (node) => node.group === "parent"
        ).name,
      });
    }
  }

  handleChange = (selection) => {
    this.setState({ isLoading: true });
    axios.get(`${API}/game/${selection.appid}`).then((r) => {
      this.setState({ data: r.data, isLoading: false });
    });
  };

  parseGameInfo = (data) => {
    let gameData = Object.entries(data);
    gameData = gameData[0][1];

    this.setState({
      name: gameData.data.name,
      desc: gameData.data.short_description,
      website: `https://store.steampowered.com/app/${gameData.data.steam_appid}`,
      banner: gameData.data.header_image,
      developer: gameData.data.developers[0],
      publisher: gameData.data.publishers[0],
    });
  };

  handleNodeEvent = (node) => {
    if (!this.state.showModal) {
      this.setState({ showModal: true });
      axios.get(`${API}/game/info/${node.id}`).then((r) => {
        this.parseGameInfo(r.data);
      });
    } else {
      axios.get(`${API}/game/info/${node.id}`).then((r) => {
        this.parseGameInfo(r.data);
      });
    }
  };

  render() {
    const extraRenderers = [new CSS2DRenderer()];
    const showLoad = this.state.isLoading
      ? { display: "inline-block" }
      : { display: "none" };

    return (
      <article className="network">
        <Select
          className="network__input"
          options={this.state.allGames}
          onChange={this.handleChange}
        />

        <figure className="loading-container">
          <img
            className="network__loading"
            src={gear}
            alt="loading gear"
            style={showLoad}
          />
        </figure>

        <ReactModal
          className="network__modal"
          overlayClassName="network__modal-overlay"
          ariaHideApp={false}
          isOpen={this.state.showModal}
        >
          <button
            className="network__modal__close"
            onClick={(e) => {
              this.setState({showModal: false});
            }}
          ></button>
          <h2 className="network__modal__title">{this.state.name}</h2>
          <img
            className="network__modal__banner"
            src={this.state.banner}
            alt="game banner"
          />
          <div className="text-container">
            <div className="text-subcontainer">
              <p className="label">Developer:</p>
              <p className="network__modal__dev">{`${this.state.developer}`}</p>
            </div>
            <div className="text-subcontainer">
              <p className="label">Publisher:</p>
              <p className="network__modal__pub">{`${this.state.publisher}`}</p>
            </div>
          </div>
          <p className="network__modal__desc modal-text">{this.state.desc}</p>
          <a
            className="network__modal__link"
            href={this.state.website}
            target="_blank"
            rel="noreferrer"
          >
            TAKE ME TO THE SITE
          </a>
        </ReactModal>

        <ForceGraph3D
          extraRenderers={extraRenderers}
          graphData={this.state.data}
          nodeLabel={(node) => {
            return `${node.radius * 5} Players Analyzed`;
          }}
          onNodeRightClick={(node) => {
            this.handleNodeEvent(node);
          }}
          nodeThreeObject={(node) => {
            const nodeEl = document.createElement("div");
            nodeEl.textContent = node.name;
            nodeEl.style.color = node.color;
            nodeEl.className = "node-label";
            return new CSS2DObject(nodeEl);
          }}
          backgroundColor={"rgb(27, 40, 56)"}
          nodeAutoColorBy="name"
          nodeThreeObjectExtend={true}
        />
      </article>
    );
  }
}
