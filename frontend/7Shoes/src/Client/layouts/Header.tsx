// import logo from "../../Client/assets/img/logo.png";
// import searchIcon from "../../Client/assets/img/icon/search.png";
// import heartIcon from "../../Client/assets/img/icon/heart.png";
// import cartIcon from "../../Client/assets/img/icon/cart.png";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/reducers/auth";
const Header = () => {

    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const signOut = (e: any) => {
        e.preventDefault();
        localStorage.removeItem("userInfo");
        dispatch(logout());
        navigate('/');
    }
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    return (
        <>
        
        <header className="header fixed-top" style={{ backgroundColor: "#f0f0f0" }}>
            <div className="header__top d-flex align-items-center" style={{ height: "4rem" }}>
                <div className="container">
                    <div className="row w-100 align-items-center">
                        {/* Logo sát trái */}
                        <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-start">
                            <div className="header__logo">
                                <a href="/">
                                    <img src="/Client/assets/img/logo_1.png" alt="Logo" style={{ height: "35px" }} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-5 d-flex justify-content-start">
                            {/* <div className="header__top__left">
                                    <p style={{ fontSize: "14px", margin: "0" }}>Free shipping, 30-day return or refund guarantee</p>
                                </div> */}
                        </div>
                        {!isLoggedIn ? (
                            <div className="col-lg-3 col-md-4 d-flex justify-content-end">
                            <div className="header__top__right">
                                <div className="header__top__links">
                                    <Link to="/user-login" style={{ fontSize: "14px" }}>ĐĂNG NHẬP</Link>
                                    <Link to="/user-register" style={{ fontSize: "14px", marginLeft: "10px" }}>ĐĂNG KÝ</Link>
                                </div>
                            </div>
                        </div>
                        ):(
                            <div className="col-lg-3 col-md-4 d-flex justify-content-end">
                            <div className="header__top__right">
                                <div className="header__top__links">
                                <a href="/" onClick={signOut} style={{ fontSize: "14px", marginLeft: "10px" }}>ĐĂNG XUẤT</a>
                                </div>
                            </div>
                        </div>
                        )}
                        
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3">

                    </div>
                    <div className="col-lg-6 col-md-6">
                        <nav className="header__menu mobile-menu">
                            <ul>
                                <li className="active"><Link to="/home">Home</Link></li>
                                <li><Link to="/shop">Shop</Link></li>
                                <li><Link to="/about-us">About us</Link></li>
                                <li><Link to="/blog">Blog</Link>
                                    <ul className="dropdown">
                                        <li><Link to="/blog-details">Blog Details</Link></li>
                                        <li><Link to="/shop-details">Shop Details</Link></li>
                                        <li><Link to="/check-out">Check out</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className="header__nav__option">
                            <a href="#" className="search-switch">
                                <img src="/Client/assets/img/icon/search.png" alt="" />
                            </a>
                            <Link to="/shopping-cart">
                                <div style={{ marginRight: "20px", fontSize: "16px", color: "#333333", cursor: "pointer", position: "relative" }}>
                                    <i className="fas fa-shopping-cart cart"></i>
                                    {/* <span style={{ position: "absolute", top: "-21px", right: "-10px", backgroundColor: "red", color: "white", borderRadius: "50%", padding: "3px 7px", fontSize: "12px" }}>
                                        3
                                    </span> */}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="canvas__open"><i className="fa fa-bars"></i></div>
            </div>
        </header>
        </>
    );
}
export default Header