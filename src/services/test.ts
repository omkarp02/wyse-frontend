import axiosInstance from "@/lib/axios/globalInstance";



export const getData = async () => {
  return await axiosInstance.get(`/product/filter/product-list?page=1&limit=10`);
};
