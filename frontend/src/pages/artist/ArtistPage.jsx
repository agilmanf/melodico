import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSection from "../../components/LoadingSection";
import { playNow } from "../../redux/actions/playback.action";
import { addToMyFavorite } from "../../redux/actions/user.action";

import "./artistPage.css";

function ArtistPage() {
  const { id } = useParams();
  const [artistData, setArtistData] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getDatas(id);
  }, [id]);

  async function getDatas(id) {
    setLoading(true);

    const artist = await axios.get(
      `https://melodico.herokuapp.com/artists/${id}`,
      {
        headers: { authorization: "Bearer " + user.token },
      }
    );

    console.log(artist.data);

    setArtistData(artist.data.data);
    setSongsList(artist.data.data.songs);
    setLoading(false);
  }
  return (
    <>
      {loading ? (
        <LoadingSection />
      ) : (
        <div className="row mt-3">
          <div className="col-lg-4 d-flex justify-content-center align-self-start pt-3">
            <img
              className="artist-page-image"
              src={`https://melodico.herokuapp.com/images/${artistData.image}`}
              alt={artistData.name}
            />
          </div>
          <div className="col-lg-8 ps-4">
            <div className="songs-container my-3">
              <h1 className="m-0">{artistData.name}</h1>
              <span
                className="d-block ps-1"
                style={{ color: "#ccc", cursor: "default" }}
              >
                Artist - {artistData.country}
              </span>
              <h5 className="mt-4 mb-3">Songs</h5>
              <Table hover borderless variant="dark">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "50px" }}>
                      #
                    </th>
                    <th>Title</th>
                    <th className="text-center" style={{ width: "200px" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {songsList.map((song, index) => (
                    <tr key={index}>
                      <td>
                        <span
                          style={{ height: "50px" }}
                          className="d-flex justify-content-center align-items-center fw-bold"
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="table-song-content d-flex gap-3">
                        <div className="table-song-title">
                          <p>{song.title}</p>
                          <span>Album Name</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-song-action d-flex gap-2 justify-content-center align-items-center">
                          <ion-icon
                            name="play"
                            onClick={() =>
                              dispatch(
                                playNow(
                                  `https://melodico.herokuapp.com/music/${song.file}`
                                )
                              )
                            }
                          ></ion-icon>
                          <ion-icon
                            name="heart-outline"
                            onClick={() =>
                              dispatch(
                                addToMyFavorite(song._id, user.token, user.id)
                              )
                            }
                          ></ion-icon>
                          <ion-icon name="ellipsis-horizontal"></ion-icon>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArtistPage;
