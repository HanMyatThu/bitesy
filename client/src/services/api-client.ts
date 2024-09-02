import axios from "axios";

const baseURL = import.meta.env.VITE_LEGACY_API_BASE_URL;

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (config) => {
    console.log(`${config.method} ${config.url}`, "API Call");

    const token = await retrieveToken();

    const bearer = `Bearer ${token}`;

    config.headers.Authorization = bearer;

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.config.url === "/api/auth/refresh-token" &&
      error.response.status === 401
    ) {
      originalRequest._retry = true;
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      error.response?.data?.error?.message.includes("expired") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem("refreshtoken");
      const data = await api.post(`/api/auth/refresh-token`, {
        refreshToken,
      });
      if (data.data) {
        sessionStorage.setItem("accessToken", data.data?.tokens?.access);
        sessionStorage.setItem("refreshtoken", data.data?.tokens?.refresh);
      }
    }
    return Promise.reject(error);
  },
);

const retrieveToken = async () => {
  const accessToken = sessionStorage.getItem("accesstoken");
  return accessToken;
};
