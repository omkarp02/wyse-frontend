import { GET_CART_DETAILS, GET_PRODUCT_BATCH } from "@/constants/reactquery";
import { getCartApi } from "@/services/product/cart";
import { useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
  return useQuery({
    queryKey: [GET_CART_DETAILS],
    queryFn: async () => {
      const data = await getCartApi()
      return data?.data;
    },
  });
};

// export const useGetCart = () => {
//   return useQuery({
//     queryKey: [GET_CART_DETAILS],
//     queryFn: async () => {
//       const data = await getCartApi()
//       return data?.data;
//     },
//   });
// };
