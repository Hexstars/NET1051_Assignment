import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_BASE_URL } from "../components/APi/constants";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${ACCOUNT_BASE_URL}logout`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Logged out successfully!");
        navigate("/log-in"); // Chuyển hướng sau khi logout
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    }
  };

  return handleLogout;
};

export default useLogout;
