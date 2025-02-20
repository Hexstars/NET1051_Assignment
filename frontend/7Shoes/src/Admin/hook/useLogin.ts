import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, validateLogin, LoginData, ValidationErrors } from "../services/authService";
import Swal from "sweetalert2";

export function useLogin() {
  const navigate = useNavigate();

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
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate("/admin");
        });
      } else {
        Swal.fire({
          title: "Login Failed!",
          text: "Invalid email or password.",
          icon: "error"
        });
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      Swal.fire({
        title: "Login Error",
        text: error.response?.data?.message || "An error occurred. Please try again.",
        icon: "error"
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
