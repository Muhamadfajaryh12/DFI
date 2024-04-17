import { Dispatch } from "redux";
import AuthenticationAPI from "../../API/AuthenticationAPI";

const ActionType = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const setLoginActionCreator = (auth: any) => {
  return {
    type: ActionType.LOGIN,
    payload: {
      auth,
    },
  };
};

const setLogoutActionCreator = () => {
  return {
    type: ActionType.LOGOUT,
    payload: {
      auth: null,
    },
  };
};

const asyncLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthenticationAPI.login({ username, password });
      if (response?.status == true) {
        AuthenticationAPI.setAccessToken(response?.token, response?.id);
        dispatch(setLoginActionCreator(response?.token));
      }
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

const asyncLogout = () => {
  return async (dispatch: Dispatch) => {
    const response = await AuthenticationAPI.logout();
    dispatch(setLogoutActionCreator());
    localStorage.removeItem("access_token");
    localStorage.removeItem("id");
    return response;
  };
};
export { ActionType, setLoginActionCreator, asyncLogin, asyncLogout };
