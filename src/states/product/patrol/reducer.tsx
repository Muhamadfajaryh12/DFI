import { ActionType } from "./action";

const initialState: any = {
  patrol_product: [],
};

const PatrolProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_PATROL_PRODUCT:
      return {
        ...state,
        patrol_product: action.payload?.patrol_product,
      };
    case ActionType.STORE_PATROL_PRODUCT:
      return {
        ...state,
        patrol_product: [
          ...state.patrol_product,
          action.payload?.item_producted,
        ],
      };
    case ActionType.UPDATE_PATROL_PRODUCT: {
      const patrolProductUpdate = action.payload?.item_producted;
      const updateIndex: any = state.patrol_product.findIndex(
        (item: any) => item.id === patrolProductUpdate?.id
      );

      if (updateIndex !== -1) {
        const statePatrolProduct: any = [...state.patrol_product];
        statePatrolProduct[updateIndex] = patrolProductUpdate;
        return {
          ...state,
          patrol_product: statePatrolProduct,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_PATROL_PRODUCT:
      return {
        ...state,
        patrol_product: [
          ...state.patrol_product.filter(
            (item: any) => item.id !== action.payload?.item_producted.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default PatrolProductReducer;
