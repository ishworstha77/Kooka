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

export interface AddCartData {
  productId: number;
  quantity: number;
}

export const getProducts = async () => {
    const res = await axios.get("/api/product");
    return res;
};

export const addProject = async (data: ProductAddData) => {
  const res = await axios.post(`/api/product`, data);
  return res;
};

export const setProjectView = async (data: ProductView) => {
  const res = await axios.post(`/api/product-view`, data);
  return res;
};

export const getProjectView = async () => {
  const res = await axios.get(`/api/product-view`);
  return res;
};


export const addToCart = async (data: AddCartData) => {
  const res = await axios.post(`/api/cart`, data);
  return res;
};


export const getUserCart = async () => {
  const res = await axios.get(`/api/cart?type=user`);
  return res;
};

export const getAllCart = async () => {
  const res = await axios.get(`/api/cart`);
  return res;
};

