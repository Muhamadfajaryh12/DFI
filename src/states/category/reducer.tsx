import { ActionType } from "./action";

interface CategoryReducerProps {
  type: string;
  payload?: {
    categorys: {
      message: string;
      data: {
        name: string;
        slug: string;
      }[];
    };
    category: {
      message: string;
      status: boolean;
      data: {
        id: number;
        name: string;
        slug: string;
      };
    };
  };
}
const initialState: any = {
  categorys: [],
};

const CategoryReducer = (
  state = initialState,
  action: CategoryReducerProps
) => {
  switch (action.type) {
    case ActionType.GET_CATEGORY:
      return {
        ...state,
        categorys: action.payload?.categorys.data,
      };
    case ActionType.STORE_CATEGORY:
      return {
        ...state,
        categorys: [...state.categorys, action.payload?.category.data],
      };
    case ActionType.UPDATE_CATEGORY: {
      const categoryUpdate = action.payload?.category.data;
      const updateIndex: any = state.categorys.findIndex(
        (item: any) => item.id === categoryUpdate?.id
      );
      if (updateIndex !== -1) {
        const updateCategorys: any = [...state.categorys];
        updateCategorys[updateIndex] = categoryUpdate;
        return {
          ...state,
          categorys: updateCategorys,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_CATEGORY:
      return {
        ...state,
        categorys: [
          ...state.categorys.filter(
            (item: any) => item.id !== action.payload?.category.data.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default CategoryReducer;
