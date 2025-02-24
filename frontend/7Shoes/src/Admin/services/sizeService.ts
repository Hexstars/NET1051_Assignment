import api from "./api";

export interface SizeForViews {
    id: string;
    name?: string;
    createdDate?: string;
    createdBy?: string;
    updatedDate?: string;
    updatedBy?: string;
    isActive?: boolean;
    data?: any
}

//Hiển thị danh sách sizes
const getAll = () => api.get<{ sizes: SizeForViews[] }>(api.url.sizes).then(response => response.data);

//Lấy size theo id
const getById = (id: string) => api.get<SizeForViews>(`${api.url.sizes}/${id}`).then(res => res.data); 

//Thêm size
const add = (data: SizeForViews) => api.post<SizeForViews>(api.url.sizes, data).then(response => response.data);

//Cập nhật size
const update = (id: string, data: SizeForViews) => api.put<SizeForViews>(`${api.url.sizes}/${id}`, data).then(response => response.data);

//Xóa size
const remove = (id: string) => api.delete<SizeForViews>(`${api.url.sizes}/${id}`).then(response => response.data);

const getList = (currentPage: number, pageSize: number, isActive?: boolean | null) => 
    api.get<{ sizes: SizeForViews[]; totalCount: number }>(
        api.url.sizes, 
        { params: { currentPage, pageSize, isActive } }
    ).then(response => response.data);

const sizeService = {
    getAll,
    getById,
    add,
    update,
    remove,
    getList
};

export default sizeService;
