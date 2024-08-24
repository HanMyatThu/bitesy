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

const retrieveToken = async () => {
  const accessToken = sessionStorage.getItem("accesstoken");
  return accessToken;
};
