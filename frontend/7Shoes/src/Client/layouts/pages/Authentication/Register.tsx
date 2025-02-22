import { Link } from "react-router-dom";
import "../../../assets/css/Register.css";

export default function Register(){
    return(
        <>
            <div className="register-container">
                <h2 className="form-title">ĐĂNG KÝ</h2>

                <form action="#" className="register-form">
                <div className="input-wrapper">
                    <input type="text" placeholder="Tên người dùng" className="input-field" required />
                    <i className="material-symbols-rounded">person</i>
                    </div>

                    <div className="input-wrapper">
                    <input type="email" placeholder="Địa chỉ email" className="input-field" required />
                    <i className="material-symbols-rounded">mail</i>
                    </div>
                    
                    <div className="input-wrapper">
                    <input type="text" placeholder="Địa chỉ" className="input-field" required />
                    <i className="material-symbols-rounded">location_on</i>
                    </div>

                    <div className="input-wrapper">
                    <input type="password" placeholder="Mật khẩu" className="input-field" required />
                    <i className="material-symbols-rounded">lock</i>
                    </div>

                    <div className="input-wrapper">
                    <input type="password" placeholder="Xác nhận mật khẩu" className="input-field" required />
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