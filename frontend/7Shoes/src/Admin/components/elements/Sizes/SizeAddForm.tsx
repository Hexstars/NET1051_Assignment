import { useState } from "react";
import Swal from "sweetalert2";
import sizeService, { SizeForViews } from "../../../services/sizeService";

type SizeAddFormProps = {
    isOpenAdd: boolean;
    onClose: () => void;
    fetchSize: () => void;
};

const SizeAddForm = ({ isOpenAdd, fetchSize, onClose }: SizeAddFormProps) => {
    // Khai báo state color để lưu trữ thông tin size
    const [size, setSize] = useState<SizeForViews>({
        id: crypto.randomUUID(), 
        name: "",
        createdDate: "",
        createdBy: "",
        updatedDate: "",
        updatedBy: "",
        isActive: true,
    });

     // Hàm thêm size
    const AddSize = () => {
        const newSize: SizeForViews = {
            ...size,
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString()
        };

        console.log("Sending data:", newSize);

        sizeService.add(newSize)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Size added successfully!",
                    icon: "success"
                });
                onClose();
                fetchSize();
            })
            .catch(error => {
                console.error("Add Size Error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add size!",
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
                        <h5 className="modal-title">Size Add Form</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Size Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter size name"
                                value={size.name || ""}
                                onChange={(e) => setSize({ ...size, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={size.isActive ? "active" : "inactive"}
                                onChange={(e) => {
                                    const newValue = e.target.value === "active";
                                    console.log("Trước khi cập nhật:", size.isActive);
                                    setSize((prev) => ({ ...prev, isActive: newValue }));
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
                        <button type="button" className="btn btn-primary" onClick={AddSize}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SizeAddForm;
