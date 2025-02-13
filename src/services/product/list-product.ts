import globalInstance from "@/lib/axios/globalInstance";
import _ from "lodash";
import queryString from "query-string";

export const getProductList = async (payload: {
  page: number;
  limit: number;
  collection?: string | null;
  sizes?: string[] | null;
  colors?: string[] | null;
  name?: string | null;
  category?: string | null;
  count?: boolean
}) => {


const cleanedObj = _.omitBy(payload, _.isNil);
  
  const stringified = queryString.stringify(cleanedObj);
  console.log(stringified , "<<<<<<<<")
  const data = await globalInstance.get(`/product/list?${stringified}`);
  return data;
};
