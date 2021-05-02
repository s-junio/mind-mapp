import React from "react";
import ThemeManager, { Themes } from "../../ThemeManager";
import "./Switcher.css";

const TManager = ThemeManager.Instance;

function Switcher(props: any) {
  let isChecked = TManager.currentTheme === Themes.DARK;
  const handleClick = (ev: React.MouseEvent) => {
    props.switchHandler(ev)
  };
  return (
    <label className="switch">
      <input type="checkbox" onClick={handleClick} defaultChecked={isChecked}></input>
      <span className="slider round"></span>
    </label>
  );
}

export default Switcher;
