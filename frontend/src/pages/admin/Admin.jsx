import React from "react";
import { Link } from "react-router-dom";
import "./menuCard.css";

function Admin() {
  return (
    <>
      <h4 className="mb-4">System Manager</h4>
      <div className="menu-card-container d-flex flex-wrap gap-4">
        <Link to="/admin/song" className="text-light">
          <div className="menu-card">
            <div
              className="menu-card-background"
              style={{
                backgroundImage:
                  "url(https://source.unsplash.com/Jm9P0mDPo6A/300x200)",
              }}
            >
              <div className="menu-card-content d-flex justify-content-end align-items-end p-3">
                <div className="d-flex align-items-center">
                  <h5 className="pe-2">Song</h5>
                  <ion-icon
                    name="add-circle-outline"
                    style={{ fontSize: "30px" }}
                  ></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/admin/artist" className="text-light">
          <div className="menu-card">
            <div
              className="menu-card-background"
              style={{
                backgroundImage:
                  "url(https://source.unsplash.com/OKLqGsCT8qs/300x200)",
              }}
            >
              <div className="menu-card-content d-flex justify-content-end align-items-end p-3">
                <div className="d-flex align-items-center">
                  <h5 className="pe-2">Artist</h5>
                  <ion-icon
                    name="add-circle-outline"
                    style={{ fontSize: "30px" }}
                  ></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/admin/album" className="text-light">
          <div className="menu-card">
            <div
              className="menu-card-background"
              style={{
                backgroundImage:
                  "url(https://source.unsplash.com/_kXXlLPnKEc/300x200)",
              }}
            >
              <div className="menu-card-content d-flex justify-content-end align-items-end p-3">
                <div className="d-flex align-items-center">
                  <h5 className="pe-2">Album</h5>
                  <ion-icon
                    name="add-circle-outline"
                    style={{ fontSize: "30px" }}
                  ></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Admin;
