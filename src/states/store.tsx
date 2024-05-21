import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./authentication/reducer";
import UserReducer from "./users/reducer";
import CategoryReducer from "./category/reducer";
import EmployeeReducer from "./employee/reducer";
import PreloadReducer from "./preload/reducer";
import MasterProductReducer from "./product/master/reducer";
import MasterLocationReducer from "./location/master/reducer";
import ItemLocationReducer from "./location/item/reducer";
import TaskLocationReducer from "./location/task/reducer";
import PatrolLocationReducer from "./location/patrol/reducer";
import ItemProductReducer from "./product/item/reducer";
import TaskProductReducer from "./product/task/reducer";
import PatrolProductReducer from "./product/patrol/reducer";

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
    item_product: ItemProductReducer,
    task_location: TaskLocationReducer,
    task_product: TaskProductReducer,
    patrol_location: PatrolLocationReducer,
    patrol_product: PatrolProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
