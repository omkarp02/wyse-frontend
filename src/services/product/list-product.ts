import globalInstance from "@/lib/axios/globalInstance";
import queryString from 'query-string';



export const getProductList = async (payload: {page: number, limit: number, collection?: string | null, name?: string | null}) => {
  const stringified =queryString.stringify(payload)

  const data = await globalInstance.get(
    `/product/filter/product-list?${stringified}`
  );
  return data;
};
