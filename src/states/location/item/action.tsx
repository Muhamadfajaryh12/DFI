import { Dispatch } from "redux";
import ItemLocationAPI from "../../../API/location/ItemLocationAPI";

const ActionType = {
  GET_ITEM_LOCATION: "GET_ITEM_LOCATION",
  DETAIL_ITEM_LOCATION: "DETAIL_ITEM_LOCATION",
  STORE_ITEM_LOCATION: "STORE_ITEM_LOCATION",
  UPDATE_ITEM_LOCATION: "UPDATE_ITEM_LOCATION",
  DELETE_ITEM_LOCATION: "DELETE_ITEM_LOCATION",
};

const setGetItemLocationActionCreator = (item_location: any) => {
  return {
    type: ActionType.GET_ITEM_LOCATION,
    payload: {
      item_location,
    },
  };
};

const setDetailItemLocationActionCreator = (itemed_location: any) => {
  return {
    type: ActionType.DETAIL_ITEM_LOCATION,
    payload: {
      itemed_location,
    },
  };
};

const setStoreItemLocationActionCreator = (itemed_location: any) => {
  return {
    type: ActionType.STORE_ITEM_LOCATION,
    payload: {
      itemed_location,
    },
  };
};

const setUpdateItemLocationActionCreator = (itemed_location: any) => {
  return {
    type: ActionType.UPDATE_ITEM_LOCATION,
    payload: {
      itemed_location,
    },
  };
};

const setDeleteItemLocationActionCreator = (itemed_location: any) => {
  return {
    type: ActionType.DELETE_ITEM_LOCATION,
    payload: {
      itemed_location,
    },
  };
};

const asyncGetItemLocation = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemLocationAPI.getItemLocation();
      dispatch(setGetItemLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDetailItemLocation = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemLocationAPI.detailItemLocation(id);
      dispatch(setDetailItemLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStoreItemLocation = ({ item_name }: { item_name: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemLocationAPI.storeItemLocation({
        item_name,
      });
      dispatch(setStoreItemLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateItemLocation = ({
  id,
  item_name,
}: {
  id: number;
  item_name: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemLocationAPI.updateItemLocation({
        id,
        item_name,
      });
      dispatch(setUpdateItemLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeleteItemLocation = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ItemLocationAPI.deleteItemLocation(id);
      dispatch(setDeleteItemLocationActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetItemLocation,
  asyncDetailItemLocation,
  asyncStoreItemLocation,
  asyncUpdateItemLocation,
  asyncDeleteItemLocation,
};
