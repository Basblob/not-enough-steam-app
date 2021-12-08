import React from "react";
import "./SidePanel.scss";


export default function SidePanel(props) {
  console.log(props.closePanel);
  return (
    <div className="panel">
      <button className="panel__close-panel" onClick={(e)=> {
        const sidePanel = e.target.parentNode;
        props.closePanel(sidePanel)
      }}></button>
      <a href="/">link 1</a>
      <a href="/network">link 2</a>
    </div>
  );
}
