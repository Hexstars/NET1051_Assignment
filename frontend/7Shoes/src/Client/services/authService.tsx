import api from "./api";

export type LoginInfo = {
    id: number,
    userName: string,
    token: string
};

export type RegisterInfo = {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
};
const login = (email: string, password: string) => {
    const data = {email, password};
    return api.post<LoginInfo>(`${api.url.auths}/login`, data)
                .then(res => res.data);
};

const register = async (userName: string, email: string, password: string, confirmPassword: string) => {
    const data = { userName, email, password, confirmPassword };

    try {
        await api.post(`${api.url.auths}/register`, data);
        return { success: true, message: "Registration successful!" };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Registration failed." };
    }
};

const authService = {
    login,
    register
}

export default authService;