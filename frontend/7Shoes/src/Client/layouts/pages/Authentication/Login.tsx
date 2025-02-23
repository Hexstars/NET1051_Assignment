import "../../../assets/css/Login.css";
import React, { FC, ReactElement, useEffect, useState } from "react";
import Input from "../../../components/Input";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../../services/authService";
import { useDispatch } from "react-redux";
import { login }  from "../../../../store/reducers/auth";

type LoginProps = {
}
const Login: FC<LoginProps> = (): ReactElement => {
    const [message, setMessage] =useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);

    useEffect(() =>{
        emailRef.current?.focus();
    }, []);

    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";

        try {
            const res = await authService.login(email, password);
            setMessage('');
            localStorage.setItem("userInfo", JSON.stringify(res));
            dispatch(login({ token: res.token, userInfo: res }));
            navigate('/');
        } catch (error) {
            setMessage("Đăng nhập thất bại.");
        }
    }
    return(
        <>
            <div className="login-container">
                {/* <h2 className="form-title">Log in with</h2>

                <div className="social-login">
                    <button className="social-button">
                    <img src="google.svg" alt="Google" className="social-icon" />
                    Google
                    </button>
                </div>

                <p className="separator"><span>or</span></p> */}
                <p className="text-center text-danger">{message}</p>
                <form onSubmit={formSubmitHandler} className="login-form">
                    <div className="input-wrapper">
                    <Input inputRef={emailRef} id="txtUsername" label="Email" type="email" placeholder="Email@example.com" className="input-field" required />
                   
                    </div>
                    
                    <div className="input-wrapper">
                    <Input inputRef={passwordRef} id="txtPassword" label="Password" type="password" placeholder="Mật khẩu" className="input-field" required />
                    
                    </div>

                    {/* <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div> */}
                    
                    <button type="submit" className="login-button">ĐĂNG NHẬP</button>
                </form>

                <p className="signup-prompt">
                    Chưa có tài khoản? <Link to="/user-register" className="signup-link">Đăng ký</Link>
                </p>
            </div>
        </>
    );
}
export default Login;
