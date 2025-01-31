import { GET_USER_PROFILE } from "@/constants/reactquery";
import { getUserProfileApi } from "@/services/auth/user";
import { getProductList } from "@/services/product/list-product";
import { useQuery } from "@tanstack/react-query";

type User = {
  dateofbirth: string;
  email: string;
  firstname: string;
  gender: string;
  lastname: string;
};

export const useGetUser = () => {
  return useQuery<User, Error>({
    queryKey: [GET_USER_PROFILE],
    queryFn: async () => {
      const data = await getUserProfileApi();
      return data?.data;
    },
  });
};
