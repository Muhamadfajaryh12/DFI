import { Dispatch } from "redux";
import AuthenticationAPI from "../../API/AuthenticationAPI";

const ActionType = {
  GET_PROFILE: "GET_PROFILE",
  UPDATE_PROFILE: "",
};

const getProfileActionProfile = (user: any) => {
  return {
    type: ActionType.GET_PROFILE,
    payload: {
      user,
    },
  };
};

const setUpdateProfileActionCreator = (user: any) => {
  return {
    type: ActionType.UPDATE_PROFILE,
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
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

const asyncUpdateProfile = ({
  id,
  name,
  no_telp,
  jenis_kelamin,
  kota,
}: {
  id: number;
  name: string;
  no_telp: number;
  jenis_kelamin: string;
  kota: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthenticationAPI.changeProfile({
        id,
        name,
        no_telp,
        jenis_kelamin,
        kota,
      });
      dispatch(setUpdateProfileActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};
export {
  ActionType,
  getProfileActionProfile,
  asyncGetProfile,
  asyncUpdateProfile,
};
