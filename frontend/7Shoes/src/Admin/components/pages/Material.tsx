import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useDisclosure from "../../hook/useDisclosure";
import materialService, { MaterialForViews } from "../../services/materialService";
import MaterialForm from "../elements/Materials/MaterialEditForm";
import MaterialAddForm from "../elements/Materials/MaterialAddForm";

const Material = () => {
    // Khai báo state để lưu trữ danh sách material và thông tin material hiện tại
    const [Materials, setMaterials] = useState<MaterialForViews[]>([]);
    const [currentData, setCurrentData] = useState<MaterialForViews>({} as MaterialForViews);
    
    // Sử dụng hook để quản lý trạng thái mở/đóng của các form
    const { isOpen, isOpenAdd, onCloseAdd, onOpenAdd, onClose, onOpen } = useDisclosure();

    // Gọi loadData() khi component được mount
    useEffect(() => {
        loadData();
    }, []);

    // Hàm lấy thông tin material theo id
    const getMaterial = (id: string) => {
      materialService.getById(id)
            .then((res) => {
                console.log("Fetched material data:", res);
                setCurrentData(res);
                onOpen();
            })
            .catch((err) => {
                console.log(err);
            });
    };

     // Hàm mở form thêm material
    const AddForm = () => {
        onOpenAdd();
    };   

    // Hàm tải dữ liệu material từ API
    const loadData = () => {
      materialService.getAll()
          .then((res) => {
              console.log("Materials data:", res);
              if (res && Array.isArray(res)) {
                  setMaterials(res);
              } else {
                  console.error("API did not return an array:", res);
                  setMaterials([]);
              }
          })
          .catch(error => {
              console.error("Error loading materials:", error);
              setMaterials([]);
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
                materialService.remove(id)
                    .then(() => {
                        Swal.fire("Deleted!", "Your material has been deleted.", "success");
                        loadData();
                    })
                    .catch((err) => {
                        console.error("Error deleting product:", err);
                        Swal.fire("Error!", "Failed to delete material. Please try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="container">
        <div className="d-flex justify-content-start mb-3">
            <button className="btn btn-success" onClick={() => AddForm()}>
                <i className="bi bi-plus-circle"></i> Thêm chất liệu
            </button>
        </div>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th className="text-center text-white bg-dark">Mã chất liệu</th>
                    <th className="text-center text-white bg-dark">Tên chất liệu</th>
                    <th className="text-center text-white bg-dark">Ngày thêm</th>
                    <th className="text-center text-white bg-dark">Trạng thái</th>
                    <th className="text-center text-white bg-dark">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(Materials) && Materials.map((material) => (
                    <tr key={material.id}>
                        <td className="align-middle text-center">{material.id}</td>
                        <td className="align-middle text-center">{material.name}</td>
                        <td className="align-middle text-center">{material.createdDate}</td>
                        <td className={`align-middle text-center ${material.isActive ? "text-success" : "text-danger"}`}>
                            {material.isActive ? "Active" : "Inactive"}
                        </td>
                        <td className="align-middle text-center">
                            <button className="btn btn-sm btn-primary mx-1" onClick={() => getMaterial(material.id)}>
                                <i className="bi bi-pencil"></i> Sửa
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDeleteHandle(material.id)}>
                                <i className="bi bi-trash"></i> Xóa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {isOpen && <MaterialForm fetchMaterial={loadData} isOpen={isOpen} onClose={onClose} currentData={currentData} />}
        {isOpenAdd && <MaterialAddForm fetchMaterial={loadData} isOpenAdd={isOpenAdd} onClose={onCloseAdd} />}
    </div>
    )
}

export default Material;
