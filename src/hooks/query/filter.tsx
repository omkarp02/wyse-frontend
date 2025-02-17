import { GET_FILTER, GET_PRODUCT_VARIATION } from "@/constants/reactquery";
import {
  getFilterApi,
  GetFilterApiPayload,
} from "@/services/product/list-product";
import { useQuery } from "@tanstack/react-query";
import { sortBy } from "lodash";

export const useGetFilter = (payload: GetFilterApiPayload) => {
  const { name, category, collection } = payload;
  return useQuery({
    queryKey: [GET_FILTER, name, category, collection],
    queryFn: async () => {
      const data = await getFilterApi(payload);

      const formattedData: { name: string; filter: any }[] = [
        { name: "Sizes", filter: [] },
        { name: "Colors", filter: [] },
      ];

      const sizeList = [];
      const colorList = [];

      if (data?.data?.color) {
        for (const key in data?.data?.color) {
          colorList.push({ name: key, stock: data.data.color[key] });
        }

        formattedData[1].filter = colorList;
      }

      if (data?.data?.size) {
        for (const key in data?.data?.size) {
          sizeList.push({ name: key, stock: data.data.size[key] });
        }
        formattedData[0].filter = sizeList;
      }

      return formattedData;
    },
  });
};
