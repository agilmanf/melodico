import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { playNow } from "../redux/actions/playback.action";
import { addToMyFavorite } from "../redux/actions/user.action";
import "./songTable.css";

function SongTable({ songsList }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  return (
    <div className="songs-container my-3">
      <h3 className="mb-4">Songs</h3>
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
                <img
                  src={`https://melodico.herokuapp.com/images/${song.artist.image}`}
                  alt={song.artist.name}
                />
                <div className="table-song-title">
                  <p>{song.title}</p>
                  <span>{song.artist.name}</span>
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
                      dispatch(addToMyFavorite(song._id, user.token, user.id))
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
  );
}

export default SongTable;
