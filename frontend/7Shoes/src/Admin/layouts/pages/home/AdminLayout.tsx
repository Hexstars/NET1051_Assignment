import { Outlet } from "react-router-dom";
import { loadAdminAssets } from "../../../hook/useDynamicAssets";
import SideBar from "../../SideBar";
import NavBar from "../../NavBar";

export default function AdminLayout() {
  //hàm kiểm tra assets đã load hay chưa
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
