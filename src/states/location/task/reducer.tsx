import { ActionType } from "./action";

const initialState: any = {
  task_location: [],
};

const TaskLocationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_TASK_LOCATION:
      return {
        ...state,
        task_location: action.payload?.task_location,
      };
    case ActionType.STORE_TASK_LOCATION:
      return {
        ...state,
        task_location: [
          ...state.task_location,
          action.payload?.tasked_location,
        ],
      };
    case ActionType.UPDATE_TASK_LOCATION: {
      const taskLocationUpdate = action.payload?.tasked_location;
      const updateIndex: any = state.task_location.findIndex(
        (item: any) => item.id === taskLocationUpdate?.id
      );

      if (updateIndex !== -1) {
        const stateTaskLocation: any = [...state.task_location];
        stateTaskLocation[updateIndex] = taskLocationUpdate;
        return {
          ...state,
          task_location: stateTaskLocation,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_TASK_LOCATION:
      return {
        ...state,
        task_location: [
          ...state.task_location.filter(
            (item: any) => item.id !== action.payload?.tasked_location.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default TaskLocationReducer;
``;
