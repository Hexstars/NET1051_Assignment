import { Outlet, Navigate } from "react-router-dom";
import { loadAdminAssets } from "../../../hook/useDynamicAssets";
import SideBar from "../../SideBar";
import NavBar from "../../NavBar";

export default function AdminLayout() {
  // Lấy thông tin người dùng từ localStorage
  const userData = localStorage.getItem("userInfo");
  const user = userData ? JSON.parse(userData) : null;

  // Kiểm tra nếu user không tồn tại hoặc không có quyền Admin
  if (!user || !user.roles.includes("Admin")) {
    return <Navigate to="/no-permission" replace />;
  }

  // Kiểm tra assets đã tải hay chưa
  const assetsLoaded = loadAdminAssets();
  if (!assetsLoaded) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <SideBar />
      <div className="main-panel">
        <div className="main-header">
          <NavBar />
        </div>
        <div className="container">
          <div className="page-inner">
            <Outlet /> {/* Hiển thị nội dung của Route con */}
          </div>
        </div>
      </div>
    </div>
  );
}
