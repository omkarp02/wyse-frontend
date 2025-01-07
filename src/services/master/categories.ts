import axiosInstance from "@/lib/axios/globalInstance";
import { ICategory } from "@/types/api";



export const getCategoriesApi = async () => {
  const data = await axiosInstance.get(`/category`);
  return data;
};
