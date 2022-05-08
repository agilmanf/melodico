import axios from "axios";
// axios.defaults.withCredentials = true;

export const GET_TOKEN = "GET_TOKEN";

export const getToken = (code) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_TOKEN,
      payload: {
        accessToken: "",
        refreshToken: "",
        expiresIn: "",
      },
    });

    axios
      .post("http://localhost:3001/spotify", { code })
      .then((res) => {
        dispatch({
          type: GET_TOKEN,
          payload: {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            expiresIn: res.data.expiresIn,
          },
        });

        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.log(err);
        // window.location = "/";
      });
  };
};
