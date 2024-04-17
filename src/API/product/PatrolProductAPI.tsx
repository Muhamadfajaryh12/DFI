import axios from "axios";

const PatrolProductAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/products/patrol";

  const getPatrolProduct = async () => {
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
    id_master_product,
    id_item_product,
    id_user,
  }: {
    patrol_type: string;
    patrol_value: number | string;
    id_master_product: number;
    id_item_product: number;
    id_user: number;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        patrol_type,
        patrol_value,
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

  const updatePatrolProduct = async ({
    id,
    patrol_type,
    patrol_value,
    id_master_product,
    id_item_product,
    id_user,
  }: {
    id: number;
    patrol_type: string;
    patrol_value: number | string;
    id_master_product: number;
    id_item_product: number;
    id_user: number;
  }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        patrol_type,
        patrol_value,
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
