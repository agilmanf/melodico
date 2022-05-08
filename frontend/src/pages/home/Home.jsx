import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.css";
import Loading from "../../components/Loading";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import { useSelector } from "react-redux";
import ad from "../../asset/ad.png";

import { Link } from "react-router-dom";

function Home() {
  const [update, setUpdate] = useState("");
  const [posting, setPosting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [love, setLove] = useState(1);

  const user = useSelector((state) => state.userReducer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios
        .post(
          "https://melodico.herokuapp.com/posting/",
          {
            content: update,
            postedBy: "6255429d0b10cd13256b01c5",
            postDate: moment().format("YYMMDD, h:mm:ss"),
          },
          { headers: { authorization: "Bearer " + user.token } }
        )
        .then((res) => {
          console.log(res);
          getPost();
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setUpdate("");
  };

  const getPost = async () => {
    setLoading(true);
    const res = await axios.get("https://melodico.herokuapp.com/posting/", {
      headers: { authorization: "Bearer " + user.token },
    });
    console.log(res.data.data);
    setPosting(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) getPost();
  }, [user]);

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://melodico.herokuapp.com/posting/${id}`, {
        headers: { authorization: "Bearer " + user.token },
      });
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const clickLove = async () => {
    try {
      await axios
        .post(
          "https://melodico.herokuapp.com/posting/",
          {
            love: love,
          },
          { headers: { authorization: "Bearer " + user.token } }
        )
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="container flex-column">
      {loading ? <Loading /> : ""}
      <header className="shadow d-flex">
        <div className="header-content">
          <h1>It's more than music!</h1>
        </div>
        <div className="overlay m-auto"></div>
      </header>
      <div className="row w-100">
        <div className="col-lg-8 p-0 d-flex flex-column align-items-center">
          <div className="updateLagu rounded-3">
            <img
              src={`https://melodico.herokuapp.com/images/${user.image}`}
              alt={user.name}
            />
            <form onSubmit={handleSubmit}>
              <span>Share Your Melody !</span>
              <input
                type="text"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>

          {/* Posting */}
          <div className="get-update-container d-flex flex-column align-items-center">
            {posting.map((item) => (
              <div className="getUpdate mt-1 rounded-3 me-0" key={item._id}>
                <Dropdown style={{ float: "right" }}>
                  <Dropdown.Toggle
                    variant="none"
                    id="dropdown-basic"
                    style={{ heigth: "40px", border: "none", outline: "none" }}
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => deletePost(item["_id"])}>
                      Hapus
                    </Dropdown.Item>
                    <Dropdown.Item>Sembunyikan</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={`https://melodico.herokuapp.com/images/${user.image}`}
                    alt={user.name}
                  />
                  <div style={{ display: "inline-block" }}>
                    <p className="nama">{capitalizeFirstLetter(user.name)}</p>
                    <p
                      className="p-0 m-0"
                      style={{ color: "black", fontSize: "10px" }}
                    >
                      {moment(item.postDate, "YYMMDD, h:mm:ss").fromNow()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="my-2 mx-2" style={{ color: "black" }}>
                    {item.content}
                  </p>
                </div>
                <div className="love-icon mx-1">
                  <ion-icon onClick={clickLove} name="heart-outline"></ion-icon>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sidebar col-lg-4" style={{ zIndex: 0 }}>
          <h5 className="m-0">People You Might Know</h5>
          <hr className="my-2 mx-0" />
        </div>
      </div>
    </div>
  );
}

export default Home;
