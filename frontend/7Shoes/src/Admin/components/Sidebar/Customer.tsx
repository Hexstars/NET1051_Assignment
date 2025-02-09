export default function Customer(){
    return (
      <li className="nav-item">
        <a data-bs-toggle="collapse" href="#tables">
          <i className="fas fa-table"></i>
          <p>Customer</p>
          <span className="caret"></span>
        </a>
        <div className="collapse" id="tables">
          <ul className="nav nav-collapse">
            <li>
              <a href="tables/tables.html">
                <span className="sub-item">Basic Table</span>
              </a>
            </li>
            <li>
              <a href="tables/datatables.html">
                <span className="sub-item">Datatables</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    );
}