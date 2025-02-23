import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/Register.css";
import authService from "../../../services/authService";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Chặn page refresh

        if (password !== confirmPassword) {
            setMessage("Mật khẩu không khớp!");
            return;
        }

        const result = await authService.register(userName, email, password, confirmPassword);

        if (result.success) {
            setMessage("Đăng ký thành công! Đang chuyển hướng...");
            setTimeout(() => navigate("/user-login"), 2000);
        } else {
            setMessage(result.message);
        }
    };

    return (
        <>
            <div className="register-container">
                <h2 className="form-title">ĐĂNG KÝ</h2>
                <p className="text-center text-danger">{message}</p>

                <form onSubmit={handleRegister} className="register-form">
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Tên người dùng" 
                            className="input-field" 
                            required 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <i className="material-symbols-rounded">person</i>
                    </div>

                    <div className="input-wrapper">
                        <input 
                            type="email" 
                            placeholder="Địa chỉ email" 
                            className="input-field" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="material-symbols-rounded">mail</i>
                    </div>

                    <div className="input-wrapper">
                        <input 
                            type="password" 
                            placeholder="Mật khẩu" 
                            className="input-field" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="material-symbols-rounded">lock</i>
                    </div>

                    <div className="input-wrapper">
                        <input 
                            type="password" 
                            placeholder="Xác nhận mật khẩu" 
                            className="input-field" 
                            required 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <i className="material-symbols-rounded">lock</i>
                    </div>

                    <button type="submit" className="register-button">ĐĂNG KÝ</button>
                </form>

                <p className="signup-prompt">
                    Đã có tài khoản? <Link to="/user-login" className="signup-link">Đăng nhập</Link>
                </p>
            </div>
        </>
    );
}
