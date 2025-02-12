import ProductSection from "../element/ProductSection";

export default function Home() {
  return (
    <>
        {/* //<!-- Hero Section Begin --> */}
        <section className="hero">
            <div className="hero__slider owl-carousel">
                <div className="hero__items set-bg" data-setbg="/Client/assets/img/hero/hero-1.jpg">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 col-lg-7 col-md-8">
                                <div className="hero__text">
                                    <h6>Summer Collection</h6>
                                    <h2>Fall - Winter Collections 2030</h2>
                                    <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering
                                    commitment to exceptional quality.</p>
                                    <a href="#" className="primary-btn">Shop now <span className="arrow_right"></span></a>
                                    <div className="hero__social">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero__items set-bg" data-setbg="/Client/assets/img/hero/hero-2.jpg">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 col-lg-7 col-md-8">
                                <div className="hero__text">
                                    <h6>Summer Collection</h6>
                                    <h2>Fall - Winter Collections 2030</h2>
                                    <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering
                                    commitment to exceptional quality.</p>
                                    <a href="#" className="primary-btn">Shop now <span className="arrow_right"></span></a>
                                    <div className="hero__social">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* //<!-- Hero Section End --> */}
      
        {/* //<!-- Banner Section Begin --> */}
        <section className="banner spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 offset-lg-4">
                        <div className="banner__item">
                            <div className="banner__item__pic">
                                <img src="/Client/assets/img/banner/banner-1.jpg" alt=""/>
                            </div>
                            <div className="banner__item__text">
                                <h2>Clothing Collections 2030</h2>
                                <a href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="banner__item banner__item--middle">
                            <div className="banner__item__pic">
                                <img src="/Client/assets/img/banner/banner-2.jpg" alt=""/>
                            </div>
                            <div className="banner__item__text">
                                <h2>Accessories</h2>
                                <a href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="banner__item banner__item--last">
                            <div className="banner__item__pic">
                                <img src="/Client/assets/img/banner/banner-3.jpg" alt=""/>
                            </div>
                            <div className="banner__item__text">
                                <h2>Shoes Spring 2030</h2>
                                <a href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* //<!-- Banner Section End --> */}
        
      <ProductSection />
    </>
  );
}
