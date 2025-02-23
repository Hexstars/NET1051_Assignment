import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, validateLogin, LoginData, ValidationErrors } from "../services/authService";
import Swal from "sweetalert2";
import { logout } from "../../store/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { login }  from "../../store/reducers/auth";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State quản lý dữ liệu người dùng và lỗi
  const [user, setUser] = useState<LoginData>({
    email: "",
    password: "",
    RememberMe: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    document.body.classList.add("login-body");
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  // Hàm xử lý khi submit form
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Kiểm tra lỗi form trước khi gửi
    const validationErrors = validateLogin(user);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await loginUser(user);
      if (response.status === 200 || response.status === 201) {
        const userInfo = response.data;
        localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Lưu thông tin user

        if (!userInfo.roles.includes("Admin")) {
          Swal.fire({
            title: "Access Denied!",
            text: "Bạn không có quyền truy cập Admin.",
            icon: "warning",
          }).then(() => {
            localStorage.removeItem("userInfo");
            dispatch(logout());
          });
          return;
        }

        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          dispatch(login({ token: response.data.token, userInfo: response.data }));
          navigate("/admin"); // Chuyển hướng
        });
      } else {
        Swal.fire({
          title: "Login Failed!",
          text: "Invalid email or password.",
          icon: "error",
        });
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      Swal.fire({
        title: "Login Error",
        text: error.response?.data?.message || "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return {
    user,
    setUser,
    errors,
    handleLogin,
  };
}
