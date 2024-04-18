import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./authentication/reducer";
import UserReducer from "./users/reducer";
import CategoryReducer from "./category/reducer";
import EmployeeReducer from "./employee/reducer";

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    user: UserReducer,
    categorys: CategoryReducer,
    employee: EmployeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
