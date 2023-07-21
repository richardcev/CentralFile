export const LOGIN_USER_SUCCESS= 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER= 'LOGOUT_USER';


export const loginUserSuccess = (username) =>{
    return{
        type: LOGIN_USER_SUCCESS,
        payload: username,
    }
};

export const logoutUser = () => ({
    type: LOGOUT_USER,
  });