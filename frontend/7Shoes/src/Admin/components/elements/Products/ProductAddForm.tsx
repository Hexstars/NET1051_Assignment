import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import productService, { ProductForViews } from "../../../services/productService";
import brandService from "../../../services/brandService";
import categoryService from "../../../services/categoryService";

type ProductAddFormProps = {
    isOpenAdd: boolean;
    onClose: () => void;
    fetchProduct: () => void;
};

const ProductAddForm = ({ isOpenAdd, fetchProduct, onClose }: ProductAddFormProps) => {
    // State lưu sản phẩm
    const [product, setProduct] = useState<ProductForViews>({
        productId: crypto.randomUUID(), 
        productName: "",
        basePrice: 0,
        description: "",
        productImage: "",
        createdDate: "",
        updatedDate: "",
        brandId: "",
        categoryId: "",
        isActive: true,
    });

    // State lưu danh sách brands và categories
    const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
    const [categories, setCategories] = useState<{ id: string; name?: string }[]>([]);

    // Fetch danh sách brands và categories khi mở form
    useEffect(() => {
        if (isOpenAdd) {
            brandService.getAll()
            .then((res) => {
                console.log("Brands data:", res);
                if (res && Array.isArray(res)) {
                    setBrands(res);
                } else {
                    console.error("API did not return an array:", res);
                    setBrands([]);
                }
            })
            .catch(error => {
                console.error("Error loading brands:", error);
                setBrands([]);
            });
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
        }
    }, [isOpenAdd]);
    

    // Hàm thêm product
    const AddProduct = () => {
        const newProduct: ProductForViews = {
            ...product,
            name: product.productName,
            price: product.basePrice,
            description: product.description,
            image: product.productImage,
            brandId: product.brandId,
            categoryId: product.categoryId,
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        };

        console.log("Sending data:", newProduct);

        productService.add(newProduct)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Product added successfully!",
                    icon: "success"
                });
                onClose();
                fetchProduct();
            })
            .catch(error => {
                console.error("Add Product Error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add Product!",
                    icon: "error"
                });
            });
    };

    if (!isOpenAdd) return null;

    return (
        <div className={`modal fade ${isOpenAdd ? "show d-block" : "d-none"}`} tabIndex={-1} role="dialog"
            aria-hidden={!isOpenAdd} onClick={(e) => e.target === e.currentTarget && onClose()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Product Add Form</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* Product Name */}
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter product name"
                                value={product.productName}
                                onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                placeholder="Enter product description"
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>

                        {/* Image URL */}
                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter product image URL"
                                value={product.productImage}
                                onChange={(e) => setProduct({ ...product, productImage: e.target.value })}
                            />
                        </div>

                        {/* Base Price */}
                        <div className="mb-3">
                            <label className="form-label">Base Price</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter product price"
                                value={product.basePrice}
                                onChange={(e) => setProduct({ ...product, basePrice: parseFloat(e.target.value) || 0 })}
                            />
                        </div>

                        {/* Brand */}
                        <div className="mb-3">
                            <label className="form-label">Brand</label>
                            <select
                                className="form-select"
                                value={product.brandId}
                                onChange={(e) => setProduct({ ...product, brandId: e.target.value })}
                            >
                                <option value="">Select a brand</option>
                                {brands?.map((brand) => (
                                    <option key={brand?.id || crypto.randomUUID()} value={brand?.id}>
                                        {brand?.name || "No name"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category */}
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                value={product.categoryId}
                                onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
                            >
                                <option value="">Select a category</option>
                                {categories?.map((category) => (
                                    <option key={category?.id || crypto.randomUUID()} value={category?.id}>
                                        {category?.name || "No name"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status */}
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={product.isActive ? "active" : "inactive"}
                                onChange={(e) => setProduct({ ...product, isActive: e.target.value === "active" })}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={AddProduct}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductAddForm;
