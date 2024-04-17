import axios from "axios";

const TaskLocationAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/locations/task";

  const getTaskLocation = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      const {
        data: { data, status, message },
      } = response;

      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const detailTaskLocation = async (id: number) => {
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

  const storeTaskLocation = async ({
    task_type,
    std_value,
    remark,
    id_master_location,
    id_item_location,
  }: {
    task_type: string;
    std_value: string;
    remark: string;
    id_master_location: number;
    id_item_location: number;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        task_type,
        std_value,
        remark,
        id_master_location,
        id_item_location,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskLocation = async ({
    id,
    task_type,
    std_value,
    remark,
    id_master_location,
    id_item_location,
  }: {
    id: number;
    task_type: string;
    std_value: string;
    remark: string;
    id_master_location: number;
    id_item_location: number;
  }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        task_type,
        std_value,
        remark,
        id_master_location,
        id_item_location,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskLocation = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getTaskLocation,
    detailTaskLocation,
    storeTaskLocation,
    updateTaskLocation,
    deleteTaskLocation,
  };
})();

export default TaskLocationAPI;
