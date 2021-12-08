import React from "react";
import "./SiteHeader.scss";
import SidePanel from "../SidePanel/SidePanel";
import logo from "../../assets/header-logo.png";

const openPanel = (target) => {
  target.style.width = "250px";
};
const closePanel = (target) => {
  target.style.width = 0;
};


export default function SiteHeader() {
  return (
    <header className="site-header">
      <SidePanel closePanel={closePanel} />
      <button
        onClick={(e) => {
          const sidePanel = e.target.parentNode.children[0];
          openPanel(sidePanel);
        }}
        className="site-header__open-panel"
      ></button>
      <div className="site-header__title">
        <h1 className="site-header__title__text">NOT ENOUGH</h1>
        <img
          src={logo}
          alt="steam piston"
          className="site-header__title__logo"
        />
      </div>
    </header>
  );
}
