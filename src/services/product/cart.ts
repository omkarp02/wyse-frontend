import axiosInstance from "@/lib/axios/protectedInstance";

export type ICartItem = {
  productCode: string;
  size: string;
  quantity: number;
};

export type IAddCartApi = {
  item: ICartItem[];
};

export const addToCartApi = async (payload: IAddCartApi) => {
  const data = await axiosInstance.post(`/cart/add`, payload);
  return data;
};
