import axios from "axios";

const AuthenticationAPI = (() => {
  const BASE_URL = "http://127.0.0.1:8000/api/user";

  const setAccessToken = (token: string, id: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("id", id);
  };

  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      if (response.data.status != false) {
        const {
          data: {
            data: {
              token,
              user: { id },
            },
            status,
            message,
          },
        } = response;
        console.log(response);
        return { id, token, status, message };
      }
    } catch (error: any) {
      const {
        data: { status, message },
      } = error.response;
      return { message, status };
    }
  };

  const profile = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `BEARER ${getAccessToken()}`,
        },
      });
      const {
        data: { data },
      } = response;
      console.log(response);
      return { data };
    } catch (error: any) {
      console.log(error);
    }
  };

  const logout = async () => {
    const response = await axios.post(`${BASE_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const {
      data: { message },
    } = response;
    console.log(response);
    return { message };
  };

  return {
    setAccessToken,
    getAccessToken,
    profile,
    login,
    logout,
  };
})();
export default AuthenticationAPI;
