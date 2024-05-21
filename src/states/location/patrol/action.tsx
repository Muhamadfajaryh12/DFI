import { Dispatch } from "redux";
import PatrolLocationAPI from "../../../API/location/PatrolLocationAPI";
import { InputPatrolLocationProps } from "../../../types/location/PatrolLocationType";

const ActionType = {
  GET_PATROL_LOCATION: "GET_PATROL_LOCATION",
  DETAIL_PATROL_LOCATION: "DETAIL_PATROL_LOCATION",
  STORE_PATROL_LOCATION: "STORE_PATROL_LOCATION",
  UPDATE_PATROL_LOCATION: "UPDATE_PATROL_LOCATION",
  DELETE_PATROL_LOCATION: "DELETE_PATROL_LOCATION",
};

const setGetPatrolLocationActionCreator = (patrol_location: any) => {
  return {
    type: ActionType.GET_PATROL_LOCATION,
    payload: {
      patrol_location,
    },
  };
};

const setDetailPatrolLocationActionCreator = (patroled_location: any) => {
  return {
    type: ActionType.DETAIL_PATROL_LOCATION,
    payload: {
      patroled_location,
    },
  };
};

const setStorePatrolLocationActionCreator = (patroled_location: any) => {
  return {
    type: ActionType.STORE_PATROL_LOCATION,
    payload: {
      patroled_location,
    },
  };
};

const setUpdatePatrolLocationActionCreator = (patroled_location: any) => {
  return {
    type: ActionType.UPDATE_PATROL_LOCATION,
    payload: {
      patroled_location,
    },
  };
};

const setDeletePatrolLocationActionCreator = (patroled_location: any) => {
  return {
    type: ActionType.DELETE_PATROL_LOCATION,
    payload: {
      patroled_location,
    },
  };
};

const asyncGetPatrolLocation = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolLocationAPI.getPatrolLocation();
      dispatch(setGetPatrolLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDetailPatrolLocation = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolLocationAPI.detailPatrolLocation(id);
      dispatch(setDetailPatrolLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStorePatrolLocation = ({
  patrol_type,
  patrol_value,
  patrol_status,
  remark,
  id_master_location,
  id_item_location,
  id_user,
}: InputPatrolLocationProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolLocationAPI.storePatrolLocation({
        patrol_type,
        patrol_value,
        patrol_status,
        remark,
        id_master_location,
        id_item_location,
        id_user,
      });
      dispatch(setStorePatrolLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdatePatrolLocation = ({
  id,
  patrol_type,
  patrol_value,
  patrol_status,
  remark,
  id_master_location,
  id_item_location,
  id_user,
}: InputPatrolLocationProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolLocationAPI.updatePatrolLocation({
        id,
        patrol_type,
        patrol_value,
        patrol_status,
        remark,
        id_master_location,
        id_item_location,
        id_user,
      });
      dispatch(setUpdatePatrolLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeletePatrolLocation = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolLocationAPI.deletePatrolLocation(id);
      dispatch(setDeletePatrolLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetPatrolLocation,
  asyncDetailPatrolLocation,
  asyncStorePatrolLocation,
  asyncUpdatePatrolLocation,
  asyncDeletePatrolLocation,
};
