import React from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const Header = (props) => {
  const changeIcon = () => {
    window.open(props.playlistURL);
    props.setPlaylistURL("default");
  };

  if (props.isLoaded && props.playlistURL === "default") {
    return (
      <div className="header">
        <div className="brandLogo" onClick={() => props.setPlaylist()}>
          {props.playlistType}
        </div>
        <div className="plusIconContainer">
          <FontAwesomeIcon
            icon={faPlus}
            size="2x"
            className="plusIcon"
            onClick={props.createPlaylist}
          />
        </div>
      </div>
    );
  } else if (props.isLoaded && props.playlistURL !== "") {
    return (
      <div className="header">
        <div className="brandLogo" onClick={() => props.setPlaylist()}>
          {props.playlistType}
        </div>
        <div
          className="plusIconContainer"
          href={props.playlistURL}
          target="_blank"
        >
          <FontAwesomeIcon
            icon={faSpotify}
            size="2x"
            className="checkIcon"
            onClick={() => changeIcon()}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="header">
        <div className="brandLogo" onClick={() => props.setPlaylist()}>
          {/* {props.playlistType[playlist]} */}
        </div>
      </div>
    );
  }
};

export default Header;
