import { Outlet } from "react-router-dom";
import { useLoading } from "../../../hook/useLoading"; 
import { useDynamicAssets } from "../../../hook/useDynamicAssets";
import Header from "../../Header";
import Footer from "../Footer";

export default function ClientLayout() {
  const loading = useLoading(); // Sử dụng trạng thái loading
  const assetsLoaded = useDynamicAssets();

  return (
    <>
      {/* Hiển thị preloader khi đang tải */}
      {(loading || !assetsLoaded) && (
        <div id="preloder">
          <div className="loader"></div>
        </div>
      )}

      {/* Chỉ hiển thị nội dung khi đã tải xong */}
      {!loading && assetsLoaded && (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
