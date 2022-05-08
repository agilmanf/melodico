import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import qr from "../../asset/qr.png";

function Checkout() {
  const [tampil, setTampil] = useState(true);
  const [ewallet, setEwallet] = useState(true);

  const [validKupon, setValidKupon] = useState(true);
  const [notvalidKupon, setNotValidKupon] = useState(true);
  const [input, setInput] = useState("");

  const user = useSelector((state)=> state.userReducer)
  console.log(user);

  let kupon = "melodico";
  const btnVoucer = () => {
    if (kupon === input) {
      alert("kupon kamu benar, akun telah di upgrade")
      axios.patch(`https://melodico.herokuapp.com/users/${user.id}`, {role:"member"}).then((res)=>console.log(res))
    } else {
      alert("Kupon Anda salah")
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="rounded-3 mt-3"
        style={{
          width: "500px",
          height: "300px",
          backgroundColor: "whitesmoke",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="text-dark text-center pt-3"> Pilih Metode Pembayaran</h2>
        <div className="mb-5">
          <button
            onClick={() => setEwallet(false)}
            style={{
              border: "none",
              backgroundColor: "#affffff",
              fontWeight: "bolder",
            }}
          >
            E-Wallet
          </button>
          <button
            onClick={() => setEwallet(true)}
            style={{
              border: "none",
              backgroundColor: "black",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            Voucer
          </button>
        </div>
        {ewallet ? (
          <div>
            <input
              className="ms-1 rounded-3"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={btnVoucer}
              className="ms-2 rounded-3"
              style={{
                border: "none",
                outline: "none",
                height: "35px",
                width: "50px",
              }}
            >
              Pilih
            </button>
            <h6
              style={{ color: "black" }}
              className={validKupon ? "d-none" : "d-block"}
            >
              Akun anda berhasil di upgrade
            </h6>
            <h6
              style={{ color: "black" }}
              className={notvalidKupon ? "d-none" : "d-block"}
            >
              Voucer salah
            </h6>
          </div>
        ) : (
          <>
            <div>
              <select
                name=""
                id=""
                className="rounded-3"
                style={{ width: "250px" }}
              >
                <option value="">OVO</option>
                <option value="">DANA</option>
                <option value="">GOPAY</option>
              </select>
              <button
                onClick={() => setTampil(false)}
                className="ms-2 rounded-3"
                style={{
                  border: "none",
                  outline: "none",
                  height: "35px",
                  width: "50px",
                }}
              >
                Pilih
              </button>
            </div>
            <h5
              className={tampil ? "d-none" : "d-inline"}
              style={{ color: "black", marginTop: "30px" }}
            >
              Scan untuk Pembayaran
            </h5>
          </>
        )}
      </div>

      <div className="p-3">
        <img
          className={tampil ? "d-none" : "d-inline"}
          style={{ width: "200px", height: "200px", marginLeft: "10px" }}
          src={qr}
          alt=""
        />
      </div>
    </div>
  );
}

export default Checkout;
