import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useDisclosure from "../../hook/useDisclosure";
import productService, { ProductForViews } from "../../services/productService";
import ProductAddForm from "../elements/Products/ProductAddForm";
import ProductEditForm from "../elements/Products/ProductEditForm";
import Pagination from "../elements/Pagination/Pagination";

const Product = () => {
    // Khai báo state để lưu trữ danh sách sp và thông tin sp hiện tại
    const [products, setProducts] = useState<ProductForViews[]>([]);
    const [currentData, setCurrentData] = useState<ProductForViews>({} as ProductForViews);
    const [brands] = useState<{ id: string; name: string }[]>([]);
    const [categories] = useState<{ id: string; name?: string }[]>([]);  
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    
    // Sử dụng hook để quản lý trạng thái mở/đóng của các form
    const { isOpen, isOpenAdd, onCloseAdd, onOpenAdd, onClose, onOpen } = useDisclosure();

    //Load dữ liệu từ API
    const loadData = async (page: number) => {
        try {
            const isActive = filterStatus === "true" ? true : filterStatus === "false" ? false : null;
            const pageSize = 5;
            const { products, totalCount } = await productService.getList(page, pageSize, isActive);
    
            if (Array.isArray(products)) {
                setProducts(products);
                setTotalPages(Math.ceil(totalCount / pageSize));
            } else {
                console.error("Invalid API response:", { products, totalCount });
                setProducts([]);
            }
        } catch (error) {
            console.error("Error loading products:", error);
            setProducts([]);
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

    // Hàm lấy thông tin sản phầm theo id
    const getProduct = (id: string) => {
      productService.getById(id)
            .then((res) => {
                console.log("Fetched product data:", res);
                setCurrentData(res);
                onOpen();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Hàm xử lý xóa sản phẩm
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
                productService.remove(id)
                    .then(() => {
                        Swal.fire("Deleted!", "Your product has been deleted.", "success");
                        loadData(currentPage);
                    })
                    .catch((err) => {
                        console.error("Error deleting product:", err);
                        Swal.fire("Error!", "Failed to delete the product. Please try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="container">
        <div className="d-flex justify-content-start mb-3">
            <button className="btn btn-success" onClick={onOpenAdd}>
                <i className="bi bi-plus-circle"></i> Thêm sản phẩm
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
                    <th className="text-center text-white bg-dark">Mã sản phẩm</th>
                    <th className="text-center text-white bg-dark">Tên sản phẩm</th>
                    <th className="text-center text-white bg-dark">Giá</th>
                    <th className="text-center text-white bg-dark">Hãng</th>
                    <th className="text-center text-white bg-dark">Loại</th>
                    <th className="text-center text-white bg-dark">Hình ảnh</th>
                    <th className="text-center text-white bg-dark">Ngày thêm</th>
                    <th className="text-center text-white bg-dark">Trạng thái</th>
                    <th className="text-center text-white bg-dark">Thao tác</th>
                </tr>
            </thead>
            <tbody>
            {products.length > 0 ? (
                products.map((product) => (
                    <tr key={product.productId}>
                        <td className="align-middle text-center">{product.productId}</td>
                        <td className="align-middle text-center">{product.productName || "N/A"}</td>
                        <td className="align-middle text-center">
                            {product.basePrice ? product.basePrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "N/A"}
                        </td>
                        <td className="align-middle text-center">{product.brandName || "N/A"}</td>
                        <td className="align-middle text-center">{product.categoryName || "N/A"}</td>
                        <td className="align-middle text-center">
                            {product.productImage ? <img src={product.productImage} alt={product.productName} width="50" height="50" /> : "No Image"}
                        </td>
                        <td className="align-middle text-center">
                            {product.createdDate ? new Date(product.createdDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                        </td>
                        <td className={`align-middle text-center ${product.isActive ? "text-success" : "text-danger"}`}>
                            {product.isActive ? "Hoạt động" : "Không hoạt động"}
                        </td>
                        <td className="align-middle text-center">
                            <button className="btn btn-sm btn-primary mx-1" onClick={() => getProduct(product.productId)}>
                                <i className="bi bi-pencil"></i> Sửa
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDeleteHandle(product.productId)}>
                                <i className="bi bi-trash"></i> Xóa
                            </button>
                        </td>
                    </tr>
                ))
                ) : (
                    <tr>
                        <td colSpan={9} className="text-center">Không có sản phẩm nào.</td>
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

        <ProductEditForm fetchProduct={() => loadData(currentPage)} isOpen={isOpen} onClose={onClose} currentData={currentData} brands={brands} categories={categories}/>
        <ProductAddForm fetchProduct={() => loadData(currentPage)} isOpenAdd={isOpenAdd} onClose={onCloseAdd} />
    </div>
    )
}

export default Product;
