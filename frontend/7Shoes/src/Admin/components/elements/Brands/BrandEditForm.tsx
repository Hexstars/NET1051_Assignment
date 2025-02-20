import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import brandService, { BrandForViews } from "../../../services/brandService";


type BrandAddFormProps = {
    isOpen: boolean;
    onClose: () => void;
    fetchBrand: () => void;
    currentData?: BrandForViews;
};

const BrandForm = ({ isOpen, fetchBrand, onClose, currentData }: BrandAddFormProps) => {
    // Khởi tạo trạng thái `brand` với useState, bao gồm ID, tên và trạng thái hoạt động của thương hiệu
    const [brand, setBrand] = useState({
        id: "",
        name: "",
        isActive: true,
    });

    // Hàm useEffect này sẽ được gọi khi currentData thay đổi
    useEffect(() => {
        if (currentData && Object.keys(currentData).length > 0) {
            setBrand({
                id: currentData.id ?? "",
                name: currentData.name ?? "",
                isActive: currentData.isActive ?? true,
            });
        }
    }, [currentData]);

     // Hàm để chỉnh sửa thương hiệu
    const editBrand = (id: string) => {
        if (!id) {
            Swal.fire("Error", "Invalid brand ID", "error");
            return;
        }

        // Dữ liệu cập nhật
        const updatedData: BrandForViews = {
            id: brand.id,
            name: brand.name,
            isActive: brand.isActive,
        };

        // Gọi service để cập nhật thương hiệu
        brandService.update(id, updatedData)
            .then(() => {
                Swal.fire("Success", "Brand updated successfully!", "success");
                onClose();
                fetchBrand();
            })
            .catch(() => {
                Swal.fire("Error", "Failed to update brand", "error");
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
                        <h5 className="modal-title">Edit Brand</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Brand Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter category name"
                                value={brand.name || ""}
                                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={brand.isActive ? "active" : "inactive"}
                                onChange={(e) => setBrand((prev) => ({ ...prev, isActive: e.target.value === "active" }))}
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
                        <button type="button" className="btn btn-primary" onClick={() => editBrand(brand.id)}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandForm;