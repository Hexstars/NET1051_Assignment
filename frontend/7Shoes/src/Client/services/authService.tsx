import api from "./api";

export type LoginInfo = {
    id: number,
    userName: string,
    token: string
};

const login = (email: string, password: string) => {
    const data = {email, password};
    return api.post<LoginInfo>(`${api.url.auths}/login`, data)
                .then(res => res.data);
};

const authService = {
    login,
}

export default authService;