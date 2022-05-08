import axios from "axios";
axios.defaults.withCredentials = true;

export const USER_REGISTER = "USER_REGISTER";
export const USER_LOGIN = "USER_LOGIN";

export const userRegister = (data) => {
  console.log("2.masuk actions");
  return (dispatch) => {
    dispatch({
      type: USER_REGISTER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "POST",
      url: "https://melodico.herokuapp.com/users",
      data: data,
    })
      .then((response) => {
        console.log("3. dapet api", response.data);
        dispatch({
          type: USER_REGISTER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })

      .catch((error) => {
        console.log("3. gagal dapet api", error.message);
        dispatch({
          type: USER_REGISTER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const userLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: USER_LOGIN,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "POST",
      url: "https://melodico.herokuapp.com/login",
      data: data,
    })
      .then((response) => {
        alert("login berhasil");
        console.log("dapet api", response.data);
        window.location = "/";
        dispatch({
          type: USER_LOGIN,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })

      .catch((error) => {
        console.log("gagal dapet api", error.message);
        dispatch({
          type: USER_LOGIN,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
