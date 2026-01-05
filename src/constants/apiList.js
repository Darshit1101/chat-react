import { VITE_BACKEND_URL } from "./environment";

const prefix = "/v1";
const appName = "/app";

const apiList = {
  AUTH: {
    LOGIN: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/login`,
    },
    REGISTER: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/register`,
    },
    GOOGLE_LOGIN: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/google`,
    },
    LOGOUT: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/logout`,
    },
    SYNC: {
      method: "GET",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/sync`,
    },
    ENABLE_2FA: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/2fa/enable`,
    },
    VERIFY_2FA: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/2fa/verify`,
    },
    LOGIN_VERIFY_2FA: {
      method: "POST",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/auth/2fa/login/verify`,
    },
  },
  ACTIVE_DEVICE: {
    GET_DEVICES: {
      method: "GET",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/active-device/getAll`,
    },
    DELETE_DEVICE: {
      method: "DELETE",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/active-device/:id`,
    },
  },
  CHAT: {
    GET_HISTORY: {
      method: "GET",
      url: `${VITE_BACKEND_URL}${appName}${prefix}/chat/:receiverId`,
    },
  },
};

export default apiList;
