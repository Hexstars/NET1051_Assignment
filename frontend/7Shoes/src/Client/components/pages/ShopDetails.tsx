import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService, { ProductItemForViews } from "../../services/productItemService";
import cartService, { AddToCart } from "../../services/cartService";
import Swal from "sweetalert2";

export default function ShopDetails() {
    const { productId } = useParams(); // Lấy productId từ URL
    const [product, setProduct] = useState<ProductItemForViews | null>(null);
    const [quantity, setQuantity] = useState<number>(1); // State for quantity

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

    // Hàm xử lý thêm sản phẩm
    const addToCart = (productItemId: string, quantity: number) => {
        const cartItem: AddToCart = {
            productItemId,
            quantity
        };

        cartService.add(cartItem)
            .then(() => {
                Swal.fire("Thành công!", "Sản phẩm đã được thêm vào giỏ hàng.", "success");
            })
            .catch(() => {
                Swal.fire("Lỗi!", "Không thể thêm vào giỏ hàng.", "error");
            });
    };


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
                                                src={product.image || "/default-image.jpg"}
                                                alt={product.productName}
                                                style={{
                                                    maxWidth: "80%",
                                                    maxHeight: "300px",
                                                    objectFit: "contain",
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
                                    <h3>{product.price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h3>

                                    {/* Quantity Input */}
                                    <div className="product__details__cart__option">
                                    <input
                                        type="number"
                                        className="form-control"
                                        style={{ width: "80px", display: "inline-block", marginRight: "10px" }}
                                        value={quantity} // Gán state quantity vào input
                                        onChange={(e) => {
                                            let newQuantity = Number(e.target.value);
                                            if (isNaN(newQuantity) || newQuantity < 1) {
                                                newQuantity = 1; // Nếu nhập không hợp lệ, đặt về 1
                                            } else if (newQuantity > 10) {
                                                newQuantity = 10; // Nếu lớn hơn 10, đặt về 10
                                            }
                                            setQuantity(newQuantity); // Cập nhật state
                                        }}
                                        min="1"
                                        max="10"
                                    />
                                        <button
                                            className="primary-btn"
                                            onClick={() => {
                                                if (productId) {
                                                    addToCart(productId, quantity);
                                                } else {
                                                    Swal.fire("Error!", "Product ID is missing.", "error");
                                                }
                                            }}
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>

                                    <div className="product__details__btns__option"></div>
                                    <div className="product__details__last__option"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
