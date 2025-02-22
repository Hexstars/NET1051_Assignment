import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useDisclosure from "../../hook/useDisclosure";
import productService, { ProductForViews } from "../../services/productService";
import ProductAddForm from "../elements/Products/ProductAddForm";
import ProductEditForm from "../elements/Products/ProductEditForm";

const Product = () => {
    // Khai báo state để lưu trữ danh sách thương hiệu và thông tin thương hiệu hiện tại
    const [Products, setProducts] = useState<ProductForViews[]>([]);
    const [currentData, setCurrentData] = useState<ProductForViews>({} as ProductForViews);
    const [brands] = useState<{ id: string; name: string }[]>([]);
    const [categories] = useState<{ id: string; name?: string }[]>([]);  
    
    // Sử dụng hook để quản lý trạng thái mở/đóng của các form
    const { isOpen, isOpenAdd, onCloseAdd, onOpenAdd, onClose, onOpen } = useDisclosure();

    // Gọi loadData() khi component được mount
    useEffect(() => {
        loadData();
    }, []);

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

     // Hàm mở form thêm sản phẩm
    const AddForm = () => {
        onOpenAdd();
    };   

    // Hàm tải dữ liệu sản phẩm từ API
    const loadData = () => {
      productService.getAll()
          .then((res) => {
              console.log("API Response:", res, typeof res);
              // Kiểm tra và cập nhật state nếu API trả về mảng
              if (res && Array.isArray(res)) {
                  setProducts(res);
              } else {
                  console.error("API did not return an array:", res);
                  setProducts([]);
              }
          })
          .catch(error => {
              console.error("Error loading products:", error);
              setProducts([]);
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
                        loadData();
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
            <button className="btn btn-success" onClick={() => AddForm()}>
                <i className="bi bi-plus-circle"></i> Thêm sản phẩm
            </button>
        </div>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th className="text-center text-white bg-dark">Mã sản phẩm</th>
                    <th className="text-center text-white bg-dark">Tên sản phẩm</th>
                    <th className="text-center text-white bg-dark">Giá</th>
                    <th className="text-center text-white bg-dark">Tên hãng</th>
                    <th className="text-center text-white bg-dark">Loại sản phẩm</th>
                    <th className="text-center text-white bg-dark">Hình ảnh</th>
                    <th className="text-center text-white bg-dark">Ngày thêm</th>
                    <th className="text-center text-white bg-dark">Trạng thái</th>
                    <th className="text-center text-white bg-dark">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(Products) && Products.map((product, index) => {
                    return (
                        <tr key={product.productId || index}>
                            <td className="align-middle text-center">{product.productId}</td>
                            <td className="align-middle text-center">{product.productName || "N/A"}</td>
                            <td className="align-middle text-center">
                                {product.basePrice ? product.basePrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "N/A"}
                            </td>
                            <td className="align-middle text-center">{product.brandName}</td>
                            <td className="align-middle text-center">{product.categoryName}</td>
                            <td className="align-middle text-center">
                                {product.productImage ? <img src={product.productImage} alt={product.productName} width="50" height="50" /> : "No Image"}
                            </td>
                            <td className="align-middle text-center">
                                {product.createdDate ? new Date(product.createdDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                            </td>
                            <td className={`align-middle text-center ${product.isActive ? "text-success" : "text-danger"}`}>
                                {product.isActive ? "Active" : "Inactive"}
                            </td>
                            <td className="align-middle text-center">
                                <button className="btn btn-sm btn-primary mx-1" style={{marginBottom: "5px"}}onClick={() => getProduct(product.productId)}>
                                    <i className="bi bi-pencil"></i> Sửa
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => onDeleteHandle(product.productId)}>
                                    <i className="bi bi-trash"></i> Xóa
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        {isOpen && <ProductEditForm fetchProduct={loadData} isOpen={isOpen} onClose={onClose} currentData={currentData} brands={brands} categories={categories}/>}
        {isOpenAdd && <ProductAddForm fetchProduct={loadData} isOpenAdd={isOpenAdd} onClose={onCloseAdd} />}
    </div>
    )
}

export default Product;
