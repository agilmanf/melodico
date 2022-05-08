import React from "react";
import Container from "react-bootstrap/Container";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=ba70ac6a4a564aa980ecfbbe38450255&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

function Spotify() {
  return (
    <Container>
      <a href={AUTH_URL} className="btn btn-success btn-lg">
        Login With Spotify
      </a>
    </Container>
  );
}

export default Spotify;
