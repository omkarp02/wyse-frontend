import { GET_FILTER, GET_PRODUCT_VARIATION } from "@/constants/reactquery";
import { getFilterApi } from "@/services/product/fitler";
import { useQuery } from "@tanstack/react-query";

export const useGetFilter = () => {
  return useQuery({
    queryKey: [GET_FILTER],
    queryFn: async () => {
      const data = await getFilterApi();

      const formattedData: {name: string, filter: any}[] = [
        { name: "Sizes", filter: [] },
        { name: "Colors", filter: [] },
      ];

      const sizeList = [];
      const colorList = [];

      if (data?.data?.color) {
        for (let key in data?.data?.color) {
          colorList.push({ name: key, stock: data.data.color[key] });
        }

        formattedData[1].filter = colorList;
      }

      if (data?.data?.size) {
        for (let key in data?.data?.size) {
          sizeList.push({ name: key, stock: data.data.size[key] });
        }
        formattedData[0].filter = sizeList;
      }

      return formattedData;
    },
  });
};
