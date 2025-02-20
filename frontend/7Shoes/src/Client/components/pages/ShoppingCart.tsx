import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import cartService, { CartForViews } from "../../services/cartService";
//import useDisclosure from "../../hook/useDisclosure";
const ShoppingCart = () => {
    // Khai báo state để lưu trữ danh sách danh mục và thông tin danh mục hiện tại
    const [CartItems, setCartItems] = useState<CartForViews[]>([]);

    // Gọi loadData() khi component được mount
    useEffect(() => {
        loadData();
    }, []);

    // Hàm tải dữ liệu giỏ hàng từ API
    const loadData = () => {
        cartService.getAll()
            .then((res) => {
                console.log("API Response:", res, typeof res);

                // Kiểm tra và cập nhật state nếu API trả về mảng
                if (res && Array.isArray(res)) {
                    setCartItems(res);
                } else {
                    console.error("API did not return an array:", res);
                    setCartItems([]);
                }
            })
            .catch(error => {
                console.error("Error loading categories:", error);
                setCartItems([]);
            });
    };
    const subtotal = CartItems.reduce((acc, item) => acc + item.total, 0);

    // Hàm xử lý xóa danh mục
    // const onDeleteHandle = (id: string) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#d33",
    //         cancelButtonColor: "#3085d6",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             cartService.remove(id)
    //                 .then(() => {
    //                     Swal.fire("Deleted!", "Your cart has been deleted.", "success");
    //                     loadData();
    //                 })
    //                 .catch((err) => {
    //                     console.error("Error deleting product:", err);
    //                     Swal.fire("Error!", "Failed to delete the cart item. Please try again.", "error");
    //                 });
    //         }
    //     });
    // };
    return (
        <>
            {/* <!-- Shopping Cart Section Begin --> */}
            <section className="shopping-cart spad" style={{ marginTop: "7rem" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="shopping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Tổng</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(CartItems) && CartItems.map((item) => (
                                            <tr>
                                                <td className="product__cart__item">
                                                    <div className="product__cart__item__pic">
                                                        <img src="/Client/assets/img/shopping-cart/cart-1.jpg" alt="" />
                                                    </div>
                                                    <div className="product__cart__item__text">
                                                        <h6>{item.productName}</h6>
                                                        <h5>{item.unitPrice} VNĐ</h5>
                                                    </div>
                                                </td>
                                                <td className="quantity__item">
                                                    <div className="quantity">
                                                        <div className="pro-qty-2">
                                                            <input type="text" value={item.quantity} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="cart__price">{item.total} VNĐ</td>
                                                <td className="cart__close">
                                                    {/* <button className="btn btn-sm btn-danger" onClick={() => onDeleteHandle(item.productItemId)}>
                                                <i className="fa fa-close"></i> Xóa
                                            </button> */}
                                                    <i className="fa fa-close"></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    {/* <div className="continue__btn">
                                        <a href="#">Continue Shopping</a>
                                    </div> */}
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="continue__btn update__btn">
                                        <a href="#"><i className="fa fa-spinner"></i> Update cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {/* <div className="cart__discount">
                                <h6>Discount codes</h6>
                                <form action="#">
                                    <input type="text" placeholder="Coupon code"/>
                                    <button type="submit">Apply</button>
                                </form>
                            </div> */}
                            <div className="cart__total">
                                <h6>Tổng giỏ hàng</h6>
                                <ul>
                                    <li>Tạm tính <span>{subtotal} VNĐ</span></li>
                                    <li>Tổng tiền <span>{subtotal} VNĐ</span></li>
                                </ul>
                                <a href="#" className="primary-btn">Đặt hàng</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Shopping Cart Section End --> */}
        </>
    );
}
export default ShoppingCart;