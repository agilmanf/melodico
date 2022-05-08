import React from "react";
import gif from "../../asset/page404.gif";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex flex-column bg-warning vw-100 vh-100">
      <img className="m-auto" src={gif} alt="404 Not Found" />
      <Link to="/">
        <h3>Back</h3>
      </Link>
    </div>
  );
}

export default NotFound;
