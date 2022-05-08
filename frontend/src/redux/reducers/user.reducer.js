const initialState = false;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
