import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_BASE_URL } from "../components/api/constants";
import Swal from "sweetalert2";

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
        Swal.fire({
          title: "Logout Successful!",
          text: "See you again!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate("/admin-login");
        });
      } else {
        Swal.fire({
          title: "Logout Failed!",
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    }
  };

  return handleLogout;
};

export default useLogout;
