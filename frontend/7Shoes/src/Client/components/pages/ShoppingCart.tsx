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
                //console.log("API Response:", res, typeof res);

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
    //Thay vì cập nhật CartItems ngay lập tức, ta lưu số lượng mới vào một state tạm thời.
    const [updatedQuantities, setUpdatedQuantities] = useState<{ [key: string]: number }>({});

    //Khi người dùng nhập số lượng mới, chỉ lưu vào state updatedQuantities.
    const handleQuantityChange = (productItemId: string, newQuantity: number) => {
        setUpdatedQuantities(prev => ({ ...prev, [productItemId]: newQuantity }));
    };

    //Hàm xử lí cập nhật giỏ hàng
    const updateCart = () => {
        const updatePromises = Object.keys(updatedQuantities).map(productItemId => {
            return cartService.updateQuantity({
                productItemId: productItemId,
                quantity: updatedQuantities[productItemId]
            });
        });

        // Wait for all updates to finish, then reload the cart
        Promise.all(updatePromises).then(() => {
            console.log("All updates finished, reloading cart...");
            loadData();  // Refresh cart data after updating
        }).catch(error => {
            console.error("Error updating cart:", error);
        });
    };
    const subtotal = CartItems.reduce((acc, item) => acc + item.total, 0);

    // Hàm xử lý xóa sản phẩm
    const onDeleteHandle = (id: string) => {
        Swal.fire({
            title: "Xóa sản phẩm?",
            text: "Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                cartService.remove(id)
                    .then(() => {
                        Swal.fire("Xóa thành công!", "Đã xóa sản phẩm khỏi giỏ hàng.", "success");
                        loadData();
                    })
                    .catch((err) => {
                        console.error("Error deleting product:", err);
                        Swal.fire("Error!", "Failed to delete the cart item. Please try again.", "error");
                    });
            }
        });
    };
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
                                            <tr key={item.productItemId}>
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
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        style={{ width: "70px" }}
                                                        value={updatedQuantities[item.productItemId] ?? item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.productItemId, Number(e.target.value))}
                                                        min="1"
                                                        max="10"
                                                    />
                                                </td>
                                                <td className="cart__price">{item.total} VNĐ</td>
                                                <td className="cart__close" 
                                                    style={{cursor:"pointer"}}
                                                    onClick={() => onDeleteHandle(item.productItemId)}>
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
                                        <button onClick={updateCart} className="btn btn-primary">
                                            <i className="fa fa-spinner"></i> Cập nhật
                                        </button>
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
                                    {/* <li>Tạm tính <span>{subtotal} VNĐ</span></li> */}
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