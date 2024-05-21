import { ActionType } from "./action";

const initialState: any = {
  item_product: [],
};

const ItemProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_ITEM_PRODUCT:
      return {
        ...state,
        item_product: action.payload?.item_product,
      };
    case ActionType.STORE_ITEM_PRODUCT:
      return {
        ...state,
        item_product: [...state.item_product, action.payload?.item_producted],
      };
    case ActionType.UPDATE_ITEM_PRODUCT: {
      const itemProductUpdate = action.payload?.item_producted;
      const updateIndex: any = state.item_product.findIndex(
        (item: any) => item.id === itemProductUpdate?.id
      );

      if (updateIndex !== -1) {
        const stateItemProduct: any = [...state.item_product];
        stateItemProduct[updateIndex] = itemProductUpdate;
        return {
          ...state,
          item_product: stateItemProduct,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_ITEM_PRODUCT:
      return {
        ...state,
        item_product: [
          ...state.item_product.filter(
            (item: any) => item.id !== action.payload?.item_producted.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default ItemProductReducer;
