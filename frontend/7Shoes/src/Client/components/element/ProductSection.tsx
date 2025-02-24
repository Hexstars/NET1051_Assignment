import { useEffect, useState } from "react";
import productService, { ProductItemForViews } from "../../services/productItemService";
import { Link } from "react-router-dom";

const ProductSection = () => {
    const [Products, setProducts] = useState<ProductItemForViews[]>([]);

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
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="filter__controls">
                                <li className="active" data-filter=".hot-sales">Hot Sales</li>
                            </ul>
                        </div>
                    </div>

                    <div className="row product__filter">
                        {Products.length > 0 ? (
                            Products.filter(product => product.isActive).slice(0, 8).map((product) => ( 
                                <div key={product.productId} className="col-lg-3 col-md-6 col-sm-6 mix hot-sales">
                                    <div className="product__item">
                                        <div className="product__item__pic">
                                            <img 
                                                src={product.image || "/default-image.jpg"} 
                                                alt={product.productName} 
                                                className="img-fluid"
                                                style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }}
                                            />
                                            <span className="label">New</span>
                                            <ul className="product__hover">
                                                <li>
                                                    <Link to={`/shop-details/${product.id}`}>
                                                        <img src="/Client/assets/img/icon/search.png" alt=""/>
                                                        <span>Detail</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a href="#"><img src="/Client/assets/img/icon/pay.png" style={{ width: "35px" }} alt=""/><span>Buy now</span></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6>{product.productName}</h6>
                                            <a href="#" className="add-cart">+ Add To Cart</a>
                                            <h5>{product.price ? product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "N/A"}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center w-100">Không có sản phẩm nào.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductSection;
