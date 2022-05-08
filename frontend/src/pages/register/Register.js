import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../../asset/melodico.png";
import "./register.css";
import { userRegister } from "../../redux/actions/register&login.action";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister({ name: name, email: email, password: password }));
  };

  async function getUser() {
    const userLogin = await axios
      .get("https://melodico.herokuapp.com/token")
      .catch((err) => console.log(err));

    setUser(userLogin);
  }

  useEffect(() => {
    getUser();

    if (user) {
      window.location = "/";
    }
  }, [user]);

  return (
    <div>
      <div className="container">
        <div className="mt-4">
          <img className="logo-register rounded-3" src={logo} alt="" />
          <p className="title-register text-center">
            Daftar gratis unutk mulai mendengarkan
          </p>
        </div>

        <div className="content-form mb-5">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label className="d-block">Name :</label>
            <input
              type="text"
              className="w-100 rounded-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="d-block mt-3">Email :</label>
            <input
              type="text"
              className="w-100 rounded-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="d-block mt-3">Password :</label>
            <input
              type="password"
              className="w-100 rounded-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-2">
              <button type="submit" className="btn-register rounded-3">
                Register
              </button>
              <p className="d-inline ms-2">
                Sudah punya akun?{" "}
                <Link to="/login">
                  <b>Login</b>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
