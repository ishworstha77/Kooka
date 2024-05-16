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
  images: string[];
}

export interface ProductView {
  productId: number;
}

export interface AddCartData {
  productId: number;
  quantity: number;
}

// product
export const getProducts = async () => {
  const res = await axios.get("/api/product");
  return res;
};

export const getProduct = async (id: number) => {
  const res = await axios.get(`/api/product?id=${id}`);
  return res;
};

export const addProduct = async (data: ProductAddData) => {
  const res = await axios.post(`/api/product`, data);
  return res;
};

export const updateProduct = async (
  data: ProductAddData & { productId: number }
) => {
  const res = await axios.put(`/api/product`, data);
  return res;
};

export const deleteProduct = async (data: { productId: number }) => {
  const res = await axios.delete(`/api/product`, { data });
  return res;
};

// product view

export const setProductView = async (data: ProductView) => {
  const res = await axios.post(`/api/product-view`, data);
  return res;
};

export const getProductView = async () => {
  const res = await axios.get(`/api/product-view`);
  return res;
};

// cart

export const addToCart = async (data: AddCartData) => {
  const res = await axios.post(`/api/cart`, data);
  return res;
};

export const getUserCart = async () => {
  try {
    const res = await axios.get(`/api/cart?type=user`);
    return res;
  } catch (err) {
    console.log("err", err);
  }
};

export const getAllCart = async () => {
  const res = await axios.get(`/api/cart`);
  return res;
};

export const deleteCart = async (data: { cartId: number }) => {
  const res = await axios.delete(`/api/cart`, { data });
  return res;
};
