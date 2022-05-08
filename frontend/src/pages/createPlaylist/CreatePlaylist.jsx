import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./createPlayList.css";

function CreatePlaylist() {
  const [lagu, setLagu] = useState([]);
  const [tambahLagu, setTambahLagu] = useState("");
  const [dataLagu, setDataLagu] = useState([]);
  const [laguku, setLaguku] = useState([]);
  const user = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (user) {
      getLagu();
    }
  }, [user]);

  useEffect(() => {
    dataLagu.forEach((d) => {
      lagu.forEach((l) => {
        if (l._id === d) {
          console.log(l);
          setLaguku([...laguku, l]);}
      });
    });
  }, [dataLagu]);


  const getLagu = async () => {
    const result = await axios.get("https://melodico.herokuapp.com/songs", {
      headers: { authorization: "Bearer " + user.token },
    });
    setLagu(result.data.songs);
    console.log(result.data.songs);
  };

  const handleClick = (e) => {
    e.preventDefault();

    setDataLagu([...dataLagu, tambahLagu]);
    console.log(tambahLagu);
  };

  const postLaguku = async(e)=>{
    try {
        await axios.post('https://melodico.herokuapp.com/playlists', {
          songs : laguku
        })

    } catch (error) {
        console.log(error);
    }
}

  return (
    <div>
      <div className="header container-fluid">
        <div className="row">
          <div className="col-5 p-0">
            <img
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>

          <div className="col-6">
            <p>Play List</p>
            <h2>MELODICO</h2>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <table style={{ width: "300px" }}>
              <thead>
                <tr>
                  <th className="ms-3">#</th>
                  <th className="ms-3">Title</th>
                  <th className="ms-3">Cancel</th>
                </tr>
              </thead>
              <tbody>
                {laguku.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td
                      onClick={(e) =>
                        setLaguku(
                          laguku.slice(laguku.indexOf(e.target.index))
                        )
                      }
                    >
                      <ion-icon name="close-outline"></ion-icon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form onSubmit={handleClick}>
              <select
                className="mt-3 rounded-3"
                style={{ width: "300px" }}
                name=""
                id=""
                onChange={(e) => setTambahLagu(e.target.value)}
              >
                {lagu.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <button
                className="ms-2 rounded-3"
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "black",
                  color: "white",
                  height: "35px",
                }}
                type="submit"
              >
                Add to Play List
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylist;
