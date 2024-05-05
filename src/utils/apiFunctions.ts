import axios from "axios";

export interface ProductData {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    price: number;
    totalSales: number;
    isActive: boolean;
    images: string[];
}

export interface ProductAddData {
  name: string; 
  description: string; 
  price: string; 
  images: string[]
}

export interface ProductView{
  productId: number
}

export const getProducts = async () => {
    const response = await axios.get("/api/product");
    return response;
};

export const addProject = async (data: ProductAddData) => {
  const res = await axios.post(`/api/product`, data);
  return res;
};

export const setProjectView = async (data: ProductView) => {
  const res = await axios.post(`/api/product-view`, data);
  return res;
};


