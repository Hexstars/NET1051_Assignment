export default function BlogDetails(){
    return(
        <>
            {/* <!-- Blog Details Hero Begin --> */}
            <section className="blog-hero spad" style={{ marginTop: "9rem" }}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-9 text-center">
                            <div className="blog__hero__text">
                                <h2>Are you one of the thousands of Iphone owners who has no idea</h2>
                                <ul>
                                    <li>By Deercreative</li>
                                    <li>February 21, 2019</li>
                                    <li>8 Comments</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Blog Details Hero End --> */}

            {/* <!-- Blog Details Section Begin --> */}
            <section className="blog-details spad">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-12">
                            <div className="blog__details__pic">
                                <img src="/Client/assets/img/blog/details/background2.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="blog__details__content">
                                <div className="blog__details__share">
                                    <span>share</span>
                                    <ul>
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#" className="youtube"><i className="fa fa-youtube-play"></i></a></li>
                                        <li><a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                                <div className="blog__details__text">
                                    <p>Hydroderm is the highly desired anti-aging cream on the block. This serum restricts the
                                        occurrence of early aging sings on the skin and keeps the skin younger, tighter and
                                        healthier. It reduces the wrinkles and loosening of skin. This cream nourishes the skin
                                        and brings back the glow that had lost in the run of hectic years.</p>
                                    <p>The most essential ingredient that makes hydroderm so effective is Vyo-Serum, which is a
                                        product of natural selected proteins. This concentrate works actively in bringing about
                                        the natural youthful glow of the skin. It tightens the skin along with its moisturizing
                                        effect on the skin. The other important ingredient, making hydroderm so effective is
                                        “marine collagen” which along with Vyo-Serum helps revitalize the skin.</p>
                                </div>
                                <div className="blog__details__quote">
                                    <i className="fa fa-quote-left"></i>
                                    <p>“When designing an advertisement for a particular product many things should be
                                        researched like where it should be displayed.”</p>
                                    <h6>_ John Smith _</h6>
                                </div>
                                <div className="blog__details__text">
                                    <p>Vyo-Serum along with tightening the skin also reduces the fine lines indicating aging of
                                        skin. Problems like dark circles, puffiness, and crow’s feet can be control from the
                                        strong effects of this serum.</p>
                                    <p>Hydroderm is a multi-functional product that helps in reducing the cellulite and giving
                                        the body a toned shape, also helps in cleansing the skin from the root and not letting
                                        the pores clog, nevertheless also let’s sweeps out the wrinkles and all signs of aging
                                        from the sensitive near the eyes.</p>
                                </div>
                                <div className="blog__details__option">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="blog__details__author">
                                                <div className="blog__details__author__pic">
                                                    <img src="/Client/assets/img/blog/details/blog-author.jpg" alt=""/>
                                                </div>
                                                <div className="blog__details__author__text">
                                                    <h5>Aiden Blair</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="blog__details__tags">
                                                <a href="#">#Fashion</a>
                                                <a href="#">#Trending</a>
                                                <a href="#">#2020</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog__details__btns">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <a href="" className="blog__details__btns__item">
                                                <p><span className="arrow_left"></span> Previous Pod</p>
                                                <h5>It S Classified How To Utilize Free Classified Ad Sites</h5>
                                            </a>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <a href="" className="blog__details__btns__item blog__details__btns__item--next">
                                                <p>Next Pod <span className="arrow_right"></span></p>
                                                <h5>Tips For Choosing The Perfect Gloss For Your Lips</h5>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog__details__comment">
                                    <h4>Leave A Comment</h4>
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-4">
                                                <input type="text" placeholder="Name"/>
                                            </div>
                                            <div className="col-lg-4 col-md-4">
                                                <input type="text" placeholder="Email"/>
                                            </div>
                                            <div className="col-lg-4 col-md-4">
                                                <input type="text" placeholder="Phone"/>
                                            </div>
                                            <div className="col-lg-12 text-center">
                                                <textarea placeholder="Comment"></textarea>
                                                <button type="submit" className="site-btn">Post Comment</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Blog Details Section End --> */}
        </>
    );
}