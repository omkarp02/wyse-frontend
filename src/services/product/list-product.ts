import globalInstance from "@/lib/axios/globalInstance";
import _ from "lodash";
import queryString from "query-string";

type productFilterPayload = {
  page: number;
  limit: number;
  collection?: string | null;
  sizes?: string[] | null;
  colors?: string[] | null;
  name?: string | null;
  category?: string | null;
  count?: boolean;
  gender?: string | null;
  sort_by?: string | null;
};

export type GetFilterApiPayload = Omit<
  productFilterPayload,
  "page" | "limit" | "sizes" | "colors" | "sort_by"
>;

export const getProductList = async (payload: productFilterPayload) => {
  const cleanedObj = _.omitBy(payload, _.isNil);

  const stringified = queryString.stringify(cleanedObj);
  const data = await globalInstance.get(`/product/list?${stringified}`);
  return data;
};

export const getFilterApi = async (payload: GetFilterApiPayload) => {
  const cleanedObj = _.omitBy(payload, _.isNil);

  const stringified = queryString.stringify(cleanedObj);
  const data = await globalInstance.get(`/product/filter?${stringified}`);
  return data;
};
