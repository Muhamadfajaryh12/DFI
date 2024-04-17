import { Dispatch } from "redux";
import CategoryAPI from "../../API/CategoryAPI";

interface Categorys {
  message: string;
  data: {
    id: number;
    name: string;
    slug: string;
  }[];
}

interface Category {
  message: string;
  status: boolean;
  data: {
    id: number;
    name: string;
    slug: string;
  };
}

const ActionType = {
  GET_CATEGORY: "GET_CATEGORY",
  STORE_CATEGORY: "STORE_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
};

const getCategoryActionCreator = (categorys: Categorys) => {
  return {
    type: ActionType.GET_CATEGORY,
    payload: {
      categorys,
    },
  };
};

const storeCategoryActionCreator = (category: Category) => {
  return {
    type: ActionType.STORE_CATEGORY,
    payload: {
      category,
    },
  };
};

const updateCategoryActionCreator = (category: Category) => {
  return {
    type: ActionType.UPDATE_CATEGORY,
    payload: {
      category,
    },
  };
};

const deleteCategoryActionCreator = (category: Category) => {
  return {
    type: ActionType.DELETE_CATEGORY,
    payload: {
      category,
    },
  };
};

const asyncGetCategory = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response: any = await CategoryAPI.getCategory();
      dispatch(getCategoryActionCreator(response));
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStoreCategory = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response: any = await CategoryAPI.storeCategory(name);
      console.log(response);
      dispatch(storeCategoryActionCreator(response));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateCategory = ({ id, name }: { id: number; name: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      const response: any = await CategoryAPI.updateCategory({ id, name });
      dispatch(updateCategoryActionCreator(response));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeleteCategory = (id: any) => {
  return async (dispacth: Dispatch) => {
    try {
      const response: any = await CategoryAPI.destroyCategory(id);
      dispacth(deleteCategoryActionCreator(response));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetCategory,
  asyncStoreCategory,
  asyncUpdateCategory,
  asyncDeleteCategory,
};
