import { ActionType } from "./action";
interface PreloadProps {
  type: string;
  payload?: {
    preload: boolean;
  };
}
const initialState: boolean = true;
const PreloadReducer = (
  state: boolean = initialState,
  action: PreloadProps
) => {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload?.preload;
    default:
      return state;
  }
};
export default PreloadReducer;
