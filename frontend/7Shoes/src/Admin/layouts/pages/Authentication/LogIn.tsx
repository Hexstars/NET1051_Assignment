import { useLogin } from "../../../hook/useLogin";
import "../../../assets/css/Login.css";

export default function AdminLogin() {
  const { user, setUser, errors, handleLogin } = useLogin();

  return (
    <div className="login-page">
      <div className="wrapper-login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <h4 style={{marginTop: "10px"}}>Use a local account to login.</h4>

          <div className="input-box">
            <input
              type="email"
              className="form-control"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <i className="bx bxs-envelope"></i>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-box">
            <input
              type="password"
              className="form-control"
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <i className="bx bxs-lock-alt"></i>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                className="form-check-input"
                checked={user.RememberMe}
                onChange={(e) =>
                  setUser({ ...user, RememberMe: e.target.checked })
                }
              />{" "}
              Remember Me
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
