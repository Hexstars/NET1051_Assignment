import { useState } from "react";
import { useEffect } from "react";
import "../../../assets/css/Login.css";
import { User } from "../../../../models/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ACCOUNT_BASE_URL } from "../../../components/APi/constants";



type UserBody = {
  currentData?: User
};

export default function LogIn({ currentData }: UserBody) {
  useEffect(() => {
    document.body.classList.add("login-body");

    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  // State quản lý giá trị của email, password và lỗi validation
  const navigate = useNavigate();
  const [user, setUser] = useState({
      email: currentData?.email || "",
      password: currentData?.password || "",
      RememberMe: currentData?.RememberMe || false,
  });

  //Kiểm tra dữ liệu nhập vào
  const validate = () => {
    let newErrors: { email?: string; password?: string } = {};

    //Kiểm tra email
    if (!user.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    //Kiểm tra pass
    if (!user.password) {
      newErrors.password = "Mật khẩu không được để trống!";
    } else if (user.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự!";
    }

    setErrors(newErrors); //cập nhật state lỗi
    return Object.keys(newErrors).length === 0; //trả về true nếu kh lỗi
  };

  // Hàm xử lý khi người dùng submit form
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("User data being sent:", user);

    try {
        const data = {
            Email : user.email,
            Password : user.password,
            RememberMe : user.RememberMe
        }

        const response = await axios.post(`${ACCOUNT_BASE_URL}login`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            withCredentials: true
        });

        if (response.status === 200 || response.status === 201) {
            alert("Login Successfully!");
            navigate("/home");
        } else {
            alert("Login Failed!");
        }
    } catch (error: any) {
        console.error("Login Error:", error);

        if (error.response) {
            console.error("Error Response:", error.response.data);
            alert(error.response.data?.message || "An error occurred. Please try again.");
        } else {
            alert("Network error or server is down. Please try again later.");
        }

        console.log(error.response)
    }
};

  return (
    <div className="login-page">
      <div className="wrapper-login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <h4>User a local account to login.</h4>

          <div className="input-box">
            <input type="email" className="form-control" id="email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <i className="bx bxs-envelope"></i>
            {/* <div className="error-message">
              {errors.email && <p className="">{errors.email}</p>}
            </div> */}
          </div>

          <div className="input-box">
            <input type="password" className="form-control" id="password" 
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <i className="bx bxs-lock-alt"></i>
            {/* {errors.password && (
              <p className="error-message">{errors.password}</p>
            )} */}
          </div>

          <div className="remember-forgot">
            <label>
            <input type="checkbox" className="form-check-input" id="rememberMe" 
            checked={user.RememberMe}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            /> Remember Me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn">
            <span></span>Login
          </button>
        </form>
      </div>
    </div>
  );
}
function setErrors(newErrors: { email?: string; password?: string; }) {
  throw new Error("Function not implemented.");
}

