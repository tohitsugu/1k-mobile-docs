/* Core */
import axios from "axios";
import { v4 } from "uuid";
/* Services */
import ECDSA from "../services/ECDSA";
import sessionService from "../services/sessionService";
import { store } from "../init/store";
/* Actions */
import { authActions } from "../components/Auth/actions";

const instance = axios.create({
  baseURL:
    process.env.NODE_APP_BASE_URL ||
    `${window?.location?.protocol}//${window?.location?.host}/devportalapi`,
});

instance.interceptors.request.use((request) => {
  if (request.url !== "/publickeys") {
    const { icontext, bcontext } = sessionService.getCommunityKeys();
    const serverPKey = sessionService.getServerPublicKey();
    const sharedKey = ECDSA.createSharedKey(icontext, serverPKey);
    request.headers.publickey = bcontext;
    const requestId = {
      ts: Math.round(new Date().getTime() / 1000),
      appid: "website",
      uuid: v4(),
    };
    const encryptedRequestId = ECDSA.encrypt(
      JSON.stringify(requestId),
      sharedKey
    );
    request.headers.requestId = encryptedRequestId;
    const token = sessionService.getToken();
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    if (request.data) {
      const encryptedData = ECDSA.encrypt(
        JSON.stringify(request.data),
        sharedKey
      );
      request.data = { data: encryptedData };
    }
  }
  return request;
});

instance.interceptors.response.use(
  (response) => {
    if (
      response.config.url !== "/publickeys" &&
      !response.config.url.startsWith("/broker/download") &&
      response.data
    ) {
      const { data, publicKey } = response.data;
      const { icontext } = sessionService.getCommunityKeys();
      const sharedKey = ECDSA.createSharedKey(icontext, publicKey);
      const decryptedData = JSON.parse(
        ECDSA.decrypt(JSON.stringify(data), sharedKey)
      );
      response.data = { data: decryptedData };
    }
    return response;
  },
  (error) => {
    if (error?.message === "Network Error") {
      store.dispatch(
        authActions.showMessage({
          message: {
            show: true,
            text: "Our servers are down. Please try logging in again later",
            severity: "error",
          },
        })
      );
    }
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.config.url !== "/authenticate" &&
      error.response.config.url !== "/session/response/fetch" &&
      error.response.config.url !== "/verifyuser" &&
      error.response.config.url !== "/authenticate/otp" &&
      !error.response.config.url.includes("/response")
    ) {
      store.dispatch(
        authActions.logout({
          message: {
            show: true,
            text: "Your session has expired, please login again.",
            severity: "warning",
          },
          redirectToLogin: true,
        })
      );
    }
    return Promise.reject(error);
  }
);

export default instance;
