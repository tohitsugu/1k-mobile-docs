/* Services */
import ECDSA from "./ECDSA";
// localStorage is not available in gmail client webview on Android
let webviewSessionStorage = {};
let webviewLocalStorage = {};
class SessionService {
  sessionKeysAreReady() {
    const serverPublicKey = sessionStorage
      ? sessionStorage?.getItem("serverPublicKey")
      : webviewSessionStorage.serverPublicKey;
    return !!serverPublicKey;
  }

  getServerPublicKey() {
    return window?.sessionStorage
      ? JSON.parse(sessionStorage?.getItem("serverPublicKey"))
      : webviewSessionStorage.serverPublicKey;
  }

  setServerPublicKey(key) {
    if (sessionStorage) {
      sessionStorage?.setItem("serverPublicKey", JSON.stringify(key));
    } else {
      webviewSessionStorage.serverPublicKey = key;
    }
  }

  getCommunityKeys() {
    return sessionStorage
      ? JSON.parse(sessionStorage?.getItem("communityKeys"))
      : webviewSessionStorage.communityKeys;
  }

  setCommunityKeys() {
    const [privateKey, publicKey] = ECDSA.generateKeyPair();
    if (sessionStorage) {
      sessionStorage?.setItem(
        "communityKeys",
        JSON.stringify({ icontext: privateKey, bcontext: publicKey })
      );
    } else {
      webviewSessionStorage.communityKeys = {
        icontext: privateKey,
        bcontext: publicKey,
      };
    }
  }

  getToken() {
    return localStorage
      ? localStorage?.getItem(`18088bf3-d3f7-467b-9408-7b400c9e747d_token`)
      : webviewLocalStorage[`18088bf3-d3f7-467b-9408-7b400c9e747d_token`];
  }

  setSessionToken(token) {
    if (token) {
      if (localStorage) {
        localStorage?.setItem(
          `18088bf3-d3f7-467b-9408-7b400c9e747d_token`,
          token
        );
      } else {
        webviewLocalStorage[`18088bf3-d3f7-467b-9408-7b400c9e747d_token`] =
          token;
      }
    } else {
      if (localStorage) {
        localStorage?.removeItem(`18088bf3-d3f7-467b-9408-7b400c9e747d_token`);
      } else {
        webviewLocalStorage[`18088bf3-d3f7-467b-9408-7b400c9e747d_token`] =
          token;
      }
    }
  }

  clearSession() {
    if (sessionStorage) {
      sessionStorage?.removeItem("serverPublicKey");
      sessionStorage?.removeItem("communityKeys");
    }
    if (localStorage) {
      localStorage?.removeItem(`18088bf3-d3f7-467b-9408-7b400c9e747d_token`);
    }
    webviewSessionStorage = {};
    webviewLocalStorage = {};
  }

  getPermission() {
    return "basic-user";
  }
}

export default new SessionService();
