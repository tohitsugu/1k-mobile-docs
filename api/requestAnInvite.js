import axios from "./axiosConfig";

export const verifyUserEmail = (data) => {
  return axios.post("/user/find", data);
};

export const requestInvite = (data) => {
  return axios.post("/user/request/invite", data);
};
