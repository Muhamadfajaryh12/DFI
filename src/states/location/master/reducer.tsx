import { ActionType } from "./action";

const initialState: any = {
  master_location: [],
};

const MasterLocationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_MASTER_LOCATION:
      return {
        ...state,
        master_location: action.payload?.master_location,
      };
    case ActionType.STORE_MASTER_LOCATION:
      return {
        ...state,
        master_location: [
          ...state.master_location,
          action.payload?.mastered_location,
        ],
      };
    case ActionType.UPDATE_MASTER_LOCATION: {
      const masterLocationUpdate = action.payload?.mastered_location;
      const updateIndex: any = state.master_location.findIndex(
        (item: any) => item.id === masterLocationUpdate?.id
      );

      if (updateIndex !== -1) {
        const stateMasterLocation: any = [...state.master_location];
        stateMasterLocation[updateIndex] = masterLocationUpdate;
        return {
          ...state,
          master_location: stateMasterLocation,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_MASTER_LOCATION:
      return {
        ...state,
        master_location: [
          ...state.master_location.filter(
            (item: any) => item.id !== action.payload?.mastered_location.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default MasterLocationReducer;
