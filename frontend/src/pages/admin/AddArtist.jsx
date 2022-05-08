import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";

function AddArtist() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.userReducer);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    for (const d in formData) {
      if (formData[d]) data.append(d, formData[d]);
    }

    setLoading(true);
    await axios
      .post("https://melodico.herokuapp.com/artists", data, {
        headers: { authorization: "Bearer " + user.token },
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
      <h2>Add New Artist</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            Name <span className="text-warning">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Artist Name..."
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Country <span className="text-warning">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Origin Country..."
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Image (max. 2MB) <span className="text-warning">*</span>
          </Form.Label>
          <Form.Control
            type="file"
            required
            accept=".jpg,.jpeg,.png"
            placeholder="song video"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
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

export default AddArtist;
