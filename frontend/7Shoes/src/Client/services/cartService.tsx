import api from "./api";

export interface CartForViews {
    productItemId: string;
    image: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    total: number;
}

export interface AddToCart{
    productItemId: string;
    quantity: number;
}

export interface UpdateQuantity{
    productItemId: string;
    quantity: number;
}

//Hiển thị giỏ hàng
const getAll = () => 
    api.get<CartForViews[]>(`${api.url.carts}/your-cart`)
        .then(response => response.data);

//Thêm sản phẩm vào giỏ hàng
const add = (data: AddToCart) => api.post<AddToCart>(`${api.url.carts}/add-to-cart`, data).then(response => response.data);


// //Cập nhật số lượng
const updateQuantity = (data: UpdateQuantity) => 
    api.put<UpdateQuantity>(`${api.url.carts}/update-quantity`, data)
       .then(response => response.data);

//Xóa sản phẩm khỏi giỏ hàng
const remove = (id: string) => api.delete<CartForViews>(`${api.url.carts}/delete-from-cart/${id}`).then(response => response.data);

const cartService = {
    getAll,
    updateQuantity,
    add,
    remove
};

export default cartService;
