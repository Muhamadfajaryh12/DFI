import { Dispatch } from "redux";
import MasterProductAPI, {
  InputMasterProductProps,
} from "../../../API/product/MasterProductAPI";

const ActionType = {
  GET_MASTER_PRODUCT: "GET_MASTER_PRODUCT",
  DETAIL_MASTER_PRODUCT: "DETAIL_MASTER_PRODUCT",
  STORE_MASTER_PRODUCT: "STORE_MASTER_PRODUCT",
  UPDATE_MASTER_PRODUCT: "UPDATE_MASTER_PRODUCT",
  DELETE_MASTER_PRODUCT: "DELETE_MASTER_PRODUCT",
};

const setGetMasterProductActionCreator = (master_product: any) => {
  return {
    type: ActionType.GET_MASTER_PRODUCT,
    payload: {
      master_product,
    },
  };
};

const setDetailMasterProductActionCreator = (master_product: any) => {
  return {
    type: ActionType.DETAIL_MASTER_PRODUCT,
    payload: {
      master_product,
    },
  };
};

const setStoreMasterProductActionCreator = (mastered_product: any) => {
  return {
    type: ActionType.STORE_MASTER_PRODUCT,
    payload: {
      mastered_product,
    },
  };
};

const setUpdateMasterProductActionCreator = (mastered_product: any) => {
  return {
    type: ActionType.UPDATE_MASTER_PRODUCT,
    payload: {
      mastered_product,
    },
  };
};

const setDeleteMasterProductActionCreator = (mastered_product: any) => {
  return {
    type: ActionType.DELETE_MASTER_PRODUCT,
    payload: {
      mastered_product,
    },
  };
};

const asyncGetMasterProduct = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterProductAPI.getMasterProduct();
      console.log(response);
      dispatch(setGetMasterProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDetailMasterProduct = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterProductAPI.detailMasterProduct(id);
      dispatch(setDetailMasterProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStoreMasterProduct = ({
  product_name,
  barcode,
  category_id,
}: InputMasterProductProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterProductAPI.storeMasterProduct({
        product_name,
        barcode,
        category_id,
      });
      dispatch(setStoreMasterProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateMasterProduct = ({
  id,
  product_name,
  barcode,
  category_id,
}: InputMasterProductProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterProductAPI.updateMasterProduct({
        id,
        product_name,
        barcode,
        category_id,
      });
      dispatch(setUpdateMasterProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeleteMasterProduct = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await MasterProductAPI.deleteMasterProduct(id);
      dispatch(setDeleteMasterProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetMasterProduct,
  asyncDetailMasterProduct,
  asyncStoreMasterProduct,
  asyncUpdateMasterProduct,
  asyncDeleteMasterProduct,
};
