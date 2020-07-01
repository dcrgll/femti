import React from "react";
import "./PlaylistOptions.scss";
import PlaylistOption from "./PlaylistOption";
const PlaylistOptions = () => {
  return (
    <div className="grid">
      <PlaylistOption title="Top Songs" />
      <PlaylistOption title="Top Artists" />
      <PlaylistOption title="Recent" />
    </div>
  );
};

export default PlaylistOptions;
