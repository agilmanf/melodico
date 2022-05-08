import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSection from "../../components/LoadingSection";
import SongTable from "../../components/SongTable";

function Favourites() {
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getDatas(user.id);
  }, [user]);

  async function getDatas(id) {
    setLoading(true);

    const userData = await axios.get(
      `https://melodico.herokuapp.com/users/${id}`,
      {
        headers: { authorization: "Bearer " + user.token },
      }
    );

    setSongsList(userData.data.user.favoriteSongs);
    if (userData.data.user.favoriteSongs.length !== 0) setEmpty(false);
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <LoadingSection />
      ) : (
        <>
          {empty ? (
            <h4>You Don't Have Any Favourite Songs</h4>
          ) : (
            <>
              <h2>Favorites</h2>
              <SongTable songsList={songsList} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Favourites;
