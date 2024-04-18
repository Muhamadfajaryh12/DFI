import { Dispatch } from "redux";
import MasterLocationAPI, {
  InputMasterLocationProps,
} from "../../../API/location/MasterLocationAPI";

const ActionType = {
  GET_MASTER_LOCATION: "GET_MASTER_LOCATION",
  DETAIL_MASTER_LOCATION: "DETAIL_MASTER_LOCATION",
  STORE_MASTER_LOCATION: "STORE_MASTER_LOCATION",
  UPDATE_MASTER_LOCATION: "UPDATE_MASTER_LOCATION",
  DELETE_MASTER_LOCATION: "DELETE_MASTER_LOCATION",
};

const setGetMasterLocationActionCreator = (master_location: any) => {
  return {
    type: ActionType.GET_MASTER_LOCATION,
    payload: {
      master_location,
    },
  };
};

const setDetailMasterLocationActionCreator = (master_location: any) => {
  return {
    type: ActionType.DETAIL_MASTER_LOCATION,
    payload: {
      master_location,
    },
  };
};

const setStoreMasterLocationActionCreator = (master_location: any) => {
  return {
    type: ActionType.STORE_MASTER_LOCATION,
    payload: {
      master_location,
    },
  };
};

const setUpdateMasterLocationActionCreator = (master_location: any) => {
  return {
    type: ActionType.UPDATE_MASTER_LOCATION,
    payload: {
      master_location,
    },
  };
};

const setDeleteMasterLocationActionCreator = (master_location: any) => {
  return {
    type: ActionType.DELETE_MASTER_LOCATION,
    payload: {
      master_location,
    },
  };
};

const asyncGetMasterLocation = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterLocationAPI.getMasterLocation();
      dispatch(setGetMasterLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDetailMasterLocation = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterLocationAPI.detailMasterLocation(id);
      dispatch(setDetailMasterLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStoreMasterLocation = ({
  location_name,
  no_referensi,
  check_allow,
}: InputMasterLocationProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterLocationAPI.storeMasterLocation({
        location_name,
        no_referensi,
        check_allow,
      });
      dispatch(setStoreMasterLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateMasterLocation = ({
  id,
  location_name,
  no_referensi,
  check_allow,
}: InputMasterLocationProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterLocationAPI.updateMasterLocation({
        id,
        location_name,
        no_referensi,
        check_allow,
      });
      dispatch(setUpdateMasterLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeleteMasterLocation = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterLocationAPI.deleteMasterLocation(id);
      dispatch(setDeleteMasterLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetMasterLocation,
  asyncDetailMasterLocation,
  asyncStoreMasterLocation,
  asyncUpdateMasterLocation,
  asyncDeleteMasterLocation,
};
