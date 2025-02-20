import Authentication from "../components/pages/LogOut";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div
          className="logo-header d-flex justify-content-center align-items-center"
          data-background-color="dark"
          style={{ height: "100px", margin: "25px 0" }}
        >
          <a href="index.html" className="logo">
            <img
              src="/logo.png"
              alt="navbar brand"
              className="navbar-brand"
              height="150"
            />
          </a>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
      </div>
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h"></i>
              </span>
              <h4 className="text-section text-start">Home</h4>
            </li>

            <li className="nav-item active">
              <Link to="dash-board" className="nav-link">
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h"></i>
              </span>
              <h4 className="text-section text-start">Management</h4>
            </li>

            <li className="nav-item active">
              <Link to="category" className="nav-link">
                <i className="fas fa-layer-group"></i>
                <p>Category</p>
              </Link>
            </li>

            <li className="nav-item active">
              <Link to="product" className="nav-link">
                <i className="fas fa-th-list"></i>
                <p>Product</p>
              </Link>
            </li>

            <li className="nav-item active">
              <Link to="order" className="nav-link">
                <i className="fas fa-pen-square"></i>
                <p>Order</p>
              </Link>
            </li>

            <li className="nav-item active">
              <Link to="customer" className="nav-link">
                <i className="fas fa-table"></i>
                <p>Customer</p>
              </Link>
            </li>

            {/* <Material />

            <Brand />

            <Size /> */}

            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h"></i>
              </span>
              <h4 className="text-section text-start">System</h4>
            </li>

            <Authentication />
          </ul>
        </div>
      </div>
    </div>
  );
}
