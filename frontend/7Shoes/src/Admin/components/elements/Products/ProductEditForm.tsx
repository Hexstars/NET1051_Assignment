import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import productService, { ProductForViews } from "../../../services/productService";
import categoryService from "../../../services/categoryService";
import brandService from "../../../services/brandService";

type ProductEditFormProps = {
    isOpen: boolean;
    onClose: () => void;
    fetchProduct: () => void;
    currentData?: ProductForViews;
    brands: { id: string; name: string }[]; 
    categories: { id: string; name?: string }[];
};

const ProductEditForm = ({ isOpen, fetchProduct, onClose, currentData}: ProductEditFormProps) => {
    const [product, setProduct] = useState<ProductForViews>({
        productId: "",
        productName: "",
        basePrice: 0,
        description: "",
        productImage: "",
        brandId: "",
        categoryId: "",
        isActive: true,
        updatedDate: new Date().toISOString(),
    });

    const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
    const [categories, setCategories] = useState<{ id: string; name?: string }[]>([]);  

    // Fetch danh sách brands và categories khi mở form
    useEffect(() => {
        if (isOpen) {
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
    }, [isOpen]);

    useEffect(() => {
        if (currentData) {
            setProduct({
                productId: currentData.productId || "",
                productName: currentData.productName || "",
                basePrice: currentData.basePrice || 0,
                description: currentData.description || "",
                productImage: currentData.productImage || "",
                brandId: currentData.brandId || "",
                brandName: currentData.brandName || "No name",
                categoryId: currentData.categoryId || "",
                categoryName: currentData.categoryName || "No name",
                isActive: currentData.isActive ?? true,
                updatedDate: new Date().toISOString(),
            });
        }
    }, [currentData]);
    

    const editProduct = () => {
        if (!product.productId) {
            Swal.fire("Error", "Invalid product ID", "error");
            return;
        }
    
        // Tạo một đối tượng ProductUpdateModel với các trường chính xác
        const productToUpdate: ProductForViews = {
            ...product,
            id: product.productId,
            name: product.productName,
            price: product.basePrice,
            description: product.description,
            image: product.productImage,
            brandId: product.brandId,
            categoryId: product.categoryId, 
            updatedDate: new Date().toISOString(),
        };
    
        console.log("Updating product:", productToUpdate);
        productService.update(product.productId, productToUpdate)
            .then(() => {
                Swal.fire("Success", "Product updated successfully!", "success");
                onClose();
                fetchProduct();
            })
            .catch((error) => {
                console.error("Update error:", error);
                Swal.fire("Error", "Failed to update product: " + error.response.data, "error");
            });
    };
    

    if (!isOpen) return null;

    return (
        <div className={`modal fade ${isOpen ? "show d-block" : "d-none"}`} tabIndex={-1} role="dialog"
            aria-hidden={!isOpen} onClick={(e) => e.target === e.currentTarget && onClose()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Edit Product</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter product name"
                                value={product.productName || ""}
                                onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                placeholder="Enter description"
                                value={product.description || ""}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter price"
                                value={product.basePrice || 0}
                                onChange={(e) => setProduct({ ...product, basePrice: Number(e.target.value) })}
                            />
                        </div>

                        {/* Image */}
                        <div className="mb-3">
                            <label className="form-label">Product Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter image URL"
                                value={product.productImage || ""}
                                onChange={(e) => setProduct({ ...product, productImage: e.target.value })}
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
                        <button type="button" className="btn btn-primary" onClick={editProduct}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditForm;
