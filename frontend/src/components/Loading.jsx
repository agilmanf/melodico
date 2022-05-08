import React from "react";
import loadingSVG from "../asset/loading.svg";
import "./loading.css";

function Loading() {
  return (
    <div
      className="loading d-flex align-items-center"
    >
      <img
        className="m-auto"
        src={loadingSVG}
        alt="Loading"
        style={{ width: "100px" }}
      />
    </div>
  );
}

export default Loading;
