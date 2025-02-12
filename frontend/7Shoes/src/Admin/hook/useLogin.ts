import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, validateLogin, LoginData, ValidationErrors } from "../services/authService";

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

  //Hàm xử lý khi submit form
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLogin(user);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await loginUser(user);
      if (response.status === 200 || response.status === 201) {
        alert("Login Successfully!");
        navigate("/admin");
      } else {
        alert("Login Failed!");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return {
    user,
    setUser,
    errors,
    handleLogin,
  };
}
