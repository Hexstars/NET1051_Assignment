export default function Contact(){
    return(
        <>
            {/* <!-- Map Begin --> */}
            <div className="map" style={{ marginTop: "9 rem" }}>
                <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1ZGwtlbqZg0wHWQR1-7WE1W1aeWHsfDU&ehbc=2E312F"
                width="640"
                height="480"
                ></iframe>
            </div>
            {/* <!-- Map End --> */}

            {/* <!-- Contact Section Begin --> */}
            <section className="contact spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="contact__text">
                                <div className="section-title">
                                    <span>Information</span>
                                    <h2>Contact Us</h2>
                                    <p>As you might expect of a company that began as a high-end interiors contractor, we pay
                                        strict attention.</p>
                                </div>
                                <ul>
                                    <li>
                                        <h4>FPT Polytechnic</h4>
                                        <p>QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh <br />+84 24 6327 6402</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="contact__form">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <input type="text" placeholder="Name"/>
                                        </div>
                                        <div className="col-lg-6">
                                            <input type="text" placeholder="Email"/>
                                        </div>
                                        <div className="col-lg-12">
                                            <textarea placeholder="Message"></textarea>
                                            <button type="submit" className="site-btn">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Contact Section End --> */}
        </>
    );
}