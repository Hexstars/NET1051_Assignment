import api from "./api";

export interface ProductItemForViews {
    id: string;
    image: string;
    productName: string;
    price: number;
    sizeName: string;
    colorName: string;
    materialName: string;
}

//Hiển thị sản phẩm
const getAll = () =>
    api.get<{ products: ProductItemForViews[] }>(`${api.url.productItems}`)
        .then(response => response.data.products);

// Lấy sản phẩm theo ID
const getById = (id: string) => api.get<ProductItemForViews>(`${api.url.productItems}/${id}`).then(res => res.data); 

const productItemService = {
    getAll,
    getById
};

export default productItemService;