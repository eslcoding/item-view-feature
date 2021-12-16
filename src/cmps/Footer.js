import React from "react";
import eslLogo from "../assets/img/esl-logo.jpg";

export default function Footer() {
  return (
    <div className="footer">
      <a
        href="https://www.eswlab.com/"
        className="logo"
        target="_blank"
        rel="noreferrer"
      >
        <img className="esl-logo-img" src={eslLogo} alt="logo" />
      </a>
      <span className="contact-us-p">
        Contact us:{" "}
        <a href="mailto:appsupport@eswlab.com">appsupport@eswlab.com</a>
      </span>
    </div>
  );
}
