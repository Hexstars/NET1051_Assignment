import api from "./api";

export interface CartForViews {
    productItemId: string;
    image: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    total: number;
}

//Hiển thị giỏ hàng
const getAll = () => api.get<CartForViews[]>(`${api.url.carts}/your-cart`).then(response => response.data);
//Thêm vào giỏ hàng
//const add = (data: CartForViews) => api.post<CartForViews>(api.url.carts, data).then(response => response.data);

// //Cập nhật số lượng
// const update = (id: string, data: CartForViews) => api.put<CartForViews>(`${api.url.carts}/${id}`, data).then(response => response.data);

//Xóa sản phẩm khỏi giỏ hàng
//const remove = (id: string) => api.delete<CartForViews>(`${api.url.carts}/${id}`).then(response => response.data);

const categoryService = {
    getAll,
    //add,
    //update,
    //remove
};

export default categoryService;
