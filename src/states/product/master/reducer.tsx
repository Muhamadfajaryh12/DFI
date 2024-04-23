import { ActionType } from "./action";

const initialState: any = {
  master_product: [],
};

const MasterProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_MASTER_PRODUCT:
      return {
        ...state,
        master_product: action.payload?.master_product,
      };
    case ActionType.STORE_MASTER_PRODUCT:
      return {
        ...state,
        master_product: [
          ...state.master_product,
          action.payload?.mastered_product,
        ],
      };
    case ActionType.UPDATE_MASTER_PRODUCT: {
      const masterProductUpdate = action.payload?.mastered_product;
      const updateIndex: any = state.master_product.findIndex(
        (item: any) => item.id === masterProductUpdate?.id
      );

      if (updateIndex !== -1) {
        const stateMasterProduct: any = [...state.master_product];
        stateMasterProduct[updateIndex] = masterProductUpdate;
        return {
          ...state,
          master_product: stateMasterProduct,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_MASTER_PRODUCT:
      return {
        ...state,
        master_product: [
          ...state.master_product.filter(
            (item: any) => item.id !== action.payload?.mastered_product.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default MasterProductReducer;
