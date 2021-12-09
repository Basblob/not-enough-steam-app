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
    banner: 'Loading...',
    developer: 'Loading...',
    website: 'Loading...'
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

  handleNodeEvent = (node) => {
    if (!this.state.showModal) {
      this.setState({ showModal: true, name: node.name });
      axios.get(`${API}/game/info/${node.id}`);
    } else if (
      this.state.showModal &&
      this.state.currentNodeFocus === node.name
    ) {
      this.setState({ showModal: false });
    } else {
      this.setState({});
      axios.get(`${API}/game/info/${node.id}`);
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
          <h2 className="network__modal__title">temp game name extra length</h2>
        </ReactModal>
        <ForceGraph3D
          extraRenderers={extraRenderers}
          graphData={this.state.data}
          nodeLabel={(node) => {
            return `${node.radius} Players Analyzed`;
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
