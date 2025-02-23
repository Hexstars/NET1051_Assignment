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
    api.get<ProductItemForViews[]>(`${api.url.productItems}`)
        .then(response => response.data);

const productItemService = {
    getAll,
};

export default productItemService;