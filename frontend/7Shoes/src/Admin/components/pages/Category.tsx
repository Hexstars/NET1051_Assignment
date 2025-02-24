import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import categoryService, { CategoryForViews } from "../../services/categoryService";
import useDisclosure from "../../hook/useDisclosure";
import CategoryForm from "../elements/Categories/CategoryEditForm";
import CategoryAddForm from "../elements/Categories/CategoryAddForm";
import Pagination from "../elements/Pagination/Pagination";

const Category = () => {
    const [categories, setCategories] = useState<CategoryForViews[]>([]);
    const [currentData, setCurrentData] = useState<CategoryForViews>({} as CategoryForViews);
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    // Sử dụng hook để quản lý trạng thái mở/đóng của các form
    const { isOpen, isOpenAdd, onCloseAdd, onOpenAdd, onClose, onOpen } = useDisclosure();

    //Load dữ liệu từ API
    const loadData = async (page: number) => {
        try {
            const isActive = filterStatus === "true" ? true : filterStatus === "false" ? false : null;
            const pageSize = 6; // Đảm bảo khớp với backend
            const { categories, totalCount } = await categoryService.getList(page, pageSize, isActive);
    
            if (Array.isArray(categories)) {
                setCategories(categories);
                setTotalPages(Math.ceil(totalCount / pageSize));
            } else {
                console.error("Invalid API response:", { categories, totalCount });
                setCategories([]);
            }
        } catch (error) {
            console.error("Error loading categories:", error);
            setCategories([]);
        }
    };
    
    // Gọi loadData() khi component được mount hoặc khi có thay đổi về page hoặc filterStatus
    useEffect(() => {
        loadData(currentPage);
    }, [currentPage, filterStatus]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(event.target.value);
        setCurrentPage(1); // Reset về trang 1 khi lọc dữ liệu
    };

    // Hàm lấy thông tin danh mục theo id
    const getCategory = (id: string) => {
        categoryService.getById(id)
            .then((res) => {
                setCurrentData(res);
                onOpen();
            })
            .catch((err) => console.error("Error fetching category:", err));
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
                        loadData(currentPage); // Cập nhật lại dữ liệu
                    })
                    .catch((err) => {
                        console.error("Error deleting category:", err);
                        Swal.fire("Error!", "Failed to delete the category. Please try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-start mb-3">
                <button className="btn btn-success" onClick={onOpenAdd}>
                    <i className="bi bi-plus-circle"></i> Thêm danh mục
                </button>
                <select className="form-select mx-3 w-auto" onChange={handleFilterChange} value={filterStatus || ""}>
                    <option value="">Tất cả</option>
                    <option value="true">Hoạt động</option>
                    <option value="false">Không hoạt động</option>
                </select>
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
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <tr key={category.id}>
                                <td className="align-middle text-center">{category.id}</td>
                                <td className="align-middle text-center">{category.name}</td>
                                <td className="align-middle text-center">
                                    {category.createdDate ? new Date(category.createdDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                                </td>
                                <td className={`align-middle text-center ${category.isActive ? "text-success" : "text-danger"}`}>
                                    {category.isActive ? "Hoạt động" : "Không hoạt động"}
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">Không có danh mục nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Hiển thị phân trang */}
            <div className="d-flex justify-content-center">
            <Pagination 
                currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={(page) => {
                        console.log("Changing to page:", page);
                        setCurrentPage(page);
                    }} 
                />
            </div>

            {/* Hiển thị form chỉnh sửa hoặc thêm danh mục */}
            <CategoryForm fetchCategory={() => loadData(currentPage)} isOpen={isOpen} onClose={onClose} currentData={currentData} />
            <CategoryAddForm fetchCategory={() => loadData(currentPage)} isOpenAdd={isOpenAdd} onClose={onCloseAdd} />
        </div>
    );
};

export default Category;
