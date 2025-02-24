import api from "./api";

export interface MaterialForViews {
    id: string;
    name?: string;
    createdDate?: string;
    createdBy?: string;
    updatedDate?: string;
    updatedBy?: string;
    isActive?: boolean;
    data?: any
}

//Hiển thị danh sách chất liệu
const getAll = () => api.get<{ sizes: MaterialForViews[] }>(api.url.materials).then(response => response.data);

//Lấy chất liệu theo id
const getById = (id: string) => api.get<MaterialForViews>(`${api.url.materials}/${id}`).then(res => res.data); 

//Thêm chất liệu
const add = (data: MaterialForViews) => api.post<MaterialForViews>(api.url.materials, data).then(response => response.data);

//Cập nhật chất liệu
const update = (id: string, data: MaterialForViews) => api.put<MaterialForViews>(`${api.url.materials}/${id}`, data).then(response => response.data);

//Xóa chất liệu
const remove = (id: string) => api.delete<MaterialForViews>(`${api.url.materials}/${id}`).then(response => response.data);

const getList = (currentPage: number, pageSize: number, isActive?: boolean | null) => 
    api.get<{ materials: MaterialForViews[]; totalCount: number }>(
        api.url.materials, 
        { params: { currentPage, pageSize, isActive } }
    ).then(response => response.data);

const materialService = {
    getAll,
    getById,
    add,
    update,
    remove,
    getList
};

export default materialService;
