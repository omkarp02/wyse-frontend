
import getQueryClient from "@/lib/queryClient";
import { getProductDetails } from "@/services/product/product-detail";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import ProductDetail from "./_ProductDetail";
import { GET_PRODUCT_DETAILS } from "@/constants/reactquery";

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const param = await searchParams;
  const id = param["id"] || null;

  const queryClient = getQueryClient();

  if (id === null) return <></>;

  await queryClient.prefetchQuery({
    queryKey: [GET_PRODUCT_DETAILS, id],
    queryFn: async () => {
      return await getProductDetails(id);
    }
  });
  const dehydratedState = dehydrate(queryClient);

  console.log("here is something happeningd here");

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <ProductDetail />
      </HydrationBoundary>
      <div className="h-10"></div>
    </div>
  );
};

export default ProductPage;
