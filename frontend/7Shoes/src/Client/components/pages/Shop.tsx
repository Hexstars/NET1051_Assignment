import { useEffect, useState } from "react";
import productService, { ProductForViews } from "../../../Admin/services/productService";

const Shop = () => {
    const [Products, setProducts] = useState<ProductForViews[]>([]);

    // Hàm tải dữ liệu sản phẩm từ API
    const loadData = () => {
        productService.getAll()
            .then((res) => {
                console.log("API Response:", res);
                if (res && Array.isArray(res)) {
                    setProducts(res);
                } else {
                    console.error("API did not return an array:", res);
                    setProducts([]);
                }
            })
            .catch(error => {
                console.error("Error loading products:", error);
                setProducts([]);
            });
    };

    useEffect(() => {
        loadData();
    }, []);
    
    return (
        <>
            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="shop__sidebar">
                                <div className="shop__sidebar__search">
                                    <form action="#">
                                        <input type="text" placeholder="Search..."/>
                                        <button type="submit"><span className="icon_search"></span></button>
                                    </form>
                                </div>
                                <div className="shop__sidebar__accordion">
                                    <div className="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-heading">
                                                <a data-toggle="collapse" data-target="#collapseOne">Categories</a>
                                            </div>
                                            <div id="collapseOne" className="collapse show" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <div className="shop__sidebar__categories">
                                                        <ul className="nice-scroll">
                                                            <li><a href="#">Men (20)</a></li>
                                                            <li><a href="#">Women (20)</a></li>
                                                            <li><a href="#">Bags (20)</a></li>
                                                            <li><a href="#">Clothing (20)</a></li>
                                                            <li><a href="#">Shoes (20)</a></li>
                                                            <li><a href="#">Accessories (20)</a></li>
                                                            <li><a href="#">Kids (20)</a></li>
                                                            <li><a href="#">Kids (20)</a></li>
                                                            <li><a href="#">Kids (20)</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-heading">
                                                <a data-toggle="collapse" data-target="#collapseTwo">Branding</a>
                                            </div>
                                            <div id="collapseTwo" className="collapse show" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <div className="shop__sidebar__brand">
                                                        <ul>
                                                            <li><a href="#">Louis Vuitton</a></li>
                                                            <li><a href="#">Chanel</a></li>
                                                            <li><a href="#">Hermes</a></li>
                                                            <li><a href="#">Gucci</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-heading">
                                                <a data-toggle="collapse" data-target="#collapseThree">Filter Price</a>
                                            </div>
                                            <div id="collapseThree" className="collapse show" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <div className="shop__sidebar__price">
                                                        <ul>
                                                            <li><a href="#">$0.00 - $50.00</a></li>
                                                            <li><a href="#">$50.00 - $100.00</a></li>
                                                            <li><a href="#">$100.00 - $150.00</a></li>
                                                            <li><a href="#">$150.00 - $200.00</a></li>
                                                            <li><a href="#">$200.00 - $250.00</a></li>
                                                            <li><a href="#">250.00+</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-heading">
                                                <a data-toggle="collapse" data-target="#collapseFour">Size</a>
                                            </div>
                                            <div id="collapseFour" className="collapse show" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <div className="shop__sidebar__size">
                                                        <label htmlFor="xs">xs
                                                            <input type="radio" id="xs"/>/
                                                        </label>
                                                        <label htmlFor="sm">s
                                                            <input type="radio" id="sm"/>/
                                                        </label>
                                                        <label htmlFor="md">m
                                                            <input type="radio" id="md"/>/
                                                        </label>
                                                        <label htmlFor="xl">xl
                                                            <input type="radio" id="xl"/>/
                                                        </label>
                                                        <label htmlFor="2xl">2xl
                                                            <input type="radio" id="2xl"/>
                                                        </label>
                                                        <label htmlFor="xxl">xxl
                                                            <input type="radio" id="xxl"/>
                                                        </label>
                                                        <label htmlFor="3xl">3xl
                                                            <input type="radio" id="3xl"/>
                                                        </label>
                                                        <label htmlFor="4xl">4xl
                                                            <input type="radio" id="4xl"/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-heading">
                                                <a data-toggle="collapse" data-target="#collapseFive">Colors</a>
                                            </div>
                                            <div id="collapseFive" className="collapse show" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <div className="shop__sidebar__color">
                                                        <label className="c-1" htmlFor="sp-1">
                                                            <input type="radio" id="sp-1"/>
                                                        </label>
                                                        <label className="c-2" htmlFor="sp-2">
                                                            <input type="radio" id="sp-2"/>
                                                        </label>
                                                        <label className="c-3" htmlFor="sp-3">
                                                            <input type="radio" id="sp-3"/>
                                                        </label>
                                                        <label className="c-4" htmlFor="sp-4">
                                                            <input type="radio" id="sp-4"/>
                                                        </label>
                                                        <label className="c-5" htmlFor="sp-5">
                                                            <input type="radio" id="sp-5"/>
                                                        </label>
                                                        <label className="c-6" htmlFor="sp-6">
                                                            <input type="radio" id="sp-6"/>
                                                        </label>
                                                        <label className="c-7" htmlFor="sp-7">
                                                            <input type="radio" id="sp-7"/>
                                                        </label>
                                                        <label className="c-8" htmlFor="sp-8">
                                                            <input type="radio" id="sp-8"/>
                                                        </label>
                                                        <label className="c-9" htmlFor="sp-9">
                                                            <input type="radio" id="sp-9"/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-heading">
                                                <a data-toggle="collapse" data-target="#collapseSix">Tags</a>
                                            </div>
                                            <div id="collapseSix" className="collapse show" data-parent="#accordionExample">
                                                <div className="card-body">
                                                    <div className="shop__sidebar__tags">
                                                        <a href="#">Product</a>
                                                        <a href="#">Bags</a>
                                                        <a href="#">Shoes</a>
                                                        <a href="#">Fashio</a>
                                                        <a href="#">Clothing</a>
                                                        <a href="#">Hats</a>
                                                        <a href="#">Accessories</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="shop__product__option">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="shop__product__option__left">
                                            <p>Showing 1–12 of 126 results</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="shop__product__option__right">
                                            <p>Sort by Price:</p>
                                            <select>
                                                <option value="">Low To High</option>
                                                <option value="">$0 - $55</option>
                                                <option value="">$55 - $100</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="row product__filter">
                        {Products.length > 0 ? (
                            Products.map((product) => (
                                <div key={product.productId} className="col-lg-3 col-md-6 col-sm-6 mix best-salers">
                                    <div className="product__item">
                                        <div className="product__item__pic">
                                            <img 
                                                src={product.productImage || "/default-image.jpg"} 
                                                alt={product.productName} 
                                                className="img-fluid"
                                                style={{ width: "auto", height: "200px", objectFit: "cover", borderRadius: "10px" }}
                                            />
                                            <span className="label">New</span>
                                            <ul className="product__hover">
                                                <li>
                                                    <a href="#"><img src="/Client/assets/img/icon/search.png" alt=""/><span>Detail</span></a>
                                                </li>
                                                <li>
                                                    <a href="#"><img src="/Client/assets/img/icon/pay.png" style={{ width: "35px" }} alt=""/><span>Buy now</span></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text" style={{marginTop: "-5rem"}}>
                                            <h6>{product.productName}</h6>
                                            <a href="#" className="add-cart">+ Add To Cart</a>
                                            <h5>{product.basePrice ? product.basePrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "N/A"}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center w-100">Không có sản phẩm nào.</p>
                        )}
                    </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="product__pagination">
                                        <a className="active" href="#">1</a>
                                        <a href="#">2</a>
                                        <a href="#">3</a>
                                        <span>...</span>
                                        <a href="#">21</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Shop;
