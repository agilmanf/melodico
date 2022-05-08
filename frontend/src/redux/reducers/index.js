import { combineReducers } from "redux";

import register from "./register&login";
import spotifyAccessReducer from "./spotifyAccess.reducer";
import playbackReducer from "./playback.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  register,
  spotifyAccessReducer,
  playbackReducer,
  userReducer,
});
