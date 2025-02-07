import { GET_ADDRESS_LIST, GET_PRODUCT_VARIATION } from "@/constants/reactquery";
import { getUserAddressApi } from "@/services/user/address";
import { useQuery } from "@tanstack/react-query";

export const useGetAddressList = () => {
    return useQuery({
      queryKey: [GET_ADDRESS_LIST],
      queryFn: async () => {
        const data = await getUserAddressApi()
        return data?.data;
      },
    });
  };
  