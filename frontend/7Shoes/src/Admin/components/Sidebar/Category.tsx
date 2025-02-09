export default function Category() {
  return (
    <li className="nav-item">
      <a data-bs-toggle="collapse" href="#base">
        <i className="fas fa-layer-group"></i>
        <p>Category</p>
        <span className="caret"></span>
      </a>
      <div className="collapse" id="base">
        <ul className="nav nav-collapse">
          <li>
            <a href="components/avatars.html">
              <span className="sub-item">Avatars</span>
            </a>
          </li>
          <li>
            <a href="components/buttons.html">
              <span className="sub-item">Buttons</span>
            </a>
          </li>
          <li>
            <a href="components/gridsystem.html">
              <span className="sub-item">Grid System</span>
            </a>
          </li>
          <li>
            <a href="components/panels.html">
              <span className="sub-item">Panels</span>
            </a>
          </li>
          <li>
            <a href="components/notifications.html">
              <span className="sub-item">Notifications</span>
            </a>
          </li>
          <li>
            <a href="components/sweetalert.html">
              <span className="sub-item">Sweet Alert</span>
            </a>
          </li>
          <li>
            <a href="components/font-awesome-icons.html">
              <span className="sub-item">Font Awesome Icons</span>
            </a>
          </li>
          <li>
            <a href="components/simple-line-icons.html">
              <span className="sub-item">Simple Line Icons</span>
            </a>
          </li>
          <li>
            <a href="components/typography.html">
              <span className="sub-item">Typography</span>
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
}
