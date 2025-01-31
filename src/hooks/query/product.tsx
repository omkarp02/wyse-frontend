import {
  GET_PRODUCT_BATCH,
  GET_PRODUCT_DETAILS,
  GET_USER_PROFILE,
} from "@/constants/reactquery";
import { getProductBatch } from "@/services/product/product-batch";
import { getProductDetails } from "@/services/product/product-detail";
import { useQuery } from "@tanstack/react-query";

type User = {
  dateofbirth: string;
  email: string;
  firstname: string;
  gender: string;
  lastname: string;
};

export const useGetProductDetails = (id: string) => {
  return useQuery({
    queryKey: [GET_PRODUCT_DETAILS, id],
    queryFn: async () => {
      return await getProductDetails(id);
    },
  });
};

export const useGetProductBatch = (id: string) => {
  return useQuery({
    queryKey: [GET_PRODUCT_BATCH, id],
    queryFn: async () => {
      return await getProductBatch(id);
    },
  });
};
