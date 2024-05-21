import { Dispatch } from "redux";
import TaskLocationAPI from "../../../API/location/TaskLocationAPI";
import { InputTaskLocationProps } from "../../../types/location/TaskLocationType";

const ActionType = {
  GET_TASK_LOCATION: "GET_TASK_LOCATION",
  DETAIL_TASK_LOCATION: "DETAIL_TASK_LOCATION",
  STORE_TASK_LOCATION: "STORE_TASK_LOCATION",
  UPDATE_TASK_LOCATION: "UPDATE_TASK_LOCATION",
  DELETE_TASK_LOCATION: "DELETE_TASK_LOCATION",
};

const setGetTaskLocationActionCreator = (task_location: any) => {
  return {
    type: ActionType.GET_TASK_LOCATION,
    payload: {
      task_location,
    },
  };
};

const setDetailTaskLocationActionCreator = (task_location: any) => {
  return {
    type: ActionType.DETAIL_TASK_LOCATION,
    payload: {
      task_location,
    },
  };
};

const setStoreTaskLocationActionCreator = (tasked_location: any) => {
  return {
    type: ActionType.STORE_TASK_LOCATION,
    payload: {
      tasked_location,
    },
  };
};

const setUpdateTaskLocationActionCreator = (task_location: any) => {
  return {
    type: ActionType.UPDATE_TASK_LOCATION,
    payload: {
      task_location,
    },
  };
};

const setDeleteTaskLocationActionCreator = (tasked_location: any) => {
  return {
    type: ActionType.DELETE_TASK_LOCATION,
    payload: {
      tasked_location,
    },
  };
};

const asyncGetTaskLocation = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskLocationAPI.getTaskLocation();
      console.log(response);
      dispatch(setGetTaskLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDetailTaskLocation = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskLocationAPI.detailTaskLocation(id);
      dispatch(setDetailTaskLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStoreTaskLocation = ({
  task_type,
  std_value,
  remark,
  id_master_location,
  id_item_location,
}: InputTaskLocationProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskLocationAPI.storeTaskLocation({
        task_type,
        std_value,
        remark,
        id_master_location,
        id_item_location,
      });
      dispatch(setStoreTaskLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateTaskLocation = ({
  id,
  task_type,
  std_value,
  remark,
  id_master_location,
  id_item_location,
}: InputTaskLocationProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskLocationAPI.updateTaskLocation({
        id,
        task_type,
        std_value,
        remark,
        id_master_location,
        id_item_location,
      });
      dispatch(setUpdateTaskLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeleteTaskLocation = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskLocationAPI.deleteTaskLocation(id);
      dispatch(setDeleteTaskLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetTaskLocation,
  asyncDetailTaskLocation,
  asyncStoreTaskLocation,
  asyncUpdateTaskLocation,
  asyncDeleteTaskLocation,
};
