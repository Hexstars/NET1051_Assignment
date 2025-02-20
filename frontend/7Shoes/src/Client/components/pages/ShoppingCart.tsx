export default function ShoppingCart(){
    return(
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
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="product__cart__item">
                                                <div className="product__cart__item__pic">
                                                    <img src="/Client/assets/img/shopping-cart/cart-1.jpg" alt=""/>
                                                </div>
                                                <div className="product__cart__item__text">
                                                    <h6>T-shirt Contrast Pocket</h6>
                                                    <h5>$98.49</h5>
                                                </div>
                                            </td>
                                            <td className="quantity__item">
                                                <div className="quantity">
                                                    <div className="pro-qty-2">
                                                        <input type="text" value="1"/>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="cart__price">$ 30.00</td>
                                            <td className="cart__close"><i className="fa fa-close"></i></td>
                                        </tr>
                                        <tr>
                                            <td className="product__cart__item">
                                                <div className="product__cart__item__pic">
                                                    <img src="/Client/assets/img/shopping-cart/cart-2.jpg" alt=""/>
                                                </div>
                                                <div className="product__cart__item__text">
                                                    <h6>Diagonal Textured Cap</h6>
                                                    <h5>$98.49</h5>
                                                </div>
                                            </td>
                                            <td className="quantity__item">
                                                <div className="quantity">
                                                    <div className="pro-qty-2">
                                                        <input type="text" value="1"/>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="cart__price">$ 32.50</td>
                                            <td className="cart__close"><i className="fa fa-close"></i></td>
                                        </tr>
                                        <tr>
                                            <td className="product__cart__item">
                                                <div className="product__cart__item__pic">
                                                    <img src="/Client/assets/img/shopping-cart/cart-3.jpg" alt=""/>
                                                </div>
                                                <div className="product__cart__item__text">
                                                    <h6>Basic Flowing Scarf</h6>
                                                    <h5>$98.49</h5>
                                                </div>
                                            </td>
                                            <td className="quantity__item">
                                                <div className="quantity">
                                                    <div className="pro-qty-2">
                                                        <input type="text" value="1"/>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="cart__price">$ 47.00</td>
                                            <td className="cart__close"><i className="fa fa-close"></i></td>
                                        </tr>
                                        <tr>
                                            <td className="product__cart__item">
                                                <div className="product__cart__item__pic">
                                                    <img src="/Client/assets/img/shopping-cart/cart-4.jpg" alt=""/>
                                                </div>
                                                <div className="product__cart__item__text">
                                                    <h6>Basic Flowing Scarf</h6>
                                                    <h5>$98.49</h5>
                                                </div>
                                            </td>
                                            <td className="quantity__item">
                                                <div className="quantity">
                                                    <div className="pro-qty-2">
                                                        <input type="text" value="1"/>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="cart__price">$ 30.00</td>
                                            <td className="cart__close"><i className="fa fa-close"></i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="continue__btn">
                                        <a href="#">Continue Shopping</a>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="continue__btn update__btn">
                                        <a href="#"><i className="fa fa-spinner"></i> Update cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cart__discount">
                                <h6>Discount codes</h6>
                                <form action="#">
                                    <input type="text" placeholder="Coupon code"/>
                                    <button type="submit">Apply</button>
                                </form>
                            </div>
                            <div className="cart__total">
                                <h6>Cart total</h6>
                                <ul>
                                    <li>Subtotal <span>$ 169.50</span></li>
                                    <li>Total <span>$ 169.50</span></li>
                                </ul>
                                <a href="#" className="primary-btn">Proceed to checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Shopping Cart Section End --> */}
        </>
    );
}