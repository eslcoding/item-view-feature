import React, { useEffect } from "react";
import mondayService from "../services/mondayService";
// const thisWindow = globalThis.window;const thisWindow = ;

export default function Close() {
  window.close();

  return (
    <div className="close">
      <h1>Thank you for using AutoLink! </h1>
      <p>
        If this window hasn't closed automatically, please close it and resume
        in your board view
      </p>
    </div>
  );
}
