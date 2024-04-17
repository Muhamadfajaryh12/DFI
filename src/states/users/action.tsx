import { Dispatch } from "redux";
import AuthenticationAPI from "../../API/AuthenticationAPI";

const ActionType = {
  GET_PROFILE: "GET_PROFILE",
  GET_EMPLOYEE: "GET_EMPLOYEE",
  STORE_EMPLOYEE: "STORE_EMPLOYEE",
  UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE",
  DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
};

const getProfileActionProfile = (user: any) => {
  return {
    type: ActionType.GET_PROFILE,
    payload: {
      user,
    },
  };
};

const asyncGetProfile = () => {
  return async (dispatch: Dispatch) => {
    try {
      const getId: any = localStorage.getItem("id");
      const response = await AuthenticationAPI.profile(getId);
      dispatch(getProfileActionProfile(response?.data));
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export { ActionType, getProfileActionProfile, asyncGetProfile };
