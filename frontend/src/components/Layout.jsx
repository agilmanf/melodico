import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserInfo } from "../redux/actions/user.action";

// Components ///
import Navbar from "./Navbar";
import Player from "./Player";
import Sidebar from "./Sidebar";

// Style //
import "./layout.css";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!user) getUser();
  }, [user]);

  async function getUser() {
    const res = await axios
      .get("https://melodico.herokuapp.com/token")
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
    setUser(res.data);
    dispatch(setUserInfo(res.data));
  }

  //////////////////////////////////////
  return (
    <>
      <div className="d-flex" style={{ position: "relative" }}>
        <Sidebar />
        <div className="w-100">
          <Navbar />
          <div
            className="px-5 py-4"
            style={{
              margin: "50px 0 50px 200px",
              position: "relative",
            }}
          >
            <Outlet />
          </div>
        </div>
        <Player />
      </div>
    </>
  );
}

export default Layout;
