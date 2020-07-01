import React from "react";
import "./Container.scss";
import LoginButton from "../LoginButton";
import SongList from "../Song Lists/SongList";
import Header from "../Header/Header";

const Container = (props) => {
  if (props.isLoaded === false) {
    return (
      <div className="spotify-widget">
        <Header playlistType={props.playlistType} />
        <div className="spotify-cover-wrapper">
          <LoginButton />
        </div>
      </div>
    );
  } else if (props.isLoaded === true) {
    return (
      <div className="spotify-widget">
        <Header
          isLoaded={props.isLoaded}
          createPlaylist={props.createPlaylist}
          playlistURL={props.playlistURL}
          playlistType={props.playlistType}
        />

        <div className="spotify-cover-wrapper">
          {props.data.map((song, i) => (
            <SongList key={song.uri} song={song} i={i} />
          ))}
        </div>
      </div>
    );
  } else {
    return console.log("error!!");
  }
};

export default Container;
