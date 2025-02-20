import { Link } from "react-router-dom";
import "../../../assets/css/Register.css";

export default function Register(){
    return(
        <>
            <div className="register-container">
                <h2 className="form-title">Register</h2>

                <form action="#" className="register-form">
                <div className="input-wrapper">
                    <input type="text" placeholder="Username" className="input-field" required />
                    <i className="material-symbols-rounded">person</i>
                    </div>

                    <div className="input-wrapper">
                    <input type="email" placeholder="Email@example.com" className="input-field" required />
                    <i className="material-symbols-rounded">mail</i>
                    </div>
                    
                    <div className="input-wrapper">
                    <input type="text" placeholder="Address" className="input-field" required />
                    <i className="material-symbols-rounded">location_on</i>
                    </div>

                    <div className="input-wrapper">
                    <input type="password" placeholder="Min 6 characters" className="input-field" required />
                    <i className="material-symbols-rounded">lock</i>
                    </div>

                    <div className="input-wrapper">
                    <input type="password" placeholder="Confirm password" className="input-field" required />
                    <i className="material-symbols-rounded">lock</i>
                    </div>

                    <button type="submit" className="register-button">Log In</button>
                </form>

                <p className="signup-prompt">
                    Have an account? <Link to="/user-login" className="signup-link">Sign In</Link>
                </p>
            </div>
        </>
    );
}