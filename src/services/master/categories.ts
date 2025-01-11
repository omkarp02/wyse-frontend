import globalInstance from "@/lib/axios/globalInstance";



export const getCategoriesApi = async () => {
  const data = await globalInstance.get(`/category`);
  return data;
};
