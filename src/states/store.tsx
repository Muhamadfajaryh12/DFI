import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./authentication/reducer";
import UserReducer from "./users/reducer";
import CategoryReducer from "./category/reducer";
import EmployeeReducer from "./employee/reducer";
import PreloadReducer from "./preload/reducer";
import MasterProductReducer from "./product/master/reducer";

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    preload: PreloadReducer,
    user: UserReducer,
    categorys: CategoryReducer,
    employee: EmployeeReducer,
    master_product: MasterProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
