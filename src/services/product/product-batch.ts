import globalInstance from "@/lib/axios/globalInstance";

export const getProductBatch = async (id: string) => {
  const data = await globalInstance.get(`/product/batch/${id}`);
  return data;
};
