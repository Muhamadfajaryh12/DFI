import axios from "axios";
import { InputPatrolLocationProps } from "../../types/location/PatrolLocationType";

const PatrolLocationAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/locations/patrol";

  const getPatrolLocation = async () => {
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

  const detailPatrolLocation = async (id: number) => {
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

  const storePatrolLocation = async ({
    patrol_type,
    patrol_value,
    remark,
    patrol_status,
    id_master_location,
    id_item_location,
    id_user,
  }: InputPatrolLocationProps) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        patrol_type,
        patrol_value,
        remark,
        patrol_status,
        id_master_location,
        id_item_location,
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

  const updatePatrolLocation = async ({
    id,
    patrol_type,
    patrol_value,
    remark,
    patrol_status,
    id_master_location,
    id_item_location,
    id_user,
  }: InputPatrolLocationProps) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {
        patrol_type,
        patrol_value,
        remark,
        patrol_status,
        id_master_location,
        id_item_location,
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

  const deletePatrolLocation = async (id: number) => {
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
    getPatrolLocation,
    detailPatrolLocation,
    storePatrolLocation,
    updatePatrolLocation,
    deletePatrolLocation,
  };
})();

export default PatrolLocationAPI;
