import {
  GET_ADDRESS,
  GET_ADDRESS_LIST,
  GET_PRIMARY_ADDRESS,
  GET_PRODUCT_VARIATION,
} from "@/constants/reactquery";
import {
  getUserAddressApi,
  getUserAddressListApi,
  getUserPrimaryAddressApi,
  IResGetAddressApi,
} from "@/services/user/address";
import { useQuery } from "@tanstack/react-query";

export const useGetAddressList = () => {
  return useQuery<IResGetAddressApi[], Error>({
    queryKey: [GET_ADDRESS_LIST],
    queryFn: async () => {
      const data = await getUserAddressListApi();

      if (data?.data) {
        const addressData = data?.data;
        if (addressData && addressData?.length !== 0) {
          const index = addressData?.findIndex((e: any) => e.isPrimary);
          if (index !== 0) {
            const defaultAddress = addressData.splice(index, 1);
            addressData.unshift(defaultAddress[0]);
          }
          return addressData;
        }
      }
      return [];
    },
  });
};

export const useGetAddress = (id: string) => {
  return useQuery<IResGetAddressApi, Error>({
    queryKey: [GET_ADDRESS, id],
    queryFn: async () => {
      const data = await getUserAddressApi(id);
      return data?.data;
    },
  });
};

export const useGetPrimaryAddress = () => {
  return useQuery<IResGetAddressApi, Error>({
    queryKey: [GET_PRIMARY_ADDRESS],
    queryFn: async () => {
      const data = await getUserPrimaryAddressApi();
      return data?.data;
    },
  });
};

