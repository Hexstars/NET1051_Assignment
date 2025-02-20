export default function About(){
    return(
        <>      
            {/* <!-- About Section Begin --> */}
            <section className="about spad" style={{ marginTop: "7rem" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="about__pic">
                                <img src="/Client/assets/img/about/about-us.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="about__item">
                                <h4>Who We Are ?</h4>
                                <p>Contextual advertising programs sometimes have strict policies that need to be adhered too.
                                Let’s take Google as an example.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="about__item">
                                <h4>Who We Do ?</h4>
                                <p>In this digital generation where information can be easily obtained within seconds, business
                                cards still have retained their importance.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="about__item">
                                <h4>Why Choose Us</h4>
                                <p>A two or three storey house is the ideal way to maximise the piece of earth on which our home
                                sits, but for older or infirm people.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- About Section End --> */}

            {/* <!-- Testimonial Section Begin --> */}
            <section className="testimonial">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div className="testimonial__text">
                                <span className="icon_quotations"></span>
                                <p>“Going out after work? Take your butane curling iron with you to the office, heat it up,
                                    style your hair before you leave the office and you won’t have to make a trip back home.”
                                </p>
                                <div className="testimonial__author">
                                    <div className="testimonial__author__pic">
                                        <img src="/Client/assets/img/about/testimonial-author.jpg" alt=""/>
                                    </div>
                                    <div className="testimonial__author__text">
                                        <h5>Augusta Schultz</h5>
                                        <p>Fashion Design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 p-0">
                            <div className="testimonial__pic set-bg" data-setbg="img/about/testimonial-pic.jpg"></div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Testimonial Section End --> */}

            {/* <!-- Counter Section Begin --> */}
            <section className="counter spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">102</h2>
                                </div>
                                <span>Our <br />Clients</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">30</h2>
                                </div>
                                <span>Total <br />Categories</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">102</h2>
                                </div>
                                <span>In <br />Country</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">98</h2>
                                    <strong>%</strong>
                                </div>
                                <span>Happy <br />Customer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Counter Section End --> */}

            {/* <!-- Team Section Begin --> */}
            <section className="team spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>Our Team</span>
                                <h2>Meet Our Team</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="team__item">
                                <img src="/Client/assets/img/about/team-1.jpg" alt="" />
                                <h4>John Smith</h4>
                                <span>Fashion Design</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="team__item">
                                <img src="/Client/assets/img/about/team-2.jpg" alt=""/>
                                <h4>Christine Wise</h4>
                                <span>C.E.O</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="team__item">
                                <img src="/Client/assets/img/about/team-3.jpg" alt="" />
                                <h4>Sean Robbins</h4>
                                <span>Manager</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="team__item">
                                <img src="/Client/assets/img/about/team-4.jpg" alt="" />
                                <h4>Lucy Myers</h4>
                                <span>Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Team Section End --> */}

            {/* <!-- Client Section Begin --> */}
            <section className="clients spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>Partner</span>
                                <h2>Happy Clients</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="#" className="client__item"><img src="/Client/assets/img/clients/client-1.png" alt=""/></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="#" className="client__item"><img src="/Client/assets/img/clients/client-2.png" alt=""/></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="#" className="client__item"><img src="/Client/assets/img/clients/client-3.png" alt=""/></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="#" className="client__item"><img src="/Client/assets/img/clients/client-4.png" alt=""/></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="#" className="client__item"><img src="/Client/assets/img/clients/client-5.png" alt=""/></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="#" className="client__item"><img src="/Client/assets/img/clients/client-6.png" alt=""/></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="#" className="client__item"><img src="/Client/assets/img/clients/client-7.png" alt=""/></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="#" className="client__item"><img src="/Client/assets/img/clients/client-8.png" alt=""/></a>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Client Section End --> */}
        </>
    );
}