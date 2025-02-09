import { Link } from "react-router-dom";

export default function DashBoard() {
  return (
    <li className="nav-item active">
      <Link to="/" className="nav-link">
        <i className="fas fa-home"></i>
        <p>Dashboard</p>
      </Link>
    </li>
  );
}
