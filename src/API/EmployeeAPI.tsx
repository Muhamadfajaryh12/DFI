import axios from "axios";

const EmployeeAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/user";

  const getEmployee = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      const {
        data: { data },
      } = response;

      return { data };
    } catch (error) {
      console.log(error);
    }
  };

  const detailEmployee = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const storeEmployee = async ({
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
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        name,
        username,
        password,
        role,
        no_telp,
        jenis_kelamin,
        kota,
      });
      const {
        data: { data, status, message },
      } = response;
      console.log(response);
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployee = async ({
    id,
    name,
    role,
    no_telp,
    jenis_kelamin,
    kota,
  }: {
    id: number;
    name: string;
    role: string;
    no_telp: number;
    jenis_kelamin: string;
    kota: string;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}/update/${id}`, {
        name,
        role,
        no_telp,
        jenis_kelamin,
        kota,
      });
      const {
        data: { data, status, message },
      } = response;
      console.log(response);
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      const {
        data: { data, status, message },
      } = response;
      console.log(response);
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getEmployee,
    detailEmployee,
    storeEmployee,
    updateEmployee,
    deleteEmployee,
  };
})();

export default EmployeeAPI;