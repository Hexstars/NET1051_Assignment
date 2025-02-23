import axios from "axios";
import api from "./api";

export interface ProductForViews {
    productId: string;

    productName?: string;
    name?: string;

    basePrice?: number;
    price?: number;

    description?: string;

    productImage?: string;
    image?: string;

    brandId?: string;
    brandName?: string;

    categoryId?: string;
    categoryName?: string;

    createdDate?: string;
    createdBy?: string;

    updatedDate?: string;
    updatedBy?: string;

    isActive?: boolean;
    
    data?: any;
}

// Lấy danh sách sản phẩm
const getAll = () => api.get<{ products: ProductForViews[] }>(api.url.products).then(response => response.data.products);

// Lấy sản phẩm theo ID
const getById = (id: string) => api.get<ProductForViews>(`${api.url.products}/${id}`).then(res => res.data); 

// Thêm sản phẩm
const add = (data: ProductForViews) => api.post<ProductForViews>(api.url.products, data).then(response => response.data);

// Cập nhật sản phẩm
const update = (id: string, data: ProductForViews) => api.put<ProductForViews>(`${api.url.products}/${id}`, data).then(response => response.data);

// Xóa sản phẩm
const remove = (id: string) => api.delete<ProductForViews>(`${api.url.products}/${id}`).then(response => response.data);

//Lấy ds sán phẩm theo brand id
const getProductsByBrandId = (brandId: string) => {
    return api.get(`${api.url.products}/by-brand/${brandId}`).then(res => res.data);
};
const productService = {
    getAll,
    getById,
    add,
    update,
    remove,
    getProductsByBrandId
};

export default productService;
