import { ActionType } from "./action";

const initialState: any = {
  patrol_location: [],
};

const PatrolLocationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_PATROL_LOCATION:
      return {
        ...state,
        patrol_location: action.payload?.patrol_location,
      };
    case ActionType.STORE_PATROL_LOCATION:
      return {
        ...state,
        patrol_location: [
          ...state.patrol_location,
          action.payload?.patroled_location,
        ],
      };
    case ActionType.UPDATE_PATROL_LOCATION: {
      const patrolLocationUpdate = action.payload?.patroled_location;
      const updateIndex: any = state.patrol_location.findIndex(
        (item: any) => item.id === patrolLocationUpdate?.id
      );

      if (updateIndex !== -1) {
        const statePatrolLocation: any = [...state.patrol_location];
        statePatrolLocation[updateIndex] = patrolLocationUpdate;
        return {
          ...state,
          patrol_location: statePatrolLocation,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_PATROL_LOCATION:
      return {
        ...state,
        patrol_location: [
          ...state.patrol_location.filter(
            (item: any) => item.id !== action.payload?.patroled_location.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default PatrolLocationReducer;
``;
