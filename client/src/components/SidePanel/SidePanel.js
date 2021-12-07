import React from "react";
import "./SidePanel.scss";


export default function SidePanel(props) {
  console.log(props.closePanel);
  return (
    <div class="panel">
      <button class="panel__close-panel" onClick={(e)=> {
        const sidePanel = e.target.parentNode;
        props.closePanel(sidePanel)
      }}></button>
      <a href="#">link 1</a>
      <a href="#">link 2</a>
    </div>
  );
}
