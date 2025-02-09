import { useState } from "react";
import { useEffect } from "react";
import "../../../assets/css/Login.css";

export default function LogIn() {
  useEffect(() => {
    document.body.classList.add("login-body");

    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  // State quản lý giá trị của email, password và lỗi validation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  //Kiểm tra dữ liệu nhập vào
  const validate = () => {
    let newErrors: { email?: string; password?: string } = {};

    //Kiểm tra email
    if (!email) {
      newErrors.email = "Email không được để trống!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    //Kiểm tra pass
    if (!password) {
      newErrors.password = "Mật khẩu không được để trống!";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự!";
    }

    setErrors(newErrors); //cập nhật state lỗi
    return Object.keys(newErrors).length === 0; //trả về true nếu kh lỗi
  };

  // Hàm xử lý khi người dùng submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Đăng nhập thành công!", { email, password });
      // Gửi dữ liệu đến backend tại đây...
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper-login">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <h4>User a local account to login.</h4>

          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bxs-envelope"></i>
            <div className="error-message">
              {errors.email && <p className="">{errors.email}</p>}
            </div>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
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
