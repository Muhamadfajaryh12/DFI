import axios from "axios";

const TaskProductAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/products/task";

  const getTaskProduct = async () => {
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

  const detailTaskProduct = async (id: number) => {
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

  const storeTaskProduct = async ({
    task_type,
    std_value,
    remark,
    min_spec,
    max_spec,
    id_master_product,
    id_item_product,
  }: {
    task_type: string;
    std_value: string | number;
    remark: string;
    min_spec: string;
    max_spec: string;
    id_master_product: number;
    id_item_product: number;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        task_type,
        std_value,
        remark,
        min_spec,
        max_spec,
        id_master_product,
        id_item_product,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskProduct = async ({
    id,
    task_type,
    std_value,
    remark,
    min_spec,
    max_spec,
    id_master_product,
    id_item_product,
  }: {
    id: number;
    task_type: string;
    std_value: string | number;
    remark: string;
    min_spec: string;
    max_spec: string;
    id_master_product: number;
    id_item_product: number;
  }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        id,
        task_type,
        std_value,
        remark,
        min_spec,
        max_spec,
        id_master_product,
        id_item_product,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskProduct = async (id: number) => {
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
    getTaskProduct,
    detailTaskProduct,
    storeTaskProduct,
    updateTaskProduct,
    deleteTaskProduct,
  };
})();

export default TaskProductAPI;
