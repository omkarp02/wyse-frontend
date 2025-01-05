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
}: {searchParams:  Promise<{ [key: string]: string | string[] | undefined }>}) => {

  const param = await searchParams
  const page =  param['page'] ? +param['page'] : 1


  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product"], //Array according to Documentation
    queryFn: async () => await getProductList(page, 10),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="main-container">
      <p className="heading">Cargo for men</p>
      <p className="sub-heading">76 items</p>
      <HydrationBoundary state={dehydratedState}>
        <ProductList />
      </HydrationBoundary>
    </div>
  );
};

export default SearchPage;
