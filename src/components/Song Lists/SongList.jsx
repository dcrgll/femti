import React from "react";
import "./SongList.scss";

const SongList = (props) => {
  return (
    <div>
      <div className="songList">
        <img src={props.song.album.images[0].url} alt={props.song.album.name} />
        <div className="songTitle">{props.song.name}</div>
        <div className="songArtist">{props.song.artists[0].name}</div>
      </div>
      <hr />
    </div>
  );
};

export default SongList;
