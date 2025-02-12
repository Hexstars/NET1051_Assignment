// import logo from "../../Client/assets/img/logo.png";
// import searchIcon from "../../Client/assets/img/icon/search.png";
// import heartIcon from "../../Client/assets/img/icon/heart.png";
// import cartIcon from "../../Client/assets/img/icon/cart.png";

import { Link } from "react-router-dom";

export default function Header(){
    return(
        <>
            {/* Offcanvas Menu Begin */}
            <div className="offcanvas-menu-overlay"></div><div className="offcanvas-menu-wrapper">
                <div className="offcanvas__option">
                    <div className="offcanvas__links">
                        <a href="#">Sign in</a>
                        <a href="#">FAQs</a>
                    </div>
                    <div className="offcanvas__top__hover">
                        <span>Usd <i className="arrow_carrot-down"></i></span>
                        <ul>
                            <li>USD</li>
                            <li>EUR</li>
                            <li>USD</li>
                        </ul>
                    </div>
                </div>
                <div className="offcanvas__nav__option">
                    <a href="/"><img src="/Client/assets/img/search.png" alt="search" /></a>
                    <a href="/"><img src="/Client/assets/img/icon/heart.png" alt="" /></a>
                    <a href="/"><img src="/Client/assets/img/icon/cart.png" alt="" /> <span>0</span></a>
                    <div className="price">$0.00</div>
                </div>
                <div id="mobile-menu-wrap"></div>
                <div className="offcanvas__text">
                    <p>Free shipping, 30-day return or refund guarantee.</p>
                </div>
            </div>
            {/* //Offcanvas Menu End
            //Header Section Begin */}
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-7">
                                <div className="header__top__left">
                                    <p>Free shipping, 30-day return or refund guarantee.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-5">
                                <div className="header__top__right">
                                    <div className="header__top__links">
                                        <a href="#">Sign in</a>
                                        <a href="#">FAQs</a>
                                    </div>
                                    <div className="header__top__hover">
                                        <span>Usd <i className="arrow_carrot-down"></i></span>
                                        <ul>
                                            <li>USD</li>
                                            <li>EUR</li>
                                            <li>USD</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <div className="header__logo">
                                <a href="/"><img src="/Client/assets/img/logo.png" alt="Logo" /></a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <nav className="header__menu mobile-menu">
                                <ul>
                                    <li className="active"><Link to="/home">Home</Link></li>
                                    <li><Link to="/shop">Shop</Link></li>
                                    <li><a href="#">Pages</a>
                                        <ul className="dropdown">
                                            <li><Link to="/about-us">About Us</Link></li>
                                            <li><Link to="/shop-details">Shop Details</Link></li>
                                            <li><Link to="/shopping-cart">Shopping Cart</Link></li>
                                            <li><Link to="/check-out">Check Out</Link></li>
                                            <li><Link to="/blog-details">Blog Details</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/blog">Blog</Link></li>
                                    <li><Link to="/contact">Contacts</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="header__nav__option">
                                <a href="/"><img src="/Client/assets/img/icon/search.png" alt="search" /></a>
                                <a href="/"><img src="/Client/assets/img/icon/heart.png" alt="" /></a>
                                <a href="/"><img src="/Client/assets/img/icon/cart.png" alt="" /> <span>0</span></a>
                                <div className="price">$0.00</div>
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open"><i className="fa fa-bars"></i></div>
                </div>
            </header></>
        //Header Section End
    );
}