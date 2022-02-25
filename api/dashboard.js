import axios from "./axiosConfig";

export const getUserApiKey = () => {
  return axios.get("/user/api_key");
};
