import { useState } from "react";
import Swal from "sweetalert2";
import colorService, { ColorForViews } from "../../../services/colorService";

type ColorAddFormProps = {
    isOpenAdd: boolean;
    onClose: () => void;
    fetchColor: () => void;
};

const ColorAddForm = ({ isOpenAdd, fetchColor, onClose }: ColorAddFormProps) => {
    // Khai báo state color để lưu trữ thông tin màu
    const [color, setColor] = useState<ColorForViews>({
        id: crypto.randomUUID(), 
        name: "",
        createdDate: "",
        createdBy: "",
        updatedDate: "",
        updatedBy: "",
        isActive: true,
    });

     // Hàm thêm màu
    const AddColor = () => {
        const newColor: ColorForViews = {
            ...color,
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString()
        };

        console.log("Sending data:", newColor);

        colorService.add(newColor)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Color added successfully!",
                    icon: "success"
                });
                onClose();
                fetchColor();
            })
            .catch(error => {
                console.error("Add Color Error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add Color!",
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
                        <h5 className="modal-title">Color Add Form</h5>
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
                                onChange={(e) => {
                                    const newValue = e.target.value === "active";
                                    console.log("Trước khi cập nhật:", color.isActive);
                                    setColor((prev) => ({ ...prev, isActive: newValue }));
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
                        <button type="button" className="btn btn-primary" onClick={AddColor}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorAddForm;
