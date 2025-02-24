import api from "./api";

export interface BrandForViews {
    id: string;
    name?: string;
    createdDate?: string;
    createdBy?: string;
    updatedDate?: string;
    updatedBy?: string;
    isActive?: boolean;
    data?: any
}

//Hiển thị danh sách brand
const getAll = () => api.get<{
    data(data: any): void | PromiseLike<void>; brands: BrandForViews[] 
}>(api.url.brands).then(response => response.data);

//Lấy brands theo id
const getById = (id: string) => api.get<BrandForViews>(`${api.url.brands}/${id}`).then(res => res.data); 

//Thêm brands
const add = (data: BrandForViews) => api.post<BrandForViews>(api.url.brands, data).then(response => response.data);

//Cập nhật brands
const update = (id: string, data: BrandForViews) => api.put<BrandForViews>(`${api.url.brands}/${id}`, data).then(response => response.data);

//Xóa brands
const remove = (id: string) => api.delete<BrandForViews>(`${api.url.brands}/${id}`).then(response => response.data);

const getList = (currentPage: number, pageSize: number, isActive?: boolean | null) => 
    api.get<{ brands: BrandForViews[]; totalCount: number }>(
        api.url.brands, 
        { params: { currentPage, pageSize, isActive } }
    ).then(response => response.data);

const brandService = {
    getAll,
    getById,
    add,
    update,
    remove,
    getList
};

export default brandService;
