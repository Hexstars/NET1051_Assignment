import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./Admin/layouts/pages/Authentication/LogIn";
import AdminLayout from "./Admin/layouts/pages/home/AdminLayout";
import DashBoard from "./Admin/components/Sidebar/DashBoard";
import Category from "./Admin/components/Sidebar/Category";
import Order from "./Admin/components/Sidebar/Order";
import Product from "./Admin/components/Sidebar/Product";
import Customer from "./Admin/components/Sidebar/Customer";

import ClientLayout from "./Client/layouts/pages/home/ClientLayout";
import Home from "./Client/components/pages/Home"
import Shop from "./Client/components/pages/Shop";
import About from "./Client/components/pages/About";
import ShopDetails from "./Client/components/pages/ShopDetails";
import ShoppingCart from "./Client/components/pages/ShoppingCart";
import CheckOut from "./Client/components/pages/CheckOut";
import BlogDetails from "./Client/components/pages/BlogDetails";
import Blog from "./Client/components/pages/Blog";
import Contact from "./Client/components/pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Các route không nằm trong layout*/}
        <Route path="/log-in" element={<LogIn />} />

        {/*Các route con nằm trong layout Admin*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="dash-board" element={<DashBoard />} />
          <Route path="category" element={<Category />} />
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
