import { USER_REGISTER, USER_LOGIN } from "../actions/register&login.action";

const initialState = {
  userRegisterResult: false,
  userRegisterLoading: false,
  userRegisterError: false,

  userLoginResult: false,
  userLoginLoading: false,
  userLoginError: false,
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER:
      console.log("4(3).masuk reducer");
      return {
        ...state,
        userRegisterResult: action.payload.data,
        userRegisterLoading: action.payload.loading,
        userRegisterError: action.payload.errorMessage,
      };

    case USER_LOGIN:
      return {
        ...state,
        userLoginResult: action.payload.data,
        userLoginLoading: action.payload.loading,
        userLoginError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default register;
