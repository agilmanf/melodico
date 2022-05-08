import { GET_TOKEN } from "../actions/spotifyAccess.action";

const initialState = {
  accessToken: "",
  refreshToken: "",
  expiresIn: "",
  clientId: "ba70ac6a4a564aa980ecfbbe38450255",
};

const spotifyAccessReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        expiresIn: action.payload.expiresIn,
      };
    default:
      return state;
  }
};

export default spotifyAccessReducer;
