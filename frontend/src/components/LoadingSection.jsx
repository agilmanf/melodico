import React from "react";
import Loading from "../asset/loading.svg";

function LoadingSection() {
  return (
    <div className="d-flex" style={{ height: "70vh" }}>
      <img className="m-auto" src={Loading} width="100px" alt="loading" />
    </div>
  );
}

export default LoadingSection;
