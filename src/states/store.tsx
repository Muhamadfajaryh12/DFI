import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./authentication/reducer";
import UserReducer from "./users/reducer";
import CategoryReducer from "./category/reducer";
import EmployeeReducer from "./employee/reducer";
import PreloadReducer from "./preload/reducer";
import MasterProductReducer from "./product/master/reducer";
import MasterLocationReducer from "./location/master/reducer";
import ItemLocationReducer from "./location/item/reducer";

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    preload: PreloadReducer,
    user: UserReducer,
    categorys: CategoryReducer,
    employee: EmployeeReducer,
    master_product: MasterProductReducer,
    master_location: MasterLocationReducer,
    item_location: ItemLocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
