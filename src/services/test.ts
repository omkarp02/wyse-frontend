import globalInstance from "@/lib/axios/globalInstance";
import axiosInstance from "@/lib/axios/globalInstance";



export const getData = async () => {
  return await axiosInstance.get(`/product/filter/product-list?page=1&limit=10`);
};


export const testApi = async (cred: {
  userId: string;
  password: string;
}) => {
  const data = await axiosInstance.post(`/`, cred);
  // const data = await axiosInstance.get(`/`);
  return data;
};
