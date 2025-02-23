import axios, { AxiosError } from "axios";
import store, { RootState } from "../../store";

const url = {
    baseUrl: "https://localhost:7043/api/",
    auths: "/account",
    carts: "/carts",
    productItems: "/productitem"
};

const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

instance.interceptors.request.use((request) => {
  const state: RootState = store.getState();
  console.log("Request with token:", state.auth.token); // Debugging
  if (state.auth.token) {
      request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  return request;
});
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err: AxiosError) => {
      if (err.code === "ERR_NETWORK") {
        window.location.href = "/network-error";
      } else {
        switch (err.response?.status) {
          case 401:
            window.location.href = "/user-login";
            break;
          case 403:
            window.location.href = "/no-permission";
            break;
        }
      }
      return Promise.reject(err);
    }
  );

const api = {
    url,
    instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
};

export default api;