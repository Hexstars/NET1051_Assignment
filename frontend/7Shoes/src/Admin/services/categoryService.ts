import api from "./api";

export interface CategoryForViews {
    id: string;
    name?: string;
    createdDate?: string;
    createdBy?: string;
    updatedDate?: string;
    updatedBy?: string;
    isActive?: boolean;
    data?: any
}

//Hiển thị danh sách cate
const getAll = () => api.get<{ categories: CategoryForViews[] }>(api.url.categories).then(response => response.data.categories);

//Lấy category theo id
const getById = (id: string) => api.get<CategoryForViews>(`${api.url.categories}/${id}`).then(res => res.data); 

//Thêm category
const add = (data: CategoryForViews) => api.post<CategoryForViews>(api.url.categories, data).then(response => response.data);

//Cập nhật category
const update = (id: string, data: CategoryForViews) => api.put<CategoryForViews>(`${api.url.categories}/${id}`, data).then(response => response.data);

//Xóa category
const remove = (id: string) => api.delete<CategoryForViews>(`${api.url.categories}/${id}`).then(response => response.data);

const categoryService = {
    getAll,
    getById,
    add,
    update,
    remove
};

export default categoryService;
