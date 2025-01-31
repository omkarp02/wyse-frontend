import React from "react";
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getProductList } from "@/services/product/list-product";
import ProductList from "./_ProductList";
import getQueryClient from "@/lib/queryClient";
import { LIST_PRODUCT } from "@/constants/reactquery";

const SearchPage = async ({
  searchParams,
}: {searchParams:  Promise<{ [key: string]: string | undefined }>}) => {

  const param = await searchParams
  const page =  param['page'] || "1"
  const collection = param['collection'] || null
  const name = param['name'] || null

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [LIST_PRODUCT, name],
    queryFn: async () => {
      return await getProductList({page: +page, limit: 10, collection, name})
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="main-container">
     <p className="heading">{name ?? "All"}</p>
      {/* <p className="sub-heading">76 items</p> */}
      <HydrationBoundary state={dehydratedState}>
        <ProductList  />
      </HydrationBoundary>
      <div className="h-10"></div>
    </div>
  );
};

export default SearchPage;
