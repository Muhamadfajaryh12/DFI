import { Dispatch } from "redux";
import ItemProductAPI, {
  InputItemProductProps,
} from "../../../API/product/ItemProductAPI";

const ActionType = {
  GET_ITEM_PRODUCT: "GET_ITEM_PRODUCT",
  DETAIL_ITEM_PRODUCT: "DETAIL_ITEM_PRODUCT",
  STORE_ITEM_PRODUCT: "STORE_ITEM_PRODUCT",
  UPDATE_ITEM_PRODUCT: "UPDATE_ITEM_PRODUCT",
  DELETE_ITEM_PRODUCT: "DELETE_ITEM_PRODUCT",
};

const setGetItemProductActionCreator = (item_product: any) => {
  return {
    type: ActionType.GET_ITEM_PRODUCT,
    payload: {
      item_product,
    },
  };
};

const setDetailItemProductActionCreator = (item_product: any) => {
  return {
    type: ActionType.DETAIL_ITEM_PRODUCT,
    payload: {
      item_product,
    },
  };
};

const setStoreItemProductActionCreator = (item_product: any) => {
  return {
    type: ActionType.STORE_ITEM_PRODUCT,
    payload: {
      item_product,
    },
  };
};

const setUpdateItemProductActionCreator = (item_product: any) => {
  return {
    type: ActionType.UPDATE_ITEM_PRODUCT,
    payload: {
      item_product,
    },
  };
};

const setDeleteItemProductActionCreator = (item_product: any) => {
  return {
    type: ActionType.DELETE_ITEM_PRODUCT,
    payload: {
      item_product,
    },
  };
};

const asyncGetItemProduct = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemProductAPI.getItemProduct();
      dispatch(setGetItemProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDetailItemProduct = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemProductAPI.detailItemProduct(id);
      dispatch(setDetailItemProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStoreItemProduct = ({
  item_name,
  item_value,
  remark,
  category_id,
}: InputItemProductProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemProductAPI.storeItemProduct({
        item_name,
        item_value,
        remark,
        category_id,
      });
      dispatch(setStoreItemProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateItemProduct = ({
  id,
  item_name,
  item_value,
  remark,
  category_id,
}: InputItemProductProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemProductAPI.updateItemProduct({
        id,
        item_name,
        item_value,
        remark,
        category_id,
      });
      dispatch(setUpdateItemProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeleteItemProduct = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemProductAPI.deleteItemProduct(id);
      dispatch(setDeleteItemProductActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetItemProduct,
  asyncDetailItemProduct,
  asyncStoreItemProduct,
  asyncUpdateItemProduct,
  asyncDeleteItemProduct,
};
