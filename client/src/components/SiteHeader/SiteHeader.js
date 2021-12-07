import React from "react";
import "./SiteHeader.scss";
import SidePanel from "../SidePanel/SidePanel";
import logo from "../../assets/header-logo.png";
import axios from "axios";

const openPanel = (target) => {
  target.style.width = "250px";
};
const closePanel = (target) => {
  target.style.width = 0;
};


export default function SiteHeader() {
  return (
    <header class="site-header">
      <SidePanel closePanel={closePanel} />
      <button
        onClick={(e) => {
          const sidePanel = e.target.parentNode.children[0];
          openPanel(sidePanel);
        }}
        class="site-header__open-panel"
      ></button>
      <div class="site-header__title">
        <h1 class="site-header__title__text">NOT ENOUGH</h1>
        <img
          src={logo}
          alt="steam piston"
          class="site-header__title__logo"
        />
      </div>
    </header>
  );
}
