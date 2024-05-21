import { ActionType } from "./action";

const initialState: any = {
  task_product: [],
};

const TaskProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_TASK_PRODUCT:
      return {
        ...state,
        task_product: action.payload?.task_product,
      };
    case ActionType.STORE_TASK_PRODUCT:
      return {
        ...state,
        task_product: [...state.task_product, action.payload?.task_producted],
      };
    case ActionType.UPDATE_TASK_PRODUCT: {
      const taskProductUpdate = action.payload?.task_producted;
      const updateIndex: any = state.task_product.findIndex(
        (item: any) => item.id === taskProductUpdate?.id
      );

      if (updateIndex !== -1) {
        const stateTaskProduct: any = [...state.task_product];
        stateTaskProduct[updateIndex] = taskProductUpdate;
        return {
          ...state,
          task_product: stateTaskProduct,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_TASK_PRODUCT:
      return {
        ...state,
        task_product: [
          ...state.task_product.filter(
            (item: any) => item.id !== action.payload?.task_producted.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default TaskProductReducer;
