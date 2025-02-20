import { Link } from "react-router-dom";
import "../../../assets/css/Login.css";

export default function UserLogin(){
    return(
        <>
            <div className="login-container">
                <h2 className="form-title">Log in with</h2>

                <div className="social-login">
                    <button className="social-button">
                    <img src="google.svg" alt="Google" className="social-icon" />
                    Google
                    </button>
                </div>

                <p className="separator"><span>or</span></p>

                <form action="#" className="login-form">
                    <div className="input-wrapper">
                    <input type="email" placeholder="Email@example.com" className="input-field" required />
                    <i className="material-symbols-rounded">mail</i>
                    </div>
                    
                    <div className="input-wrapper">
                    <input type="password" placeholder="Min 6 characters" className="input-field" required />
                    <i className="material-symbols-rounded">lock</i>
                    </div>

                    <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                    </div>
                    
                    <button type="submit" className="login-button">Log In</button>
                </form>

                <p className="signup-prompt">
                    Don&apos;t have an account? <Link to="/user-register" className="signup-link">Sign up</Link>
                </p>
            </div>
        </>
    );
}