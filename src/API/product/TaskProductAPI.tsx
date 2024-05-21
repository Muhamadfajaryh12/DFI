import axios from "axios";
import { InputTaskProductProps } from "../../types/product/TaskProductType";

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
  }: InputTaskProductProps) => {
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
  }: InputTaskProductProps) => {
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