import axiosInstance from "@/lib/axios/globalInstance";

export const getProductList = async (page: number, limit: number) => {
  const data = await axiosInstance.get(
    `/product/filter/product-list?page=${page}&limit=${limit}`
  );
  return data;
};
