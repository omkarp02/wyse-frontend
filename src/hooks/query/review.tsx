import { GET_ALL_REVIEW } from "@/constants/reactquery";
import { getReviewsByProduct, IGetReviewsByProduct } from "@/services/assessment/review";
import { useQuery } from "@tanstack/react-query";


export const useGetAllReview = (payload: IGetReviewsByProduct) => {
    return useQuery({
      queryKey: [GET_ALL_REVIEW],
      queryFn: async () => {
        
        const data = await getReviewsByProduct(payload);
        return data?.data;
      },
    });
  };
  