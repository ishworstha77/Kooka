import axios from "axios";

export interface ProductData {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    price: number;
    totalSales: number;
    isActive: boolean;
    image: string;
  }

export const getProducts = async () => {
    const response = await axios.get("/api/product");
    return response;
};