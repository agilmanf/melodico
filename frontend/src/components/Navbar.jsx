import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./navbar.css";

import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const [searchInput, setSearchInput] = useState("");

  async function logout() {
    await axios
      .delete("https://melodico.herokuapp.com/logout")
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  function search(e) {
    e.preventDefault();
    navigate(`/search?q=${searchInput}`);
  }

  return (
    <nav>
      <div className="container-fluid">
        <div className="row">
          <div className="mx-5 col d-flex justify-content-between">
            <div className="search">
              <form onSubmit={(e) => search(e)}>
                <input
                  type="text"
                  className="search-input"
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search Artist / Songs"
                />
                <ion-icon onClick={search} name="search-circle"></ion-icon>
              </form>
            </div>
            <div className="d-flex justify-content-end">
              <Link to="/upgrade" className="btn-upgrade shadow">
                Upgrade Account
              </Link>

              <Dropdown
                style={{
                  width: "40px",
                  heigth: "40px",
                  borderRadius: "50%",
                }}
              >
                <Dropdown.Toggle
                  variant="none"
                  id="dropdown-basic"
                  style={{
                    heigth: "40px",
                    border: "none",
                    outline: "none",
                    color: "white",
                  }}
                >
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      boxSizing: "border-box",
                      objectFit: "cover",
                    }}
                    src={`https://melodico.herokuapp.com/images/${user.image}`}
                    alt=""
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      My Account
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
