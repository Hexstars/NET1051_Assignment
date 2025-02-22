import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useDisclosure from "../../hook/useDisclosure";
import colorService, { ColorForViews } from "../../services/colorService";
import ColorForm from "../elements/Colors/ColorEditForm";
import ColorAddForm from "../elements/Colors/ColorAddForm";

const Color = () => {
    // Khai báo state để lưu trữ danh sách color và thông tin color hiện tại
    const [Colors, setColors] = useState<ColorForViews[]>([]);
    const [currentData, setCurrentData] = useState<ColorForViews>({} as ColorForViews);
    
    // Sử dụng hook để quản lý trạng thái mở/đóng của các form
    const { isOpen, isOpenAdd, onCloseAdd, onOpenAdd, onClose, onOpen } = useDisclosure();

    // Gọi loadData() khi component được mount
    useEffect(() => {
        loadData();
    }, []);

    // Hàm lấy thông tin màu theo id
    const getColor = (id: string) => {
      colorService.getById(id)
            .then((res) => {
                console.log("Fetched color data:", res);
                setCurrentData(res);
                onOpen();
            })
            .catch((err) => {
                console.log(err);
            });
    };

     // Hàm mở form thêm color
    const AddForm = () => {
        onOpenAdd();
    };   

    // Hàm tải dữ liệu color từ API
    const loadData = () => {
      colorService.getAll()
          .then((res) => {
              console.log("Colors data:", res);
              if (res && Array.isArray(res)) {
                  setColors(res);
              } else {
                  console.error("API did not return an array:", res);
                  setColors([]);
              }
          })
          .catch(error => {
              console.error("Error loading colors:", error);
              setColors([]);
          });
  };
  
    
    // Hàm xử lý xóa màu
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
                colorService.remove(id)
                    .then(() => {
                        Swal.fire("Deleted!", "Your color has been deleted.", "success");
                        loadData();
                    })
                    .catch((err) => {
                        console.error("Error deleting product:", err);
                        Swal.fire("Error!", "Failed to delete color. Please try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="container">
        <div className="d-flex justify-content-start mb-3">
            <button className="btn btn-success" onClick={() => AddForm()}>
                <i className="bi bi-plus-circle"></i> Thêm màu
            </button>
        </div>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th className="text-center text-white bg-dark">Mã màu</th>
                    <th className="text-center text-white bg-dark">Tên màu</th>
                    <th className="text-center text-white bg-dark">Ngày thêm</th>
                    <th className="text-center text-white bg-dark">Trạng thái</th>
                    <th className="text-center text-white bg-dark">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(Colors) && Colors.map((color) => (
                    <tr key={color.id}>
                        <td className="align-middle text-center">{color.id}</td>
                        <td className="align-middle text-center">{color.name}</td>
                        <td className="align-middle text-center">
                            {color.createdDate ? new Date(color.createdDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                        </td>
                        <td className={`align-middle text-center ${color.isActive ? "text-success" : "text-danger"}`}>
                            {color.isActive ? "Active" : "Inactive"}
                        </td>
                        <td className="align-middle text-center">
                            <button className="btn btn-sm btn-primary mx-1" onClick={() => getColor(color.id)}>
                                <i className="bi bi-pencil"></i> Sửa
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDeleteHandle(color.id)}>
                                <i className="bi bi-trash"></i> Xóa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {isOpen && <ColorForm fetchColor={loadData} isOpen={isOpen} onClose={onClose} currentData={currentData} />}
        {isOpenAdd && <ColorAddForm fetchColor={loadData} isOpenAdd={isOpenAdd} onClose={onCloseAdd} />}
    </div>
    )
}

export default Color;
