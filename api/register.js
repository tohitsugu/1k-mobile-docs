import axios from "./axiosConfig";

export const putUserCreate = (data) => {
  return axios.put("/user/create", data);
};
