import { ActionType } from "./action";

const initialState: any = {
  employee: [],
};

const EmployeeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_EMPLOYEE:
      return {
        ...state,
        employee: action.payload?.employee,
      };
    case ActionType.STORE_EMPLOYEE:
      return {
        ...state,
        employee: [...state.employee, action.payload?.employee.data],
      };
    case ActionType.UPDATE_EMPLOYEE: {
      const employeeUpdate = action.payload?.employee.data;
      const updateIndex: any = state.employee.findIndex(
        (item: any) => item.id === employeeUpdate?.id
      );

      if (updateIndex !== -1) {
        const stateEmployee: any = [...state.employee];
        stateEmployee[updateIndex] = employeeUpdate;
        return {
          ...state,
          employee: stateEmployee,
        };
      } else {
        return state;
      }
    }
    case ActionType.DELETE_EMPLOYEE:
      return {
        ...state,
        employee: [
          ...state.employee.filter(
            (item: any) => item.id !== action.payload?.employee.data
          ),
        ],
      };
    default:
      return state;
  }
};

export default EmployeeReducer;
