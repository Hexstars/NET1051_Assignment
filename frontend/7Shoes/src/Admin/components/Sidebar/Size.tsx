export default function Size(){
    return (
      <li className="nav-item">
        <a data-bs-toggle="collapse" href="#charts">
          <i className="far fa-chart-bar"></i>
          <p>Size</p>
          <span className="caret"></span>
        </a>
        <div className="collapse" id="charts">
          <ul className="nav nav-collapse">
            <li>
              <a href="charts/charts.html">
                <span className="sub-item">Chart Js</span>
              </a>
            </li>
            <li>
              <a href="charts/sparkline.html">
                <span className="sub-item">Sparkline</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    );
}