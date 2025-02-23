import api from "./api";

export interface ColorForViews {
    id: string;
    name?: string;
    createdDate?: string;
    createdBy?: string;
    updatedDate?: string;
    updatedBy?: string;
    isActive?: boolean;
    data?: any
}

//Hiển thị danh sách màu
const getAll = () => api.get<{ colors: ColorForViews[] }>(api.url.colors).then(response => response.data);

//Lấy màu theo id
const getById = (id: string) => api.get<ColorForViews>(`${api.url.colors}/${id}`).then(res => res.data); 

//Thêm màu
const add = (data: ColorForViews) => api.post<ColorForViews>(api.url.colors, data).then(response => response.data);

//Cập nhật màu
const update = (id: string, data: ColorForViews) => api.put<ColorForViews>(`${api.url.colors}/${id}`, data).then(response => response.data);

//Xóa màu
const remove = (id: string) => api.delete<ColorForViews>(`${api.url.colors}/${id}`).then(response => response.data);

const colorService = {
    getAll,
    getById,
    add,
    update,
    remove
};

export default colorService;
