import React from "react";
import ArtistCard from "./ArtistCard";

import "./artist.css";

function ArtistsContainer({ artistsList }) {
  return (
    <div className="artist-container">
      <h3 className="mb-4">Artists</h3>
      <div className="artist-card-container">
        <>
          {artistsList.map((artist, index) => (
            <ArtistCard key={index} artist={artist} />
          ))}
        </>
      </div>
    </div>
  );
}

export default ArtistsContainer;
