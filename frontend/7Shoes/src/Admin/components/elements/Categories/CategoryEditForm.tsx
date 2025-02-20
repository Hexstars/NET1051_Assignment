import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import categoryService, { CategoryForViews } from "../../../services/categoryService";

type CategoryFormProps = {
    isOpen: boolean;
    onClose: () => void;
    fetchCategory: () => void;
    currentData?: CategoryForViews;
};

const CategoryForm = ({ isOpen, fetchCategory, onClose, currentData }: CategoryFormProps) => {
    // Khởi tạo trạng thái `category` với useState, bao gồm ID, tên và trạng thái hoạt động của danh mục
    const [category, setCategory] = useState({
        id: "",
        name: "",
        isActive: true,
    });

    // Hàm useEffect này sẽ được gọi khi currentData thay đổi
    useEffect(() => {
        if (currentData && Object.keys(currentData).length > 0) {
            setCategory({
                id: currentData.id ?? "",
                name: currentData.name ?? "",
                isActive: currentData.isActive ?? true,
            });
        }
    }, [currentData]);

     // Hàm để chỉnh sửa danh mục
    const editCategory = (id: string) => {
        if (!id) {
            Swal.fire("Error", "Invalid category ID", "error");
            return;
        }

        // Dữ liệu cập nhật
        const updatedData: CategoryForViews = {
            id: category.id,
            name: category.name,
            isActive: category.isActive,
        };

        // Gọi service để cập nhật danh mục
        categoryService.update(id, updatedData)
            .then(() => {
                Swal.fire("Success", "Category updated successfully!", "success");
                onClose();
                fetchCategory();
            })
            .catch(() => {
                Swal.fire("Error", "Failed to update category", "error");
            });
    };

    // Nếu form không mở thì không hiển thị gì
    if (!isOpen) return null;

    return (
        <div className={`modal fade ${isOpen ? "show d-block" : "d-none"}`} tabIndex={-1} role="dialog"
            aria-hidden={!isOpen} onClick={(e) => e.target === e.currentTarget && onClose()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Edit Category</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter category name"
                                value={category.name || ""}
                                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={category.isActive ? "active" : "inactive"}
                                onChange={(e) => setCategory((prev) => ({ ...prev, isActive: e.target.value === "active" }))}
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
                        <button type="button" className="btn btn-primary" onClick={() => editCategory(category.id)}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;