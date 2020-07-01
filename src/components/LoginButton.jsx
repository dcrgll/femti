import React from "react";
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from "../services/config";

const LoginButton = () => {
  return (
    <div className="LoginButton">
      <a
        className="button"
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}
      >
        SPOTIFY
      </a>
    </div>
  );
};

export default LoginButton;
