import globalInstance from "@/lib/axios/globalInstance";

export const getProductDetails = async (id: string) => {
  const data = await globalInstance.get(`/product/details/${id}`);
  return data;
};
