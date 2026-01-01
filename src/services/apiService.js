import { useAuth } from "../stores/useAuth";
import {
  getVisitorId as getVisitorIdFromCookie,
  setVisitorId,
} from "../utils/cookie";
import { getClientFingerprint } from "../utils/deviceInfo";

const initVisitorId = async () => {
  let visitorId = getVisitorIdFromCookie();

  if (visitorId) return visitorId;

  try {
    const fingerprint = await getClientFingerprint();
    visitorId = fingerprint?.visitorId || null;

    if (visitorId) {
      setVisitorId(visitorId);
    }

    return visitorId;
  } catch (error) {
    console.error("Fingerprint error:", error);
    return null;
  }
};

const apiService = async (apiConfig = {}, data = null) => {
  if (!apiConfig?.url || !apiConfig?.method) {
    throw new Error("API config must include url and method");
  }

  try {
    const visitorId = await initVisitorId();

    const headers = {
      "Content-Type": "application/json",
      // ngrok skip browser warning page
      "ngrok-skip-browser-warning": "69420",
      ...(visitorId && { "x-visitor-id": visitorId }),
    };

    const fetchConfig = {
      method: apiConfig.method.toUpperCase(),
      headers,
      credentials: "include",
    };

    if (data && ["POST", "PUT", "PATCH"].includes(fetchConfig.method)) {
      fetchConfig.body = JSON.stringify(data);
    }

    const response = await fetch(apiConfig.url, fetchConfig);

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    const result = isJson ? await response.json() : null;

    if (response.status === 401) {
      if (result?.data?.forceLogout) {
        const authStore = useAuth.getState();
        authStore.logout();

        window.location.replace("/login");
      }

      const error = new Error(result?.message || "Unauthorized access");
      error.status = 401;
      error.data = result?.data;
      throw error;
    }

    if (!response.ok) {
      throw new Error(
        result?.message || result?.error || `API Error (${response.status})`
      );
    }

    return result;
  } catch (error) {
    console.error("API Service Error:", error);
    throw error;
  }
};

export default apiService;
