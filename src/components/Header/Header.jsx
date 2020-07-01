import React from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const Header = (props) => {
  if (props.isLoaded && props.playlistURL === "default") {
    console.log("default");
    console.log(props.playlistURL);
    return (
      <div className="header">
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
    console.log("not default");
    console.log(props.playlistURL);
    return (
      <div className="header">
        <div
          className="plusIconContainer"
          href={props.playlistURL}
          target="_blank"
        >
          <FontAwesomeIcon
            icon={faSpotify}
            size="2x"
            className="checkIcon"
            onClick={() => window.open(props.playlistURL)}
          />
        </div>
      </div>
    );
  } else {
    return <div className="header" />;
  }
};

export default Header;
