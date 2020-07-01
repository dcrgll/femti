import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <span
        role="img"
        aria-label="cowboy emoji"
        onClick={() => window.open("https://dancargill.uk")}
      >
        🤠
      </span>
    </div>
  );
};

export default Footer;
