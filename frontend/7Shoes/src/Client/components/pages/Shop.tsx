import { useEffect, useState } from "react";
import productService, { ProductForViews } from "../../../Admin/services/productService";
import { Link } from "react-router-dom";
import brandService from "../../../Admin/services/brandService";

const Shop = () => {
    const [products, setProducts] = useState<ProductForViews[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        // Gọi API lấy danh sách thương hiệu
        brandService.getAll()
        .then((res) => {
            console.log("Brands data:", res);
            if (res && Array.isArray(res.brands)) {
                setBrands(res.brands);
            } else {
                console.error("API did not return an array:", res);
                setBrands([]);
            }
        })
        .catch(error => {
            console.error("Error loading brands:", error);
            setBrands([]);
        });
    }, []);

    useEffect(() => {
        // Gọi API lấy sản phẩm theo thương hiệu
        const loadData = async () => {
            try {
                const res = selectedBrand
                    ? await productService.getProductsByBrandId(selectedBrand)
                    : await productService.getAll();
                setProducts(Array.isArray(res) ? res : []);
            } catch (err) {
                console.error("Lỗi khi gọi API:", err);
                setProducts([]);
            }
        };
        loadData();
    }, [selectedBrand]);
    
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
                                                        <li><a href="#" onClick={(e) => { e.preventDefault(); setSelectedBrand(null); }}>Tất cả</a></li>
                                                        {brands.map((brand) => (
                                                            <li key={brand.id}>
                                                                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedBrand(brand.id); }}>
                                                                    {brand.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
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
                        {products.length > 0 ? (
                            products.map((product) => (
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
                                                    <Link to={`/shop-details/${product.productId}`}>
                                                        <img src="/Client/assets/img/icon/search.png" alt=""/>
                                                        <span>Detail</span>
                                                    </Link>                                               
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
                            <p className="text-center"><strong>Không có sản phẩm nào.</strong></p>
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
