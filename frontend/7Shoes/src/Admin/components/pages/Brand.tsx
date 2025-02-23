import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useDisclosure from "../../hook/useDisclosure";
import brandService, { BrandForViews } from "../../services/brandService";
import BrandForm from "../elements/Brands/BrandEditForm";
import BrandAddForm from "../elements/Brands/BrandAddForm";

const Brand = () => {
    // Khai báo state để lưu trữ danh sách thương hiệu và thông tin thương hiệu hiện tại
    const [Brands, setBrands] = useState<BrandForViews[]>([]);
    const [currentData, setCurrentData] = useState<BrandForViews>({} as BrandForViews);
    
    // Sử dụng hook để quản lý trạng thái mở/đóng của các form
    const { isOpen, isOpenAdd, onCloseAdd, onOpenAdd, onClose, onOpen } = useDisclosure();

    // Gọi loadData() khi component được mount
    useEffect(() => {
        loadData();
    }, []);

    // Hàm lấy thông tin thương hiệu theo id
    const getBrand = (id: string) => {
      brandService.getById(id)
            .then((res) => {
                console.log("Fetched brand data:", res);
                setCurrentData(res);
                onOpen();
            })
            .catch((err) => {
                console.log(err);
            });
    };

     // Hàm mở form thêm thương hiệu
    const AddForm = () => {
        onOpenAdd();
    };   

    // Hàm tải dữ liệu thương hiệu từ API
    const loadData = () => {
      brandService.getAll()
          .then((res) => {
              console.log("Brands data:", res);
              if (res && Array.isArray(res.brands)) {
                  setBrands(res.brands);
              } else {
                  console.error("API did not return an array:", res);
                  setBrands([]);
              }
          })
          .catch(error => {
              console.error("Error loading brands:", error);
              setBrands([]);
          });
  };
  
    
    // Hàm xử lý xóa thương hiệu
    const onDeleteHandle = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                brandService.remove(id)
                    .then(() => {
                        Swal.fire("Deleted!", "Your brand has been deleted.", "success");
                        loadData();
                    })
                    .catch((err) => {
                        console.error("Error deleting product:", err);
                        Swal.fire("Error!", "Failed to delete the brand. Please try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="container">
        <div className="d-flex justify-content-start mb-3">
            <button className="btn btn-success" onClick={() => AddForm()}>
                <i className="bi bi-plus-circle"></i> Thêm thương hiệu
            </button>
        </div>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th className="text-center text-white bg-dark">Mã thương hiệu</th>
                    <th className="text-center text-white bg-dark">Tên thương hiệu</th>
                    <th className="text-center text-white bg-dark">Ngày thêm</th>
                    <th className="text-center text-white bg-dark">Trạng thái</th>
                    <th className="text-center text-white bg-dark">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(Brands) && Brands.map((brand) => (
                    <tr key={brand.id}>
                        <td className="align-middle text-center">{brand.id}</td>
                        <td className="align-middle text-center">{brand.name}</td>
                        <td className="align-middle text-center">
                            {brand.createdDate ? new Date(brand.createdDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                        </td>
                        <td className={`align-middle text-center ${brand.isActive ? "text-success" : "text-danger"}`}>
                            {brand.isActive ? "Active" : "Inactive"}
                        </td>
                        <td className="align-middle text-center">
                            <button className="btn btn-sm btn-primary mx-1" onClick={() => getBrand(brand.id)}>
                                <i className="bi bi-pencil"></i> Sửa
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDeleteHandle(brand.id)}>
                                <i className="bi bi-trash"></i> Xóa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {isOpen && <BrandForm fetchBrand={loadData} isOpen={isOpen} onClose={onClose} currentData={currentData} />}
        {isOpenAdd && <BrandAddForm fetchBrand={loadData} isOpenAdd={isOpenAdd} onClose={onCloseAdd} />}
    </div>
    )
}

export default Brand;
