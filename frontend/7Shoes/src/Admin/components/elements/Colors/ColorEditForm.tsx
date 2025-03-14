import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import colorService, { ColorForViews } from "../../../services/colorService";

type ColorAddFormProps = {
    isOpen: boolean;
    onClose: () => void;
    fetchColor: () => void;
    currentData?: ColorForViews;
};

const ColorForm = ({ isOpen, fetchColor, onClose, currentData }: ColorAddFormProps) => {
    // Khởi tạo trạng thái `color` với useState, bao gồm ID, tên và trạng thái hoạt động của color
    const [color, setColor] = useState({
        id: "",
        name: "",
        isActive: true,
    });

    // Hàm useEffect này sẽ được gọi khi currentData thay đổi
    useEffect(() => {
        if (currentData && Object.keys(currentData).length > 0) {
            setColor({
                id: currentData.id ?? "",
                name: currentData.name ?? "",
                isActive: currentData.isActive ?? true,
            });
        }
    }, [currentData]);

     // Hàm để chỉnh sửa color
    const editColor = (id: string) => {
        if (!id) {
            Swal.fire("Error", "Invalid color ID", "error");
            return;
        }

        // Dữ liệu cập nhật
        const updatedData: ColorForViews = {
            id: color.id,
            name: color.name,
            isActive: color.isActive,
        };

        // Gọi service để cập nhật color
        colorService.update(id, updatedData)
            .then(() => {
                Swal.fire("Success", "Color updated successfully!", "success");
                onClose();
                fetchColor();
            })
            .catch(() => {
                Swal.fire("Error", "Failed to update color", "error");
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
                        <h5 className="modal-title">Edit Color</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Color Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter color name"
                                value={color.name || ""}
                                onChange={(e) => setColor({ ...color, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={color.isActive ? "active" : "inactive"}
                                onChange={(e) => setColor((prev) => ({ ...prev, isActive: e.target.value === "active" }))}
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
                        <button type="button" className="btn btn-primary" onClick={() => editColor(color.id)}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorForm;