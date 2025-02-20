import { useState } from "react";
import Swal from "sweetalert2";
import brandService, { BrandForViews } from "../../../services/brandService";

type BrandAddFormProps = {
    isOpenAdd: boolean;
    onClose: () => void;
    fetchBrand: () => void;
};

const BrandAddForm = ({ isOpenAdd, fetchBrand, onClose }: BrandAddFormProps) => {
    // Khai báo state category để lưu trữ thông tin thương hiệu
    const [brand, setBrand] = useState<BrandForViews>({
        id: crypto.randomUUID(), 
        name: "",
        createdDate: "",
        createdBy: "",
        updatedDate: "",
        updatedBy: "",
        isActive: true,
    });

     // Hàm thêm thương hiệu
    const AddBrand = () => {
        const newBrand: BrandForViews = {
            ...brand,
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString()
        };

        console.log("Sending data:", newBrand);

        brandService.add(newBrand)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Brand added successfully!",
                    icon: "success"
                });
                onClose();
                fetchBrand();
            })
            .catch(error => {
                console.error("Add Brand Error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add Brand!",
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
                        <h5 className="modal-title">Brand Add Form</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Brand Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter brand name"
                                value={brand.name || ""}
                                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={brand.isActive ? "active" : "inactive"}
                                onChange={(e) => {
                                    const newValue = e.target.value === "active";
                                    console.log("Trước khi cập nhật:", brand.isActive);
                                    setBrand((prev) => ({ ...prev, isActive: newValue }));
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
                        <button type="button" className="btn btn-primary" onClick={AddBrand}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandAddForm;
