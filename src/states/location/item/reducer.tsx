import { ActionType } from "./action";

const initialState: any = {
  item_location: [],
};

const ItemLocationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_ITEM_LOCATION:
      return {
        ...state,
        item_location: action.payload?.item_location,
      };
    case ActionType.STORE_ITEM_LOCATION:
      return {
        ...state,
        item_location: [
          ...state.item_location,
          action.payload?.itemed_location,
        ],
      };
    case ActionType.UPDATE_ITEM_LOCATION: {
      const itemLocationUpdate = action.payload?.itemed_location;
      const updateIndex: any = state.item_location.findIndex(
        (item: any) => item.id === itemLocationUpdate?.id
      );

      if (updateIndex !== -1) {
        const stateItemLocation: any = [...state.item_location];
        stateItemLocation[updateIndex] = itemLocationUpdate;
        return {
          ...state,
          item_location: stateItemLocation,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_ITEM_LOCATION:
      return {
        ...state,
        item_location: [
          ...state.item_location.filter(
            (item: any) => item.id !== action.payload?.itemed_location.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default ItemLocationReducer;
``;
