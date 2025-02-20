import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import categoryService, { CategoryForViews } from "../../services/categoryService";
import useDisclosure from "../../hook/useDisclosure";
import CategoryForm from "../elements/Categories/CategoryEditForm";
import CategoryAddForm from "../elements/Categories/CategoryAddForm";

const Category = () => {
    // Khai báo state để lưu trữ danh sách danh mục và thông tin danh mục hiện tại
    const [Categories, setCategories] = useState<CategoryForViews[]>([]);
    const [currentData, setCurrentData] = useState<CategoryForViews>({} as CategoryForViews);
    
    // Sử dụng hook để quản lý trạng thái mở/đóng của các form
    const { isOpen, isOpenAdd, onCloseAdd, onOpenAdd, onClose, onOpen } = useDisclosure();

    // Gọi loadData() khi component được mount
    useEffect(() => {
        loadData();
    }, []);

    // Hàm lấy thông tin danh mục theo id
    const getCategory = (id: string) => {
        categoryService.getById(id)
            .then((res) => {
                console.log("Fetched category data:", res);
                setCurrentData(res);
                onOpen();
            })
            .catch((err) => {
                console.log(err);
            });
    };

     // Hàm mở form thêm danh mục
    const AddForm = () => {
        onOpenAdd();
    };   

    // Hàm tải dữ liệu danh mục từ API
    const loadData = () => {
        categoryService.getAll()
            .then((res) => {
                console.log("API Response:", res, typeof res);
    
                // Kiểm tra và cập nhật state nếu API trả về mảng
                if (res && Array.isArray(res)) {
                    setCategories(res);
                } else {
                    console.error("API did not return an array:", res);
                    setCategories([]);
                }
            })
            .catch(error => {
                console.error("Error loading categories:", error);
                setCategories([]);
            });
    };
    
    // Hàm xử lý xóa danh mục
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
                categoryService.remove(id)
                    .then(() => {
                        Swal.fire("Deleted!", "Your category has been deleted.", "success");
                        loadData();
                    })
                    .catch((err) => {
                        console.error("Error deleting product:", err);
                        Swal.fire("Error!", "Failed to delete the category. Please try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="container">
        <div className="d-flex justify-content-start mb-3">
            <button className="btn btn-success" onClick={() => AddForm()}>
                <i className="bi bi-plus-circle"></i> Thêm danh mục
            </button>
        </div>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th className="text-center text-white bg-dark">Mã loại</th>
                    <th className="text-center text-white bg-dark">Tên loại</th>
                    <th className="text-center text-white bg-dark">Ngày thêm</th>
                    <th className="text-center text-white bg-dark">Trạng thái</th>
                    <th className="text-center text-white bg-dark">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(Categories) && Categories.map((category) => (
                    <tr key={category.id}>
                        <td className="align-middle text-center">{category.id}</td>
                        <td className="align-middle text-center">{category.name}</td>
                        <td className="align-middle text-center">{category.createdDate}</td>
                        <td className={`align-middle text-center ${category.isActive ? "text-success" : "text-danger"}`}>
                            {category.isActive ? "Active" : "Inactive"}
                        </td>
                        <td className="align-middle text-center">
                            <button className="btn btn-sm btn-primary mx-1" onClick={() => getCategory(category.id)}>
                                <i className="bi bi-pencil"></i> Sửa
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDeleteHandle(category.id)}>
                                <i className="bi bi-trash"></i> Xóa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {isOpen && <CategoryForm fetchCategory={loadData} isOpen={isOpen} onClose={onClose} currentData={currentData} />}
        {isOpenAdd && <CategoryAddForm fetchCategory={loadData} isOpenAdd={isOpenAdd} onClose={onCloseAdd} />}
    </div>
    )
}

export default Category;
