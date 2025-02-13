import globalInstance from "@/lib/axios/globalInstance";

export const getFilterApi = async () => {
  const data = await globalInstance.get(`/product/filter?category=joggers`);
  return data;
};
