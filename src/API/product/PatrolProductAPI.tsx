import axios from "axios";
import { InputPatrolProductProps } from "../../types/product/PatrolProductType";

const PatrolProductAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/products/patrol/all";

  const getPatrolProduct = async () => {
    try {
      const response = await axios.post(`${BASE_URL}`, null);
      const {
        data: { data, status, message },
      } = response;

      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const detailPatrolProduct = async (id: number) => {
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

  const storePatrolProduct = async ({
    patrol_type,
    patrol_value,
    patrol_status,
    remark,
    id_master_product,
    id_item_product,
    id_user,
  }: InputPatrolProductProps) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        patrol_type,
        patrol_value,
        patrol_status,
        remark,
        id_master_product,
        id_item_product,
        id_user,
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

  const updatePatrolProduct = async ({
    id,
    patrol_type,
    patrol_value,
    patrol_status,
    remark,
    id_master_product,
    id_item_product,
    id_user,
  }: InputPatrolProductProps) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        patrol_type,
        patrol_value,
        patrol_status,
        remark,
        id_master_product,
        id_item_product,
        id_user,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const deletePatrolProduct = async (id: number) => {
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
    getPatrolProduct,
    detailPatrolProduct,
    storePatrolProduct,
    updatePatrolProduct,
    deletePatrolProduct,
  };
})();

export default PatrolProductAPI;
