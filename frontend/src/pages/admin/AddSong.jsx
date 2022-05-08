import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";

function AddSong() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.userReducer);

  const [artistList, setArtistList] = useState([]);

  useEffect(() => {
    getArtist();
  }, []);

  async function getArtist() {
    const res = await axios
      .get("https://melodico.herokuapp.com/artists", {
        headers: { authorization: "Bearer " + user.token },
      })
      .catch((err) => {
        console.log(err);
      });

    setArtistList(res.data.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);

    const data = new FormData();
    for (const d in formData) {
      if (formData[d]) data.append(d, formData[d]);
    }

    setLoading(true);
    await axios
      .post("https://melodico.herokuapp.com/songs", data, {
        headers: {
          authorization: "Bearer " + user.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert("Data Berhasil di Upload");
        setFormData({});
      })
      .catch((err) => {
        console.log(err);
        alert("error");
      });
    setLoading(false);

    e.target.reset();
  }

  return (
    <>
      {loading ? <Loading /> : ""}
      <h2>Add New Song</h2>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Group className="mb-3">
          <Form.Label>
            Title <span className="text-warning">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="song title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Artist <span className="text-warning">*</span>
          </Form.Label>
          <Form.Select
            required
            onChange={(e) =>
              setFormData({ ...formData, artist: e.target.value })
            }
          >
            <option></option>
            <>
              {artistList.map((list) => (
                <option key={list["_id"]} value={list["_id"]}>
                  {list.name}
                </option>
              ))}
            </>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Genre <span className="text-warning">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="song genre"
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Release Date <span className="text-warning">*</span>
          </Form.Label>
          <Form.Control
            type="date"
            required
            placeholder="release date"
            onChange={(e) =>
              setFormData({ ...formData, releaseDate: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Video (youtube url)</Form.Label>
          <Form.Control
            type="text"
            placeholder="song video"
            onChange={(e) =>
              setFormData({ ...formData, videoUrl: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            MP3 / WAV File (max. 8MB) <span className="text-warning">*</span>
          </Form.Label>
          <Form.Control
            type="file"
            required
            accept=".mp3 ,.wav"
            placeholder="song video"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files[0] })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddSong;
