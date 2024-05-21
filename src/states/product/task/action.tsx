import { Dispatch } from "redux";
import TaskProductAPI from "../../../API/product/TaskProductAPI";
import { InputTaskProductProps } from "../../../types/product/TaskProductType";

const ActionType = {
  GET_TASK_PRODUCT: "GET_TASK_PRODUCT",
  DETAIL_TASK_PRODUCT: "DETAIL_TASK_PRODUCT",
  STORE_TASK_PRODUCT: "STORE_TASK_PRODUCT",
  UPDATE_TASK_PRODUCT: "UPDATE_TASK_PRODUCT",
  DELETE_TASK_PRODUCT: "DELETE_TASK_PRODUCT",
};

const setGetTaskProductActionCreator = (task_product: any) => {
  return {
    type: ActionType.GET_TASK_PRODUCT,
    payload: {
      task_product,
    },
  };
};

const setDetailTaskProductActionCreator = (task_producted: any) => {
  return {
    type: ActionType.DETAIL_TASK_PRODUCT,
    payload: {
      task_producted,
    },
  };
};

const setStoreTaskProductActionCreator = (task_producted: any) => {
  return {
    type: ActionType.STORE_TASK_PRODUCT,
    payload: {
      task_producted,
    },
  };
};

const setUpdateTaskProductActionCreator = (task_producted: any) => {
  return {
    type: ActionType.UPDATE_TASK_PRODUCT,
    payload: {
      task_producted,
    },
  };
};

const setDeleteTaskProductActionCreator = (task_producted: any) => {
  return {
    type: ActionType.DELETE_TASK_PRODUCT,
    payload: {
      task_producted,
    },
  };
};

const asyncGetTaskProduct = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskProductAPI.getTaskProduct();
      dispatch(setGetTaskProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDetailTaskProduct = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskProductAPI.detailTaskProduct(id);
      dispatch(setDetailTaskProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStoreTaskProduct = ({
  task_type,
  std_value,
  remark,
  min_spec,
  max_spec,
  id_master_product,
  id_item_product,
}: InputTaskProductProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskProductAPI.storeTaskProduct({
        task_type,
        std_value,
        remark,
        min_spec,
        max_spec,
        id_master_product,
        id_item_product,
      });
      dispatch(setStoreTaskProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateTaskProduct = ({
  id,
  task_type,
  std_value,
  remark,
  min_spec,
  max_spec,
  id_master_product,
  id_item_product,
}: InputTaskProductProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskProductAPI.updateTaskProduct({
        id,
        task_type,
        std_value,
        remark,
        min_spec,
        max_spec,
        id_master_product,
        id_item_product,
      });
      dispatch(setUpdateTaskProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeleteTaskProduct = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await TaskProductAPI.deleteTaskProduct(id);
      dispatch(setDeleteTaskProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetTaskProduct,
  asyncDetailTaskProduct,
  asyncStoreTaskProduct,
  asyncUpdateTaskProduct,
  asyncDeleteTaskProduct,
};
