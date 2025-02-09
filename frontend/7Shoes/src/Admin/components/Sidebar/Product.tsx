export default function Product(){
    return (
      <li className="nav-item">
        <a data-bs-toggle="collapse" href="#sidebarLayouts">
          <i className="fas fa-th-list"></i>
          <p>Product</p>
          <span className="caret"></span>
        </a>
        <div className="collapse" id="sidebarLayouts">
          <ul className="nav nav-collapse">
            <li>
              <a href="sidebar-style-2.html">
                <span className="sub-item">Sidebar Style 2</span>
              </a>
            </li>
            <li>
              <a href="icon-menu.html">
                <span className="sub-item">Icon Menu</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    );
}