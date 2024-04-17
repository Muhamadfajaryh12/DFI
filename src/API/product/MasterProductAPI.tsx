import axios from "axios";

const MasterProductAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/products/master";

  const getMasterProduct = async () => {
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

  const detailMasterProduct = async (id: number) => {
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

  const storeMasterProduct = async ({
    product_name,
    barcode,
    category_id,
  }: {
    product_name: string;
    barcode: number;
    category_id: number;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        product_name,
        barcode,
        category_id,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const updateMasterProduct = async ({
    id,
    product_name,
    barcode,
    category_id,
  }: {
    id: number;
    product_name: string;
    barcode: number;
    category_id: number;
  }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        product_name,
        barcode,
        category_id,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMasterProduct = async (id: number) => {
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
    getMasterProduct,
    detailMasterProduct,
    storeMasterProduct,
    updateMasterProduct,
    deleteMasterProduct,
  };
})();

export default MasterProductAPI;