import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService, { ProductForViews } from "../../../Admin/services/productService";

export default function ShopDetails() {
    const { productId } = useParams(); // Lấy productId từ URL
    const [product, setProduct] = useState<ProductForViews | null>(null);

    useEffect(() => {
        if (productId) {
            productService.getById(productId) // Gọi API lấy dữ liệu sản phẩm
                .then(res => setProduct(res))
                .catch(err => console.error("Error fetching product details:", err));
        }
    }, [productId]);

    if (!product) {
        return <p className="text-center">Đang tải dữ liệu...</p>;
    }

    return (
        <>
            <section className="shop-details" style={{ marginTop: "9rem" }}>
                <div className="product__details__pic">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3"></div>
                            <div className="col-lg-6 col-md-9">
                                <div className="tab-content">
                                    <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div className="product__details__pic__item">
                                        <img 
                                            src={product.productImage || "/default-image.jpg"} 
                                            alt={product.productName}
                                            style={{
                                                maxWidth: "80%",  // Giới hạn chiều rộng ảnh
                                                maxHeight: "300px", // Giới hạn chiều cao ảnh
                                                objectFit: "contain", // Giữ nguyên tỷ lệ ảnh
                                                borderRadius: "10px"
                                            }} 
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product__details__content">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <div className="product__details__text">
                                    <h4>{product.productName}</h4>
                                    <h3>{product.basePrice?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h3>
                                    <p>{product.description}</p>
                                    <div className="product__details__cart__option">
                                        <a href="#" className="primary-btn">add to cart</a>
                                    </div>
                                    <div className="product__details__btns__option">
                                        <a href="#"><i className="fa fa-heart"></i> add to wishlist</a>
                                        <a href="#"><i className="fa fa-exchange"></i> Add To Compare</a>
                                    </div>
                                    <div className="product__details__last__option">
                                        <h5><span>Guaranteed Safe Checkout</span></h5>
                                        <img src="/Client/assets/img/shop-details/details-payment.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="related spad">

            </section>
        </>
    );
}
