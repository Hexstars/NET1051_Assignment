import useLogout from "../../hook/useLogout";

import { Link } from "react-router-dom";

export default function Authentication() {
  const handleLogout = useLogout();

  return (
    <li className="nav-item">
      <Link
        to="/log-out"
        onClick={(e) => {
          e.preventDefault(); // Chặn điều hướng ngay lập tức
          handleLogout();
        }}
      >
        <i className="fas fa-sign-out-alt"></i> Log Out
      </Link>
    </li>
  );
}
