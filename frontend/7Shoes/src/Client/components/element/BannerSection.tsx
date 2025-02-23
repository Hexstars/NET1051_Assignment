export default function BannerSection() {
  return (
    <>
      {/* //<!-- Banner Section Begin --> */}
      <section className="banner spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-4">
              <div className="banner__item">
                <div className="banner__item__pic" style={{width: "30rem"}}>
                  <img src="/Client/assets/img/banner/banner-1.jpg" alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Shoes Collections 2025</h2>
                  <a href="#">Shop now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="banner__item banner__item--middle">
                <div className="banner__item__pic">
                  <img src="/Client/assets/img/banner/banner-2.jpg" alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Accessories</h2>
                  <a href="#">Shop now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="banner__item banner__item--last">
                <div className="banner__item__pic" style={{width: "30rem"}}>
                  <img src="/Client/assets/img/banner/banner-3.jpg" alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Trending Shoes 2025</h2>
                  <a href="#">Shop now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* //<!-- Banner Section End --> */}
    </>
  );
}
