import React from "react";
import "./SongList.scss";

const SongList = (props) => {
  if (props.topArtists === true) {
    return (
      <div>
        <div className="songList">
          <img src={props.song.images[0].url} alt={props.song.name} />
          <div className="songTitle">{props.song.name}</div>
          <div className="songArtist">
            {props.song.genres[0]}, {props.song.genres[1]}
          </div>
        </div>
        <hr />
      </div>
    );
  } else if (props.mostRecent === true) {
    return (
      <div>
        <div className="songList">
          <img
            src={props.song.track.album.images[0].url}
            alt={props.song.track.album.name}
          />
          <div className="songTitle">{props.song.track.name}</div>
          <div className="songArtist">{props.song.track.artists[0].name}</div>
        </div>
        <hr />
      </div>
    );
  } else {
    return (
      <div>
        <div className="songList">
          <img
            src={props.song.album.images[0].url}
            alt={props.song.album.name}
          />
          <div className="songTitle">{props.song.name}</div>
          <div className="songArtist">{props.song.artists[0].name}</div>
        </div>
        <hr />
      </div>
    );
  }
};

export default SongList;
