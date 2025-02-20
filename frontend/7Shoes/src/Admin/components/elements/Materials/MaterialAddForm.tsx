import { useState } from "react";
import Swal from "sweetalert2";
import materialService, { MaterialForViews } from "../../../services/materialService";

type MaterialAddFormProps = {
    isOpenAdd: boolean;
    onClose: () => void;
    fetchMaterial: () => void;
};

const MaterialAddForm = ({ isOpenAdd, fetchMaterial, onClose }: MaterialAddFormProps) => {
    // Khai báo state material để lưu trữ thông tin chất liệu
    const [material, setMaterial] = useState<MaterialForViews>({
        id: crypto.randomUUID(), 
        name: "",
        createdDate: "",
        createdBy: "",
        updatedDate: "",
        updatedBy: "",
        isActive: true,
    });

     // Hàm thêm material
    const AddMaterial = () => {
        const newMaterial: MaterialForViews = {
            ...material,
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString()
        };

        console.log("Sending data:", newMaterial);

        materialService.add(newMaterial)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Material added successfully!",
                    icon: "success"
                });
                onClose();
                fetchMaterial();
            })
            .catch(error => {
                console.error("Add Material Error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add Material!",
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
                        <h5 className="modal-title">Material Add Form</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Material Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter material name"
                                value={material.name || ""}
                                onChange={(e) => setMaterial({ ...material, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={material.isActive ? "active" : "inactive"}
                                onChange={(e) => {
                                    const newValue = e.target.value === "active";
                                    console.log("Trước khi cập nhật:", material.isActive);
                                    setMaterial((prev) => ({ ...prev, isActive: newValue }));
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
                        <button type="button" className="btn btn-primary" onClick={AddMaterial}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialAddForm;
