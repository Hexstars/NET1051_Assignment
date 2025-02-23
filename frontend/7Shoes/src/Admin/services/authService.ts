import axios from "axios";
import { ACCOUNT_BASE_URL } from "../components/api/constants";

export type LoginData = {
  email: string;
  password: string;
  RememberMe: boolean;
};

export type ValidationErrors = {
  email?: string;
  password?: string;
};

//Hàm kiểm tra dữ liệu nhập vào
export const validateLogin = (user: LoginData): ValidationErrors => {
  let newErrors: ValidationErrors = {};

  if (!user.email) {
    newErrors.email = "Email không được để trống!";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    newErrors.email = "Email không đúng định dạng!";
  }

  if (!user.password) {
    newErrors.password = "Mật khẩu không được để trống!";
  } else if (user.password.length < 6) {
    newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự!";
  }

  return newErrors;
};

//hàm gọi API đăng nhập
export const loginUser = async (user: LoginData) => {
  const data = {
    Email: user.email,
    Password: user.password,
    RememberMe: user.RememberMe,
  };

  return await axios.post(`${ACCOUNT_BASE_URL}login`, data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });
};
