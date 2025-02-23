import axios from "axios";

const API_URL = "http://localhost:7043/api/product"; // Đổi URL nếu cần

export const searchProducts = async (name: string) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { name },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};
