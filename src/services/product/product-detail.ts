import globalInstance from "@/lib/axios/globalInstance";

export const getProductDetails = async (id: string) => {
  console.log(">>>>>>>>> api got called")
  const data = await globalInstance.get(`/product/get-details/${id}`);
  return data;
};
