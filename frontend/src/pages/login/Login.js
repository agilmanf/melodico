import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions/register&login.action";
import { Link } from "react-router-dom";

import logo from "../../asset/melodico.svg";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
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
    <>
      <section className="login row m-0">
        <aside className="col-md-6 d-none d-md-block"></aside>
        <article className="col-md-6 position-relative px-4">
          <h1 className="text-center my-5">
            Silahkan <span className="text-yellow">Login</span> Untuk Mulai
            Mendengarkan
          </h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="form-login w-75 m-auto d-flex flex-column gap-3"
          >
            <label htmlFor="email" className="d-flex flex-column">
              <span className="mb-2">Email</span>
              <input
                id="email"
                type="email"
                placeholder="john@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label htmlFor="password" className="d-flex flex-column">
              <span className="mb-2">Password</span>
              <input
                id="password"
                type="password"
                className="w-100"
                placeholder="•••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className="d-md-flex gap-3 mt-2">
              <div className="w-100">
                <span className="text-white">
                  Belum Punya Akun ?{" "}
                  <Link className="fw-bold" to="/register">
                    Daftar
                  </Link>
                </span>
                <span className="d-block text-danger"></span>
              </div>
              <div className="w-100 mt-3 mt-sm-0 d-sm-flex justify-content-end">
                <button type="submit" className="btn btn-primary h-100 w-50">
                  Login
                </button>
              </div>
            </div>
          </form>
          <img src={logo} alt="logo" className="logo" />
        </article>
      </section>
    </>
  );
}

export default Login;
