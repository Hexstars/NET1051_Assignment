import { useState } from "react";
import Swal from "sweetalert2";
import categoryService, { CategoryForViews } from "../../../services/categoryService";

type CategoryAddFormProps = {
    isOpenAdd: boolean;
    onClose: () => void;
    fetchCategory: () => void;
};

const CategoryAddForm = ({ isOpenAdd, fetchCategory, onClose }: CategoryAddFormProps) => {
    // Khai báo state category để lưu trữ thông tin danh mục
    const [category, setCategory] = useState<CategoryForViews>({
        id: crypto.randomUUID(), 
        name: "",
        createdDate: "",
        createdBy: "",
        updatedDate: "",
        updatedBy: "",
        isActive: true,
    });

     // Hàm thêm danh mục
    const AddCategory = () => {
        const newCategory: CategoryForViews = {
            ...category,
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString()
        };

        console.log("Sending data:", newCategory);

        categoryService.add(newCategory)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Category added successfully!",
                    icon: "success"
                });
                onClose();
                fetchCategory();
            })
            .catch(error => {
                console.error("Add Category Error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add category!",
                    icon: "error"
                });
            });
    };

    // Nếu form không mở thì không hiển thị gì
    if (!isOpenAdd) return null;

    return (
        <div className={`modal fade ${isOpenAdd ? "show d-block" : "d-none"}`} tabIndex={-1} role="dialog"
            aria-hidden={!isOpenAdd} onClick={(e) => e.target === e.currentTarget && onClose()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Category Add Form</h5>
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
                                onChange={(e) => {
                                    const newValue = e.target.value === "active";
                                    console.log("Trước khi cập nhật:", category.isActive);
                                    setCategory((prev) => ({ ...prev, isActive: newValue }));
                                    console.log("Sau khi cập nhật:", newValue);
                                }}
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
                        <button type="button" className="btn btn-primary" onClick={AddCategory}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryAddForm;
