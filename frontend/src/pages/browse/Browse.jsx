import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ArtistCard from "../../components/ArtistCard";
import ArtistsContainer from "../../components/ArtistsContainer";
import LoadingSection from "../../components/LoadingSection";
import SongTable from "../../components/SongTable";

function Browse() {
  const user = useSelector((state) => state.userReducer);
  const [artistsList, setArtistsList] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getDatas() {
    setLoading(true);
    const artist = await axios.get(
      "https://melodico.herokuapp.com/artists/sample?limit=6",
      {
        headers: { authorization: "Bearer " + user.token },
      }
    );

    const songs = await axios.get(
      "https://melodico.herokuapp.com/songs/sample?limit=10",
      {
        headers: { authorization: "Bearer " + user.token },
      }
    );

    setArtistsList(artist.data.artists);
    setSongsList(songs.data.songs);
    setLoading(false);
  }

  useEffect(() => {
    if (user) {
      getDatas();
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <LoadingSection />
      ) : (
        <>
          <ArtistsContainer artistsList={artistsList} />
          <SongTable songsList={songsList} />
        </>
      )}
    </>
  );
}

export default Browse;
