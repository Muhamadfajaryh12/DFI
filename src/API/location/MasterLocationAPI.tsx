import axios from "axios";

export interface InputMasterLocationProps {
  id?: number;
  location_name: string;
  no_referensi: number;
  check_allow: string;
}

const MasterLocationAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/locations/master";

  const getMasterLocation = async () => {
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

  const detailMasterLocation = async (id: number) => {
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

  const storeMasterLocation = async ({
    location_name,
    no_referensi,
    check_allow,
  }: InputMasterLocationProps) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        location_name,
        no_referensi,
        check_allow,
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

  const updateMasterLocation = async ({
    id,
    location_name,
    no_referensi,
    check_allow,
  }: InputMasterLocationProps) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        location_name,
        no_referensi,
        check_allow,
      });
      const {
        data: { data, status, message },
      } = response;
      return { data, status, message };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMasterLocation = async (id: number) => {
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
    getMasterLocation,
    detailMasterLocation,
    storeMasterLocation,
    updateMasterLocation,
    deleteMasterLocation,
  };
})();

export default MasterLocationAPI;
