export default function SliderSection() {
  return (
    <>
      {/* //<!-- Hero Section Begin --> */}
      <section className="hero" style={{ marginTop: "7rem" }}>
        <div className="hero__slider owl-carousel">
          <div
            className="hero__items set-bg"
            data-setbg="/Client/assets/img/hero/slider-1.jpg"
          >
            <div className="container" style={{color: "white"}}>
              <div className="row">
                <div className="col-xl-5 col-lg-7 col-md-8">
                  <div className="hero__text">
                    <h6 style={{color: "white"}}>Walk with Confidence</h6>
                    <h2 style={{color: "white"}}>Fall - Winter Collections 2025</h2>
                    <p style={{color: "white"}}>
                      A specialist label creating luxury essentials. Ethically
                      crafted with an unwavering commitment to exceptional
                      quality.
                    </p>
                    <a href="#" className="primary-btn">
                      Shop now <span className="arrow_right"></span>
                    </a>
                    <div className="hero__social">
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hero__items set-bg"
            data-setbg="/Client/assets/img/hero/slider-3.jpg"
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-lg-7 col-md-8">
                  <div className="hero__text">
                    <h6 style={{color: "white"}}>Stay Fresh, Stay Fast</h6>
                    <h2 style={{color: "white"}}>Spring - Summer Collections 2025</h2>
                    <p style={{color: "white"}}>
                      A specialist label creating luxury essentials. Ethically
                      crafted with an unwavering commitment to exceptional
                      quality.
                    </p>
                    <a href="#" className="primary-btn">
                      Shop now <span className="arrow_right"></span>
                    </a>
                    <div className="hero__social">
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* //<!-- Hero Section End --> */}
    </>
  );
}
