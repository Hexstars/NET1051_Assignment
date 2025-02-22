import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useDisclosure from "../../hook/useDisclosure";
import sizeService, { SizeForViews } from "../../services/sizeService";
import SizeForm from "../elements/Sizes/SizeEditForm";
import SizeAddForm from "../elements/Sizes/SizeAddForm";

const Size = () => {
    // Khai báo state để lưu trữ danh sách size và thông tin size hiện tại
    const [Sizes, setSizes] = useState<SizeForViews[]>([]);
    const [currentData, setCurrentData] = useState<SizeForViews>({} as SizeForViews);
    
    // Sử dụng hook để quản lý trạng thái mở/đóng của các form
    const { isOpen, isOpenAdd, onCloseAdd, onOpenAdd, onClose, onOpen } = useDisclosure();

    // Gọi loadData() khi component được mount
    useEffect(() => {
        loadData();
    }, []);

    // Hàm lấy thông tin size theo id
    const getSize = (id: string) => {
      sizeService.getById(id)
            .then((res) => {
                console.log("Fetched size data:", res);
                setCurrentData(res);
                onOpen();
            })
            .catch((err) => {
                console.log(err);
            });
    };

     // Hàm mở form thêm size
    const AddForm = () => {
        onOpenAdd();
    };   

    // Hàm tải dữ liệu color từ API
    const loadData = () => {
      sizeService.getAll()
          .then((res) => {
              console.log("Sizes data:", res);
              if (res && Array.isArray(res)) {
                  setSizes(res);
              } else {
                  console.error("API did not return an array:", res);
                  setSizes([]);
              }
          })
          .catch(error => {
              console.error("Error loading sizes:", error);
              setSizes([]);
          });
  };
  
    
    // Hàm xử lý xóa size
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
                sizeService.remove(id)
                    .then(() => {
                        Swal.fire("Deleted!", "Your size has been deleted.", "success");
                        loadData();
                    })
                    .catch((err) => {
                        console.error("Error deleting product:", err);
                        Swal.fire("Error!", "Failed to delete size. Please try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="container">
        <div className="d-flex justify-content-start mb-3">
            <button className="btn btn-success" onClick={() => AddForm()}>
                <i className="bi bi-plus-circle"></i> Thêm size
            </button>
        </div>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th className="text-center text-white bg-dark">Mã size</th>
                    <th className="text-center text-white bg-dark">Số size</th>
                    <th className="text-center text-white bg-dark">Ngày thêm</th>
                    <th className="text-center text-white bg-dark">Trạng thái</th>
                    <th className="text-center text-white bg-dark">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(Sizes) && Sizes.map((size) => (
                    <tr key={size.id}>
                        <td className="align-middle text-center">{size.id}</td>
                        <td className="align-middle text-center">{size.name}</td>
                        <td className="align-middle text-center">
                            {size.createdDate ? new Date(size.createdDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                        </td>
                        <td className={`align-middle text-center ${size.isActive ? "text-success" : "text-danger"}`}>
                            {size.isActive ? "Active" : "Inactive"}
                        </td>
                        <td className="align-middle text-center">
                            <button className="btn btn-sm btn-primary mx-1" onClick={() => getSize(size.id)}>
                                <i className="bi bi-pencil"></i> Sửa
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDeleteHandle(size.id)}>
                                <i className="bi bi-trash"></i> Xóa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {isOpen && <SizeForm fetchSize={loadData} isOpen={isOpen} onClose={onClose} currentData={currentData} />}
        {isOpenAdd && <SizeAddForm fetchSize={loadData} isOpenAdd={isOpenAdd} onClose={onCloseAdd} />}
    </div>
    )
}

export default Size;
