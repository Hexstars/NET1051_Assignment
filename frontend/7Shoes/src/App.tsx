import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./Admin/layouts/pages/Authentication/LogIn";
import Home from "./Admin/layouts/pages/Home/Home";
import DashBoard from "./Admin/components/Sidebar/DashBoard";
import Category from "./Admin/components/Sidebar/Category";
import Order from "./Admin/components/Sidebar/Order";
import Product from "./Admin/components/Sidebar/Product";
import Customer from "./Admin/components/Sidebar/Customer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Các route không nằm trong layout*/}

        <Route path="/" element={<LogIn />} />
        <Route path="/log-in" element={<LogIn />} />

        {/*Các route con nằm trong layout*/}
        <Route path="/admin" element={<Home />}>
          <Route index element={<DashBoard />} />
          <Route path="dash-board" element={<DashBoard />} />
          <Route path="category" element={<Category />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Order />} />
          <Route path="customer" element={<Customer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
