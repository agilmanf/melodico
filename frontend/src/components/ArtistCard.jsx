import React from "react";
import { useNavigate } from "react-router-dom";

function ArtistCard({ artist }) {
  const navigate = useNavigate();

  return (
    <div className="artist-card">
      <div
        className="artist-image-container"
        onClick={() => navigate(`/artist/${artist._id}`)}
      >
        <div
          className="artist-image"
          style={{
            background: `url(https://melodico.herokuapp.com/images/${artist.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="artist-card-content d-flex flex-column align-items-center">
        <h5
          className="p-0 m-0"
          onClick={() => navigate(`/artist/${artist._id}`)}
        >
          {artist.name}
        </h5>
        <p style={{ fontSize: "14px" }}>Artist</p>
      </div>
    </div>
  );
}

export default ArtistCard;
