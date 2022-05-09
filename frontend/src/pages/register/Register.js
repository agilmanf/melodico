import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/actions/register&login.action";
import { Link } from "react-router-dom";

import "./register.css";
import logo from "../../asset/melodico.svg";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [user, setUser] = useState(false);

  const errorMessege = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm)
      return (errorMessege.current.innerHTML = "*Password tidak cocok");

    dispatch(userRegister({ name, email, password }));
    alert("Daftar Berhasil");
    window.location = "/login";
  };

  async function checkUser() {
    const userLogin = await axios
      .get("https://melodico.herokuapp.com/token")
      .catch((err) => false);

    setUser(userLogin);
  }

  useEffect(() => {
    checkUser();

    if (user) {
      window.location = "/";
    }
  }, [user]);

  return (
    <section className="register row m-0">
      <article className="col-md-7 position-relative px-4">
        <div>
          <h1 className="text-center my-5">
            <span className="text-yellow">Daftar Gratis</span> Untuk Mulai
            Mendengarkan
          </h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="form-register w-75 m-auto d-flex flex-column gap-3"
          >
            <label htmlFor="nama" className="d-flex flex-column">
              <span className="mb-2">Nama Lengkap</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="nama"
                type="text"
                placeholder="John Doe"
                required
              />
            </label>
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
            <div className="d-md-flex justify-content-between w-100 gap-3">
              <label htmlFor="password" className="d-flex flex-column w-100">
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
              <label htmlFor="confirm" className="d-flex flex-column w-100">
                <span className="mb-2">Confirm Password</span>
                <input
                  id="confirm"
                  type="password"
                  className="w-100"
                  placeholder="•••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="d-md-flex gap-3 mt-2">
              <div className="w-100">
                <span className="text-white">
                  Sudah Punya Akun ?{" "}
                  <Link className="fw-bold" to="/login">
                    Login
                  </Link>
                </span>
                <span ref={errorMessege} className="d-block text-danger"></span>
              </div>
              <div className="w-100 mt-3 mt-sm-0 d-sm-flex justify-content-end">
                <button type="submit" className="btn btn-primary h-100 w-50">
                  Daftar
                </button>
              </div>
            </div>
          </form>
        </div>
        <img src={logo} alt="logo" className="logo" />
      </article>
      <aside className="col-md-5 d-none d-md-block"></aside>
    </section>
  );
}

export default Register;
