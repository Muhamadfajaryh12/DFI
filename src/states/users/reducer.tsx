import { ActionType } from "./action";

const initialState: any = null;
const UserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_PROFILE:
      return action.payload?.user;
    case ActionType.UPDATE_PROFILE:
      return action.payload?.user;
    default:
      return state;
  }
};

export default UserReducer;
