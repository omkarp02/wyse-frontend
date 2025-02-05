import axiosInstance from "@/lib/axios/protectedInstance";
import queryString from "query-string";

export type IAddCartApiCartItem = {
  productCode: string;
  size: string;
  quantity: number;
};

export type IGetCartApiOffline = {
  productCode: string[];
  size: string[];
};

export type IAddCartApi = {
  item: IAddCartApiCartItem[];
};

export type IUpdateCartItemApi = {
  size?: string;
  quantity?: number;
  cartId: string;
};

export const addToCartApi = async (payload: IAddCartApi) => {
  const data = await axiosInstance.post(`/cart/add`, payload);
  return data;
};

export const getCartApi = async () => {
  const data = await axiosInstance.get(`/cart`);
  return data;
};

export const getCartApiOffline = async (payload: IGetCartApiOffline) => {
  const stringified = queryString.stringify(payload);
  const data = await axiosInstance.get(`/cart/offline?${stringified}`);
  return data;
};

export const updateCartItemApi = async (payload: IUpdateCartItemApi) => {
  const data = await axiosInstance.patch(`/cart/item`, payload);
  return data;
};
