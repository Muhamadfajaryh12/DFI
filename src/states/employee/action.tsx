import { Dispatch } from "redux";
import EmployeeAPI from "../../API/EmployeeAPI";

const ActionType = {
  GET_EMPLOYEE: "GET_EMPLOYEE",
  DETAIL_EMPLOYEE: "DETAIL_EMPLOYEE",
  STORE_EMPLOYEE: "STORE_EMPLOYEE",
  UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE",
  DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
};

const setEmployeeActionCreator = (users: any) => {
  return {
    type: ActionType.GET_EMPLOYEE,
    payload: {
      users,
    },
  };
};

const setDetailEmployeeActionCreator = (user: any) => {
  return {
    type: ActionType.DETAIL_EMPLOYEE,
    payload: {
      user,
    },
  };
};

const setStoreEmployeeActionCreator = (user: any) => {
  return {
    type: ActionType.STORE_EMPLOYEE,
    payload: {
      user,
    },
  };
};

const setUpdateEmployeeActionCreator = (user: any) => {
  return {
    type: ActionType.UPDATE_EMPLOYEE,
    payload: {
      user,
    },
  };
};

const setDeleteEmployeeActionCreator = (user: any) => {
  return {
    type: ActionType.DELETE_EMPLOYEE,
    payload: {
      user,
    },
  };
};

const asyncGetEmployee = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await EmployeeAPI.getEmployee();
      dispatch(setEmployeeActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDetailEmployee = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await EmployeeAPI.detailEmployee(id);
      dispatch(setDetailEmployeeActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncStoreEmployee = ({
  name,
  username,
  password,
  role,
  no_telp,
  jenis_kelamin,
  kota,
}: {
  name: string;
  username: string;
  password: string;
  role: string;
  no_telp: number;
  jenis_kelamin: string;
  kota: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await EmployeeAPI.storeEmployee({
        name,
        username,
        password,
        role,
        no_telp,
        jenis_kelamin,
        kota,
      });
      dispatch(setStoreEmployeeActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateEmployee = ({
  id,
  name,
  username,
  password,
  role,
  no_telp,
  jenis_kelamin,
  kota,
}: {
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;
  no_telp: number;
  jenis_kelamin: string;
  kota: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await EmployeeAPI.updateEmployee({
        id,
        name,
        username,
        password,
        role,
        no_telp,
        jenis_kelamin,
        kota,
      });
      dispatch(setUpdateEmployeeActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeleteEmployee = async (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await EmployeeAPI.deleteEmployee(id);
      dispatch(setDeleteEmployeeActionCreator(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  ActionType,
  asyncGetEmployee,
  asyncDetailEmployee,
  asyncStoreEmployee,
  asyncUpdateEmployee,
  asyncDeleteEmployee,
};
