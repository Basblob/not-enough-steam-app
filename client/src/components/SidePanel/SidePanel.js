import React from "react";
import "./SidePanel.scss";

export default function SidePanel(props) {
  console.log(props.closePanel);
  return (
    <div className="panel">
      <button
        className="panel__close-panel"
        onClick={(e) => {
          const sidePanel = e.target.parentNode;
          props.closePanel(sidePanel);
        }}
      ></button>
      <a className="panel__link" href="/">
        ABOUT
      </a>
      <a className="panel__link" href="/network">
        FIND GAMES
      </a>
      <a
        className="panel__link"
        href="https://store.steampowered.com"
        target="_blank"
        rel="noreferrer"
      >
        STEAM STORE
      </a>
    </div>
  );
}
