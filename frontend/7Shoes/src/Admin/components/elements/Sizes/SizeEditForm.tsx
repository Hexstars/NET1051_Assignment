import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import sizeService, { SizeForViews } from "../../../services/sizeService";

type SizeAddFormProps = {
    isOpen: boolean;
    onClose: () => void;
    fetchSize: () => void;
    currentData?: SizeForViews;
};

const SizeForm = ({ isOpen, fetchSize, onClose, currentData }: SizeAddFormProps) => {
    // Khởi tạo trạng thái `size` với useState, bao gồm ID, tên và trạng thái hoạt động của size
    const [size, setSize] = useState({
        id: "",
        name: "",
        isActive: true,
    });

    // Hàm useEffect này sẽ được gọi khi currentData thay đổi
    useEffect(() => {
        if (currentData && Object.keys(currentData).length > 0) {
            setSize({
                id: currentData.id ?? "",
                name: currentData.name ?? "",
                isActive: currentData.isActive ?? true,
            });
        }
    }, [currentData]);

     // Hàm để chỉnh sửa size
    const editSize = (id: string) => {
        if (!id) {
            Swal.fire("Error", "Invalid size ID", "error");
            return;
        }

        // Dữ liệu cập nhật
        const updatedData: SizeForViews = {
            id: size.id,
            name: size.name,
            isActive: size.isActive,
        };

        // Gọi service để cập nhật size
        sizeService.update(id, updatedData)
            .then(() => {
                Swal.fire("Success", "Size updated successfully!", "success");
                onClose();
                fetchSize();
            })
            .catch(() => {
                Swal.fire("Error", "Failed to update size", "error");
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
                        <h5 className="modal-title">Edit Size</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Size Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter color name"
                                value={size.name || ""}
                                onChange={(e) => setSize({ ...size, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={size.isActive ? "active" : "inactive"}
                                onChange={(e) => setSize((prev) => ({ ...prev, isActive: e.target.value === "active" }))}
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
                        <button type="button" className="btn btn-primary" onClick={() => editSize(size.id)}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SizeForm;