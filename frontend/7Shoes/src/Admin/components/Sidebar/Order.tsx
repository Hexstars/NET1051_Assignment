export default function Order(){
    return (
      <li className="nav-item">
        <a data-bs-toggle="collapse" href="#forms">
          <i className="fas fa-pen-square"></i>
          <p>Order</p>
          <span className="caret"></span>
        </a>
        <div className="collapse" id="forms">
          <ul className="nav nav-collapse">
            <li>
              <a href="forms/forms.html">
                <span className="sub-item">Basic Form</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    );
}