import axios from "axios";

export const setUserInfo = (data) => {
  return {
    type: "SET_USER_INFO",
    payload: data,
  };
};

export const addToMyFavorite = (id, token, userId) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_TO_MY_FAVORTIE",
      payload: {},
    });

    axios
      .patch(
        "https://melodico.herokuapp.com/users/" + userId,
        { favoriteSongs: id },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        alert("Lagu Berhasil Ditambahkan ke My Favorite");
        dispatch({
          type: "ADD_TO_MY_FAVORTIE",
        });
      })

      .catch((error) => {
        alert("Sudah Didalam favorite");
        dispatch({
          type: "ADD_TO_MY_FAVORTIE",
        });
      });
  };
};

export const removeFromMyFavorite = (data) => {};
