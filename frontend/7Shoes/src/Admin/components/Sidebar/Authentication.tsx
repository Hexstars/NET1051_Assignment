import { Link } from "react-router-dom";

export default function Authentication() {
  return (
    <li className="nav-item">
      <a data-bs-toggle="collapse" href="#authenticationMenu">
        <i className="fas fa-user-shield"></i>
        <p>Authentication</p>
        <span className="caret"></span>
      </a>
      <div className="collapse" id="authenticationMenu">
        <ul className="nav nav-collapse">
          <li>
            <Link to="/log-in">
              <i className="fas fa-sign-in-alt"></i>
              <span>Log In</span>
            </Link>
          </li>
          <li>
            <Link to="/log-out">
              <i className="fas fa-sign-out-alt"></i>
              <span>Log Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}
