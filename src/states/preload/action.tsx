import { Dispatch } from "redux";
import { setLoginActionCreator } from "../authentication/action";
const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

const setPreloadActionCreator = (preload: boolean) => {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      preload,
    },
  };
};

const asyncPreload = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const token = localStorage.getItem("access_token");
      dispatch(setLoginActionCreator(token));
    } catch (error) {
      dispatch(setLoginActionCreator(null));
    } finally {
      dispatch(setPreloadActionCreator(false));
    }
  };
};

export { ActionType, setPreloadActionCreator, asyncPreload };
