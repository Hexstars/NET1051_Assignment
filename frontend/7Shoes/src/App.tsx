import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Admin/layouts/pages/Authentication/Login";
import AdminLayout from "./Admin/layouts/pages/home/AdminLayout";
import DashBoard from "./Admin/components/pages/DashBoard";
import Category from "./Admin/components/pages/Category";
import Order from "./Admin/components/pages/Order";
import Product from "./Admin/components/pages/Product";
import Customer from "./Admin/components/pages/Customer";

import UserLogin from "./Client/layouts/pages/Authentication/Login";
import Register from "./Client/layouts/pages/Authentication/Register";
import ClientLayout from "./Client/layouts/pages/home/ClientLayout";
import Home from "./Client/components/pages/Home";
import Shop from "./Client/components/pages/Shop";
import About from "./Client/components/pages/About";
import ShopDetails from "./Client/components/pages/ShopDetails";
import ShoppingCart from "./Client/components/pages/ShoppingCart";
import CheckOut from "./Client/components/pages/CheckOut";
import BlogDetails from "./Client/components/pages/BlogDetails";
import Blog from "./Client/components/pages/Blog";
import Contact from "./Client/components/pages/Contact";
import Brand from "./Admin/components/pages/Brand";
import Color from "./Admin/components/pages/Color";
import Size from "./Admin/components/pages/Size";
import Material from "./Admin/components/pages/Material";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Các route không nằm trong layout*/}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<Register />} />

        {/*Các route con nằm trong layout Admin*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="dash-board" element={<DashBoard />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />} />
          <Route path="color" element={<Color />} />
          <Route path="size" element={<Size />} />
          <Route path="material" element={<Material />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Order />} />
          <Route path="customer" element={<Customer />} />
        </Route>

        {/*Các route nằm trong Client*/}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about-us" element={<About />} />
          <Route path="shop-details" element={<ShopDetails />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
          <Route path="check-out" element={<CheckOut />} />
          <Route path="blog-details" element={<BlogDetails />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
