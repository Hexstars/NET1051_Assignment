import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useDisclosure from "../../hook/useDisclosure";
import sizeService, { SizeForViews } from "../../services/sizeService";
import SizeForm from "../elements/Sizes/SizeEditForm";
import SizeAddForm from "../elements/Sizes/SizeAddForm";
import Pagination from "../elements/Pagination/Pagination";

const Size = () => {
    // Khai báo state để lưu trữ danh sách size và thông tin size hiện tại
    const [sizes, setSizes] = useState<SizeForViews[]>([]);
    const [currentData, setCurrentData] = useState<SizeForViews>({} as SizeForViews);
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    
    // Sử dụng hook để quản lý trạng thái mở/đóng của các form
    const { isOpen, isOpenAdd, onCloseAdd, onOpenAdd, onClose, onOpen } = useDisclosure();

    //Load dữ liệu từ API
    const loadData = async (page: number) => {
        try {
            const isActive = filterStatus === "true" ? true : filterStatus === "false" ? false : null;
            const pageSize = 6;
            const { sizes, totalCount } = await sizeService.getList(page, pageSize, isActive);
    
            if (Array.isArray(sizes)) {
                setSizes(sizes);
                setTotalPages(Math.ceil(totalCount / pageSize));
            } else {
                console.error("Invalid API response:", { sizes, totalCount });
                setSizes([]);
            }
        } catch (error) {
            console.error("Error loading sizes:", error);
            setSizes([]);
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
                        loadData(currentPage);
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
            <button className="btn btn-success" onClick={onOpenAdd}>
                <i className="bi bi-plus-circle"></i> Thêm size
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
                    <th className="text-center text-white bg-dark">Mã size</th>
                    <th className="text-center text-white bg-dark">Số size</th>
                    <th className="text-center text-white bg-dark">Ngày thêm</th>
                    <th className="text-center text-white bg-dark">Trạng thái</th>
                    <th className="text-center text-white bg-dark">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {sizes.length > 0 ? (
                    sizes.map((size) => (
                        <tr key={size.id}>
                            <td className="align-middle text-center">{size.id}</td>
                            <td className="align-middle text-center">{size.name}</td>
                            <td className="align-middle text-center">
                                {size.createdDate ? new Date(size.createdDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                            </td>
                            <td className={`align-middle text-center ${size.isActive ? "text-success" : "text-danger"}`}>
                                {size.isActive ? "Hoạt động" : "Không hoạt động"}
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
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center">Không có size nào.</td>
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

        {/* Hiển thị form chỉnh sửa hoặc thêm size */}
        <SizeForm fetchSize={() => loadData(currentPage)} isOpen={isOpen} onClose={onClose} currentData={currentData} />
        <SizeAddForm fetchSize={() => loadData(currentPage)} isOpenAdd={isOpenAdd} onClose={onCloseAdd} />
    </div>
    )
}

export default Size;
