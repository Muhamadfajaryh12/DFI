import axios from "axios";

const CategoryAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/categories";

  const getCategory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      const {
        data: { data },
      } = response;
      console.log(response);
      return { data };
    } catch (error) {
      return error;
    }
  };

  const storeCategory = async (name: string) => {
    try {
      const response = await axios.post(`${BASE_URL}`, { name });
      const {
        data: { message, status, data },
      } = response;
      return { message, status, data };
    } catch (error: any) {
      const {
        data: { status, message },
      } = error.response;
      return { status, message };
    }
  };

  const updateCategory = async ({ id, name }: { id: number; name: string }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, { name });
      const {
        data: { message, status, data },
      } = response;
      return { message, status, data };
    } catch (error: any) {
      const {
        data: { status, message },
      } = error.response;
      return { status, message };
    }
  };

  const destroyCategory = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      const {
        data: { message, status, data },
      } = response;
      return { message, status, data };
    } catch (error: any) {
      const {
        data: { status, message },
      } = error.response;
      return { status, message };
    }
  };

  return {
    getCategory,
    storeCategory,
    updateCategory,
    destroyCategory,
  };
})();
export default CategoryAPI;
