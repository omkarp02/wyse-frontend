import React from "react";
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getProductList } from "@/services/product/list-product";
import ProductList from "./_ProductList";
import getQueryClient from "@/lib/queryClient";

const SearchPage = async ({
  searchParams,
}: {searchParams:  Promise<{ [key: string]: string | undefined }>}) => {

  const param = await searchParams
  const page =  param['page'] || "1"
  const collection = param['collection'] || null
  const name = param['search'] || null

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", name], //Array according to Documentation
    queryFn: async () => {
      console.log(">>>>>>>>>>>>>>>>>>>>> server side funtion called here")
      return await getProductList({page: +page, limit: 10, collection, name})
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="main-container">
      <p className="heading">Cargo for men</p>
      <p className="sub-heading">76 items</p>
      <HydrationBoundary state={dehydratedState}>
        <ProductList  />
      </HydrationBoundary>
    </div>
  );
};

export default SearchPage;
