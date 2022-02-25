import axios from "./axiosConfig";

export const getServerPublicKey = () => {
  return axios.get("/publickeys");
};

export const createNewSession = (data) => {
  return axios.put("/session/new", data);
};

export const pwlLogin = (sessionId) => {
  return axios.get(`/session/${sessionId}/response`);
};

export const pwlLoginDemo = (sessionId) => {
  return axios.get(`/session/${sessionId}/poll/auth_result`);
};

export const verifyUser = (data) => {
  return axios.post("/verifyuser", data);
};
