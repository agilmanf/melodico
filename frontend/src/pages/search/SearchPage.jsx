import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ArtistsContainer from "../../components/ArtistsContainer";
import LoadingSection from "../../components/LoadingSection";
import SongTable from "../../components/SongTable";

function SearchPage() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userReducer);

  const [searchParams, setSearchParams] = useSearchParams();
  const [artistsList, setArtistsList] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const [artistFound, setArtistFound] = useState(false);
  const [songFound, setSongFound] = useState(false);

  useEffect(() => {
    getDatas(searchParams.get("q"));
  }, [searchParams]);

  async function getDatas(search) {
    setLoading(true);
    setArtistFound(false);
    setSongFound(false);

    const artist = await axios.get(
      `https://melodico.herokuapp.com/artists?search=${search}&limit=8`,
      {
        headers: { authorization: "Bearer " + user.token },
      }
    );

    const songs = await axios.get(
      `https://melodico.herokuapp.com/songs?search=${search}&limit=15`,
      {
        headers: { authorization: "Bearer " + user.token },
      }
    );

    setArtistsList(artist.data.data);
    setSongsList(songs.data.songs);

    if (artist.data.data.length !== 0) setArtistFound(true);
    if (songs.data.songs.length !== 0) setSongFound(true);
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <LoadingSection />
      ) : (
        <>
          {!songFound && !artistFound ? (
            <h2>Data Not Found</h2>
          ) : (
            <>
              {artistFound ? (
                <ArtistsContainer artistsList={artistsList} />
              ) : (
                ""
              )}
              {songFound ? <SongTable songsList={songsList} /> : ""}
            </>
          )}
        </>
      )}
    </>
  );
}

export default SearchPage;
