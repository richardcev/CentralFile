import { LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actions/userAction";

const initialState = {
    username: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          username: action.payload,
        };
      case LOGOUT_USER:
        return {
          ...state,
          username: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;