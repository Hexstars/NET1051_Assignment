import axios from "axios";

const url = {
    baseUrl: "https://localhost:7043/api/",
    login: "/Account/Login",
    carts: "/carts"
};

const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

const api = {
    url,
    instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
};

export default api;