import axios from "axios";
import { get, set, del } from "idb-keyval";
import store from "../redux/store";
import { addUser, removeUser } from "../redux/userSlice";

const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const user = await get("user");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

let isRefreshing = false;
let queuedRequests = [];

function resolveQueue(error, newToken) {
  queuedRequests.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(newToken);
  });
  queuedRequests = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthFailure = error.response && error.response.status === 403;

    if (!isAuthFailure || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queuedRequests.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const user = await get("user");

      if (!user?.refreshToken) {
        throw new Error("No refresh token available");
      }

      const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken: user.refreshToken,
      });

      const authDto = refreshResponse.data;

      await set("user", {
        username: authDto.user.username,
        email: authDto.user.email,
        token: authDto.token,
        refreshToken: authDto.refreshToken,
      });
      store.dispatch(addUser(authDto));

      resolveQueue(null, authDto.token);

      originalRequest.headers.Authorization = `Bearer ${authDto.token}`;
      return api(originalRequest);
    } catch (refreshError) {
      resolveQueue(refreshError, null);
      await del("user");
      store.dispatch(removeUser());
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
