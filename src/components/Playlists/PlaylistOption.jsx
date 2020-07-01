import React from "react";
import "./PlaylistOptions.scss";

const PlaylistOption = (props) => {
  return (
    <div
      className="optionTitle"
      onClick={() => console.log(`hello!! ${props.title}`)}
    >
      {props.title}
    </div>
  );
};

export default PlaylistOption;
