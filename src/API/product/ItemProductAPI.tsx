import axios from "axios";
import { InputItemProductProps } from "../../types/product/ItemProductType";

const ItemProductAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/products/item";

  const getItemProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      const {
        data: { data, status, message },
      } = response;
      console.log(response);
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const detailItemProduct = async (id: number) => {
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

  const storeItemProduct = async ({
    item_name,
    item_value,
    category_id,
  }: InputItemProductProps) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        item_name,
        item_value,
        category_id,
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

  const updateItemProduct = async ({
    id,
    item_name,
    item_value,
    category_id,
  }: InputItemProductProps) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        item_name,
        item_value,
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

  const deleteItemProduct = async (id: number) => {
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
    getItemProduct,
    detailItemProduct,
    storeItemProduct,
    updateItemProduct,
    deleteItemProduct,
  };
})();

export default ItemProductAPI;
