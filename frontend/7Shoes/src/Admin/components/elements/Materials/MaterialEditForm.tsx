import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import materialService, { MaterialForViews } from "../../../services/materialService";

type MaterialAddFormProps = {
    isOpen: boolean;
    onClose: () => void;
    fetchMaterial: () => void;
    currentData?: MaterialForViews;
};

const MaterialForm = ({ isOpen, fetchMaterial, onClose, currentData }: MaterialAddFormProps) => {
    // Khởi tạo trạng thái `material` với useState, bao gồm ID, tên và trạng thái hoạt động của material
    const [material, setMaterial] = useState({
        id: "",
        name: "",
        isActive: true,
    });

    // Hàm useEffect này sẽ được gọi khi currentData thay đổi
    useEffect(() => {
        if (currentData && Object.keys(currentData).length > 0) {
            setMaterial({
                id: currentData.id ?? "",
                name: currentData.name ?? "",
                isActive: currentData.isActive ?? true,
            });
        }
    }, [currentData]);

     // Hàm để chỉnh sửa material
    const editMaterial = (id: string) => {
        if (!id) {
            Swal.fire("Error", "Invalid material ID", "error");
            return;
        }

        // Dữ liệu cập nhật
        const updatedData: MaterialForViews = {
            id: material.id,
            name: material.name,
            isActive: material.isActive,
        };

        // Gọi service để cập nhật material
        materialService.update(id, updatedData)
            .then(() => {
                Swal.fire("Success", "Material updated successfully!", "success");
                onClose();
                fetchMaterial();
            })
            .catch(() => {
                Swal.fire("Error", "Failed to update material", "error");
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
                        <h5 className="modal-title">Edit Material</h5>
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
                                onChange={(e) => setMaterial((prev) => ({ ...prev, isActive: e.target.value === "active" }))}
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
                        <button type="button" className="btn btn-primary" onClick={() => editMaterial(material.id)}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialForm;