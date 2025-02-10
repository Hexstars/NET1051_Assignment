import axios from "axios";
import { Link } from "react-router-dom";
import { ACCOUNT_BASE_URL } from "../APi/constants";

export default function Authentication() {
  const handleLogout = async () => {
    try {
        const response = await axios.get(`${ACCOUNT_BASE_URL}logout`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            withCredentials: true 
        });

        if (response.status === 200) {
            alert("Logged out successfully!");
            // window.location.href = "/log-in";  
        } else {
            alert("Logout failed!");
        }
    } catch (error) {
        console.error("Logout error:", error);
        alert("An error occurred during logout.");
    }
};


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
              <i className="fas fa-sign-out-alt"></i>
              <span onClick={handleLogout}>Log Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}
