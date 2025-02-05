import globalInstance from "@/lib/axios/globalInstance";

export const getProductDetails = async (id: string) => {
  const data = await globalInstance.get(`/product/details/${id}`);
  return data;
};

export const getProductVariationApi = async (code: string) => {
  const data = await globalInstance.get(`/product/variations/${code}`);
  return data;
};
