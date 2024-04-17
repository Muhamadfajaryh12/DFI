import axios from "axios";

const ItemLocationAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/locations/item";

  const getItemLocation = async () => {
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

  const detailItemLocation = async (id: number) => {
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

  const storeItemLocation = async ({ item_name }: { item_name: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        item_name,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemLocation = async ({
    id,
    item_name,
  }: {
    id: number;
    item_name: string;
  }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        item_name,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemLocation = async (id: number) => {
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
    getItemLocation,
    detailItemLocation,
    storeItemLocation,
    updateItemLocation,
    deleteItemLocation,
  };
})();

export default ItemLocationAPI;
