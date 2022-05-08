export const PLAY = "PLAY";

export const playNow = (uri) => {
  return {
    type: PLAY,
    payload: uri,
  };
};
