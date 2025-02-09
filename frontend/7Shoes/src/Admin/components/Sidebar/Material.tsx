export default function Material(){
    return (
      <li className="nav-item">
        <a data-bs-toggle="collapse" href="#maps">
          <i className="fas fa-map-marker-alt"></i>
          <p>Material</p>
          <span className="caret"></span>
        </a>
        <div className="collapse" id="maps">
          <ul className="nav nav-collapse">
            <li>
              <a href="maps/googlemaps.html">
                <span className="sub-item">Google Maps</span>
              </a>
            </li>
            <li>
              <a href="maps/jsvectormap.html">
                <span className="sub-item">Jsvectormap</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    );
}