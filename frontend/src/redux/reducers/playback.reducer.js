import { PLAY } from "../actions/playback.action";

const initialState = {
  currentSong: {
    title: "",
    artist: "",
    image: "",
    url: "",
  },
};

const playbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      return {
        ...state,
        currentSong: { ...state.currentSong, url: action.payload },
      };
    default:
      return state;
  }
};

export default playbackReducer;
