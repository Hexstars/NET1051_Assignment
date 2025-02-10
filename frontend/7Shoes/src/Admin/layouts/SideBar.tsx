import Authentication from "../components/Sidebar/Authentication";
import Brand from "../components/Sidebar/Brand";
import Category from "../components/Sidebar/Category";
import Customer from "../components/Sidebar/Customer";
import DashBoard from "../components/Sidebar/DashBoard";
import Material from "../components/Sidebar/Material";
import Order from "../components/Sidebar/Order";
import Product from "../components/Sidebar/Product";
import Size from "../components/Sidebar/Size";

export default function SideBar(){
    return(
        <div className="sidebar" data-background-color="dark">
        <div className="sidebar-logo">
          <div className="logo-header" data-background-color="dark">
            <a href="index.html" className="logo">
              <img
                src="src/Admin/assets/img/kaiadmin/logo_light.svg"
                alt="navbar brand"
                className="navbar-brand"
                height="20"
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

              <DashBoard/>

              <li className="nav-section">
                <span className="sidebar-mini-icon">
                  <i className="fa fa-ellipsis-h"></i>
                </span>
                <h4 className="text-section text-start">Management</h4>
              </li>
  
              <Category/>

              <Product/>

              {/* <Order/>

              <Customer/>

              <Material/>

              <Brand/>

              <Size/> */}

              <li className="nav-section">
                <span className="sidebar-mini-icon">
                  <i className="fa fa-ellipsis-h"></i>
                </span>
                <h4 className="text-section text-start">System</h4>
              </li>

              <Authentication/>

            </ul>
          </div>
        </div>
      </div>
    );
}
