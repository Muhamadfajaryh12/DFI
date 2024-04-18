import { Dispatch } from "redux";
import PatrolProductAPI, {
  InputPatrolProductProps,
} from "../../../API/product/PatrolProductAPI";

const ActionType = {
  GET_PATROL_PRODUCT: "GET_PATROL_PRODUCT",
  DETAIL_PATROL_PRODUCT: "DETAIL_PATROL_PRODUCT",
  STORE_PATROL_PRODUCT: "STORE_PATROL_PRODUCT",
  UPDATE_PATROL_PRODUCT: "UPDATE_PATROL_PRODUCT",
  DELETE_PATROL_PRODUCT: "DELETE_PATROL_PRODUCT",
};

const setGetPatrolProductActionCreator = (patrol_product: any) => {
  return {
    type: ActionType.GET_PATROL_PRODUCT,
    payload: {
      patrol_product,
    },
  };
};

const setDetailPatrolProductActionCreator = (patrol_product: any) => {
  return {
    type: ActionType.DETAIL_PATROL_PRODUCT,
    payload: {
      patrol_product,
    },
  };
};

const setStorePatrolProductActionCreator = (patrol_product: any) => {
  return {
    type: ActionType.STORE_PATROL_PRODUCT,
    payload: {
      patrol_product,
    },
  };
};

const setUpdatePatrolProductActionCreator = (patrol_product: any) => {
  return {
    type: ActionType.UPDATE_PATROL_PRODUCT,
    payload: {
      patrol_product,
    },
  };
};

const setDeletePatrolProductActionCreator = (patrol_product: any) => {
  return {
    type: ActionType.DELETE_PATROL_PRODUCT,
    payload: {
      patrol_product,
    },
  };
};

const asyncGetPatrolProduct = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolProductAPI.getPatrolProduct();
      dispatch(setGetPatrolProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDetailPatrolProduct = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolProductAPI.detailPatrolProduct(id);
      dispatch(setDetailPatrolProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStorePatrolProduct = ({
  patrol_type,
  patrol_value,
  id_master_product,
  id_item_product,
  id_user,
}: InputPatrolProductProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolProductAPI.storePatrolProduct({
        patrol_type,
        patrol_value,
        id_master_product,
        id_item_product,
        id_user,
      });
      dispatch(setStorePatrolProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdatePatrolProduct = ({
  id,
  patrol_type,
  patrol_value,
  id_master_product,
  id_item_product,
  id_user,
}: InputPatrolProductProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolProductAPI.updatePatrolProduct({
        id,
        patrol_type,
        patrol_value,
        id_master_product,
        id_item_product,
        id_user,
      });
      dispatch(setUpdatePatrolProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeletePatrolProduct = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await PatrolProductAPI.deletePatrolProduct(id);
      dispatch(setDeletePatrolProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetPatrolProduct,
  asyncDetailPatrolProduct,
  asyncStorePatrolProduct,
  asyncUpdatePatrolProduct,
  asyncDeletePatrolProduct,
};
